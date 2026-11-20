import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Search,
  LocateFixed,
  ShieldCheck,
  MapPin,
  Navigation,
  Copy,
  Check,
  Clock,
  Phone,
  Star,
  UserPlus,
  Info,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  DEFAULT_INDIA_CENTER,
  MapPlaceOfficer,
  OFFICER_ROLES,
  OFFICER_ROLE_STYLE,
  OfficerProfile,
  OfficerRole,
  UnifiedOfficerItem,
  buildDirectionsUrl,
  calculateDistanceKm,
  getTaskRequirement,
} from '../utils/officerRequirements';
import { PROCEDURES_DATA } from '../utils/procedures';
import {
  Language,
  UI_TRANSLATIONS,
  getLocalizedProcedure,
  t,
} from '../utils/translations';
import { OfficerMapCanvas } from './OfficerMapCanvas';
import { OfficerOnboardingModal } from './OfficerOnboardingModal';

interface OfficerFinderViewProps {
  language: Language;
  theme?: 'light' | 'dark';
}

interface ErrorBoundaryState {
  hasError: boolean;
  message: string;
}

class OfficerFinderErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, message: '' };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      message: error?.message || 'Unexpected error while loading Officer Finder.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="max-w-3xl mx-auto my-8 p-6 rounded-2xl border border-red-200 dark:border-red-900 bg-white dark:bg-slate-900 text-center space-y-3">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto" />
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            Officer Finder encountered a temporary issue
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Please refresh or try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => this.setState({ hasError: false, message: '' })}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
          >
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const OfficerFinderContent: React.FC<OfficerFinderViewProps> = ({ language }) => {
  const o = UI_TRANSLATIONS.officers;

  // Maps API key (from build env or runtime /api/maps-config)
  const [mapsApiKey, setMapsApiKey] = useState<string>(
    () => (import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string | undefined) || ''
  );
  const [isLoadingKey, setIsLoadingKey] = useState<boolean>(
    () => !import.meta.env.VITE_GOOGLE_MAPS_API_KEY
  );

  // Location & Search Controls
  const [pinInput, setPinInput] = useState<string>('');
  const [searchCenter, setSearchCenter] = useState<{ lat: number; lng: number }>({
    lat: DEFAULT_INDIA_CENTER.lat,
    lng: DEFAULT_INDIA_CENTER.lng,
  });
  const [centerLabel, setCenterLabel] = useState<string>(DEFAULT_INDIA_CENTER.label);
  const [radiusKm, setRadiusKm] = useState<number>(10);
  const [selectedTaskId, setSelectedTaskId] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<OfficerRole | 'all'>('all');
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);

  // Live Data Sources
  const [portalOfficers, setPortalOfficers] = useState<OfficerProfile[]>([]);
  const [nearbyPlaces, setNearbyPlaces] = useState<MapPlaceOfficer[]>([]);
  const [isSearchingPlaces, setIsSearchingPlaces] = useState<boolean>(false);
  const [isGeocoding, setIsGeocoding] = useState<boolean>(false);
  const [isDetectingGps, setIsDetectingGps] = useState<boolean>(false);
  const [locationNotice, setLocationNotice] = useState<string>('');

  // Selection & Modals
  const [selectedOfficerId, setSelectedOfficerId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);

  // Fetch client Maps API key from server if not baked into build env
  useEffect(() => {
    if (mapsApiKey) {
      setIsLoadingKey(false);
      return;
    }
    let cancelled = false;
    fetch('/api/maps-config')
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled && typeof data?.apiKey === 'string') {
          setMapsApiKey(data.apiKey);
        }
      })
      .catch(() => {
        // Map component handles missing key gracefully
      })
      .finally(() => {
        if (!cancelled) setIsLoadingKey(false);
      });
    return () => {
      cancelled = true;
    };
  }, [mapsApiKey]);

  // Real-time Firestore listener for verified onboarded officers
  useEffect(() => {
    const q = query(
      collection(db, 'officers'),
      where('verificationStatus', '==', 'verified')
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const list: OfficerProfile[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<OfficerProfile, 'id'>),
        }));
        setPortalOfficers(list);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'officers');
        } catch {
          // Non-fatal fallback: nearby Maps results remain available
        }
      }
    );
    return () => unsub();
  }, []);

  // Determine effective roles to query
  const activeTaskReq = useMemo(
    () => (selectedTaskId === 'all' ? null : getTaskRequirement(selectedTaskId)),
    [selectedTaskId]
  );

  const effectiveRoles: OfficerRole[] = useMemo(() => {
    if (selectedRole !== 'all') return [selectedRole];
    if (activeTaskReq && activeTaskReq.roles.length > 0) return activeTaskReq.roles;
    return OFFICER_ROLES;
  }, [selectedRole, activeTaskReq]);

  // Fetch nearby offices from Google Places API (New) via server proxy
  const fetchNearbyMapsOfficers = useCallback(async () => {
    if (verifiedOnly || (activeTaskReq && activeTaskReq.level === 'no')) {
      setNearbyPlaces([]);
      return;
    }
    setIsSearchingPlaces(true);
    try {
      const resp = await fetch('/api/nearby-officers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: searchCenter.lat,
          lng: searchCenter.lng,
          radiusKm,
          roles: effectiveRoles,
          language,
        }),
      });
      const data = await resp.json().catch(() => ({}));
      if (resp.status === 429 || data?.quotaExceeded) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
      }
      if (Array.isArray(data?.places)) {
        setNearbyPlaces(data.places);
      } else {
        setNearbyPlaces([]);
      }
    } catch {
      setNearbyPlaces([]);
    } finally {
      setIsSearchingPlaces(false);
    }
  }, [
    searchCenter.lat,
    searchCenter.lng,
    radiusKm,
    effectiveRoles,
    language,
    verifiedOnly,
    activeTaskReq,
  ]);

  useEffect(() => {
    void fetchNearbyMapsOfficers();
  }, [fetchNearbyMapsOfficers]);

  // Localized tasks for Task Selector
  const localizedProcedures = useMemo(
    () => PROCEDURES_DATA.map((p) => getLocalizedProcedure(p, language)),
    [language]
  );

  const handleTaskChange = (procedureId: string) => {
    setSelectedTaskId(procedureId);
    setSelectedOfficerId(null);
    if (procedureId === 'all') {
      setSelectedRole('all');
      return;
    }
    const req = getTaskRequirement(procedureId);
    if (req && req.roles.length === 1) {
      setSelectedRole(req.roles[0]);
    } else {
      setSelectedRole('all');
    }
  };

  // Search by 6-digit Indian PIN code or city/locality
  const handlePinSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = pinInput.trim();
    if (cleaned.length < 2) return;

    setIsGeocoding(true);
    setLocationNotice('');
    setSelectedOfficerId(null);

    try {
      const resp = await fetch('/api/geocode-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: cleaned, language }),
      });
      const data = await resp.json().catch(() => ({}));

      if (resp.status === 429 || data?.quotaExceeded) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        setLocationNotice('Maps search quota reached. Showing verified portal directory.');
        return;
      }

      if (!resp.ok || typeof data?.lat !== 'number' || typeof data?.lng !== 'number') {
        setLocationNotice(
          data?.error || 'Location not found. Try a valid 6-digit PIN code or Indian city.'
        );
        return;
      }

      setSearchCenter({ lat: data.lat, lng: data.lng });
      setCenterLabel(data.formattedAddress || cleaned);
    } catch {
      setLocationNotice('Could not reach location service. Please retry.');
    } finally {
      setIsGeocoding(false);
    }
  };

  // Browser GPS detection
  const handleUseGps = () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setLocationNotice('GPS is not supported in this browser. Please enter your 6-digit PIN code.');
      return;
    }
    setIsDetectingGps(true);
    setLocationNotice('');
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const nextLat = pos.coords.latitude;
        const nextLng = pos.coords.longitude;
        setSearchCenter({ lat: nextLat, lng: nextLng });
        setCenterLabel(`${nextLat.toFixed(4)}, ${nextLng.toFixed(4)} (GPS)`);
        setSelectedOfficerId(null);
        setIsDetectingGps(false);
      },
      () => {
        setLocationNotice(
          'Location permission was blocked. Enter your 6-digit PIN code or city instead.'
        );
        setIsDetectingGps(false);
      },
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  // Merge Verified Firestore Officers + Live Google Maps Offices and sort by distance
  const unifiedOfficers: UnifiedOfficerItem[] = useMemo(() => {
    const allowedRoles = new Set<OfficerRole>(effectiveRoles);

    const verifiedItems: UnifiedOfficerItem[] = portalOfficers
      .filter((off) => allowedRoles.has(off.role))
      .map((off) => {
        const dist = calculateDistanceKm(
          searchCenter.lat,
          searchCenter.lng,
          off.lat,
          off.lng
        );
        return {
          id: `portal-${off.id}`,
          source: 'portal' as const,
          name: off.fullName,
          role: off.role,
          subtitle: `${off.designation} • ${off.officeName}`,
          officeName: off.officeName,
          address: `${off.addressLine}, ${off.city}, ${off.state} – ${off.pinCode}`,
          lat: off.lat,
          lng: off.lng,
          distanceKm: dist,
          verified: true,
          visitingHours: off.visitingHours,
          feeNote: off.feeNote,
          contact: off.officeContact,
          languagesSpoken: off.languagesSpoken,
          supportedTasks: off.supportedTasks,
          pinCode: off.pinCode,
          city: off.city,
          state: off.state,
        };
      })
      .filter((item) => item.distanceKm === null || item.distanceKm <= radiusKm);

    const mapItems: UnifiedOfficerItem[] = verifiedOnly
      ? []
      : nearbyPlaces
          .filter((p) => allowedRoles.has(p.role))
          .map((p) => {
            const dist = calculateDistanceKm(
              searchCenter.lat,
              searchCenter.lng,
              p.lat,
              p.lng
            );
            return {
              id: `gmaps-${p.id}`,
              source: 'google_maps' as const,
              name: p.name,
              role: p.role,
              subtitle: t(o.roles[p.role], language),
              officeName: p.name,
              address: p.formattedAddress,
              lat: p.lat,
              lng: p.lng,
              distanceKm: dist,
              verified: false,
              contact: p.nationalPhoneNumber,
              rating: p.rating,
              userRatingCount: p.userRatingCount,
              openNow: p.openNow,
              googleMapsUri: p.googleMapsUri,
            };
          })
          .filter((item) => item.distanceKm === null || item.distanceKm <= radiusKm * 1.5);

    const combined = [...verifiedItems, ...mapItems];
    combined.sort((a, b) => {
      // Verified onboarded officers within radius surface cleanly first if very close, otherwise strict nearest-first
      if (a.verified !== b.verified && a.distanceKm !== null && b.distanceKm !== null) {
        if (Math.abs(a.distanceKm - b.distanceKm) <= 2) {
          return a.verified ? -1 : 1;
        }
      }
      return (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999);
    });

    return combined;
  }, [
    portalOfficers,
    nearbyPlaces,
    effectiveRoles,
    searchCenter.lat,
    searchCenter.lng,
    radiusKm,
    verifiedOnly,
    language,
    o.roles,
  ]);

  const handleCopyAddress = (item: UnifiedOfficerItem) => {
    const text = `${item.name} (${item.officeName}) — ${item.address}`;
    if (navigator.clipboard?.writeText) {
      void navigator.clipboard.writeText(text);
    }
    setCopiedId(item.id);
    setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 2000);
  };

  return (
    <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-5 space-y-5">
      {/* Top Workspace Header */}
      <section className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t(o.hero.title, language)}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">
              {t(o.hero.subtitle, language)}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOnboardingOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 shrink-0 transition-all active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            <span>{t(o.hero.registerOfficerBtn, language)}</span>
          </button>
        </div>

        {/* Task-to-Officer Requirement Selector */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-col lg:flex-row lg:items-center gap-3">
            <label
              htmlFor="officer-task-select"
              className="text-xs font-bold text-slate-700 dark:text-slate-300 shrink-0"
            >
              {t(o.taskSelector.label, language)}:
            </label>
            <select
              id="officer-task-select"
              value={selectedTaskId}
              onChange={(e) => handleTaskChange(e.target.value)}
              className="flex-1 max-w-xl px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">{t(o.taskSelector.allTasksOption, language)}</option>
              {localizedProcedures.map((proc) => (
                <option key={proc.id} value={proc.id}>
                  {proc.title}
                </option>
              ))}
            </select>
          </div>

          {/* Dynamic Requirement Banner when a task is chosen */}
          {activeTaskReq && (
            <div
              className={`p-3.5 rounded-xl border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                activeTaskReq.level === 'no'
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : activeTaskReq.level === 'yes'
                  ? 'bg-blue-50/80 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 text-blue-950 dark:text-blue-200'
                  : 'bg-amber-50/80 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800 text-amber-950 dark:text-amber-200'
              }`}
            >
              <div className="flex items-start gap-2.5">
                {activeTaskReq.level === 'no' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-extrabold uppercase tracking-wide text-[11px]">
                      {activeTaskReq.level === 'yes' && t(o.taskSelector.badgeYes, language)}
                      {activeTaskReq.level === 'often' && t(o.taskSelector.badgeOften, language)}
                      {activeTaskReq.level === 'usually_no' &&
                        t(o.taskSelector.badgeUsuallyNo, language)}
                      {activeTaskReq.level === 'no' && t(o.taskSelector.badgeNo, language)}
                    </span>
                    {activeTaskReq.roles.map((r) => (
                      <span
                        key={r}
                        className="px-2 py-0.5 rounded-md bg-white/80 dark:bg-slate-900/70 border border-current/15 text-[11px] font-bold"
                      >
                        {t(o.roles[r], language)}
                      </span>
                    ))}
                  </div>
                  <p className="leading-relaxed">
                    {t(o.taskNotes[activeTaskReq.noteKey], language)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Location Search + Radius + Verified Toggle */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3">
          <div className="flex flex-col md:flex-row gap-2.5">
            <form onSubmit={handlePinSearch} className="flex-1 flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  placeholder={t(o.controls.pinPlaceholder, language)}
                  className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                disabled={isGeocoding}
                className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-xs sm:text-sm font-bold shrink-0 flex items-center gap-1.5"
              >
                {isGeocoding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>{t(o.controls.searchBtn, language)}</span>
              </button>
            </form>

            <button
              type="button"
              onClick={handleUseGps}
              disabled={isDetectingGps}
              className="px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shrink-0"
            >
              {isDetectingGps ? (
                <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
              ) : (
                <LocateFixed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              )}
              <span>{t(o.controls.useGpsBtn, language)}</span>
            </button>

            <select
              aria-label={t(o.controls.radiusLabel, language)}
              value={radiusKm}
              onChange={(e) => setRadiusKm(Number(e.target.value))}
              className="px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 shrink-0"
            >
              {[5, 10, 25, 50].map((km) => (
                <option key={km} value={km}>
                  {t(o.controls.radiusLabel, language)}: {km} km
                </option>
              ))}
            </select>
          </div>

          {locationNotice && (
            <p className="text-xs text-amber-700 dark:text-amber-300 font-medium">
              {locationNotice}
            </p>
          )}

          {/* Role Filter Strip + Verified Portal Toggle */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                type="button"
                onClick={() => setSelectedRole('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                  selectedRole === 'all'
                    ? 'bg-slate-900 dark:bg-blue-600 text-white border-slate-900 dark:border-blue-600'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                {t(o.roles.all, language)}
              </button>
              {OFFICER_ROLES.map((role) => {
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    type="button"
                    onClick={() => setSelectedRole(role)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-colors ${
                      active
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    {t(o.roles[role], language)}
                  </button>
                );
              })}
            </div>

            <label className="inline-flex items-center gap-2 cursor-pointer select-none shrink-0">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-600"
              />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                {t(o.controls.verifiedOnly, language)}
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* Main 12-Column Split Workspace: Results List (5 cols) + Interactive Map (7 cols) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* LEFT COLUMN: Distance-Sorted Officer Results */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between px-1">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
              <span className="text-slate-900 dark:text-white">{unifiedOfficers.length}</span>{' '}
              {t(o.controls.resultsCount, language)}{' '}
              <span className="text-blue-700 dark:text-blue-400">{centerLabel}</span>
            </p>
            {isSearchingPlaces && (
              <Loader2 className="w-4 h-4 text-blue-600 animate-spin shrink-0" />
            )}
          </div>

          <div className="space-y-3 lg:max-h-[620px] lg:overflow-y-auto lg:pr-1">
            {isSearchingPlaces && unifiedOfficers.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <Loader2 className="w-6 h-6 text-blue-600 animate-spin mx-auto" />
                <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {t(o.controls.searching, language)}
                </p>
              </div>
            ) : unifiedOfficers.length === 0 ? (
              <div className="p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-2">
                <MapPin className="w-7 h-7 text-slate-400 mx-auto" />
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {t(o.controls.noResults, language)}
                </p>
              </div>
            ) : (
              unifiedOfficers.map((item) => {
                const isSelected = item.id === selectedOfficerId;
                const roleStyle = OFFICER_ROLE_STYLE[item.role];

                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedOfficerId(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer bg-white dark:bg-slate-900 ${
                      isSelected
                        ? 'border-2 border-blue-600 dark:border-blue-500 shadow-md'
                        : 'border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-xs'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {item.verified ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 text-[11px] font-bold">
                            <ShieldCheck className="w-3 h-3" />
                            {t(o.controls.verifiedBadge, language)}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold">
                            <MapPin className="w-3 h-3" />
                            {t(o.controls.mapsBadge, language)}
                          </span>
                        )}

                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-md border text-[11px] font-bold ${roleStyle.badgeBg} ${roleStyle.badgeText}`}
                        >
                          {t(o.roles[item.role], language)}
                        </span>
                      </div>

                      {item.distanceKm !== null && (
                        <span className="text-xs font-extrabold text-blue-700 dark:text-blue-400 whitespace-nowrap shrink-0">
                          {item.distanceKm} km
                        </span>
                      )}
                    </div>

                    <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-2 leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 font-medium">
                      {item.subtitle}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {item.address}
                    </p>

                    <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-600 dark:text-slate-400">
                      {item.visitingHours && (
                        <span className="inline-flex items-center gap-1">
                          <Clock className="w-3 h-3 shrink-0" />
                          {item.visitingHours}
                        </span>
                      )}
                      {item.openNow && (
                        <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-bold">
                          ● {t(o.controls.openNow, language)}
                        </span>
                      )}
                      {item.contact && (
                        <span className="inline-flex items-center gap-1">
                          <Phone className="w-3 h-3 shrink-0" />
                          {item.contact}
                        </span>
                      )}
                      {typeof item.rating === 'number' && (
                        <span className="inline-flex items-center gap-1 text-amber-700 dark:text-amber-400 font-semibold">
                          <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                          {item.rating.toFixed(1)}
                          {item.userRatingCount ? ` (${item.userRatingCount})` : ''}
                        </span>
                      )}
                    </div>

                    {item.feeNote && (
                      <p className="mt-2 text-[11px] font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50/70 dark:bg-emerald-950/30 px-2.5 py-1 rounded-lg border border-emerald-200/70 dark:border-emerald-900">
                        {item.feeNote}
                      </p>
                    )}

                    <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <a
                        href={
                          item.googleMapsUri ||
                          buildDirectionsUrl(item.lat, item.lng, item.name)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        <span>{t(o.controls.directionsBtn, language)}</span>
                        <ExternalLink className="w-3 h-3 opacity-80" />
                      </a>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyAddress(item);
                        }}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold inline-flex items-center gap-1.5"
                      >
                        {copiedId === item.id ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{t(o.controls.copied, language)}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>{t(o.controls.copyAddressBtn, language)}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Google Map */}
        <div className="lg:col-span-7 lg:sticky lg:top-20 space-y-2.5">
          <OfficerMapCanvas
            apiKey={mapsApiKey}
            center={searchCenter}
            centerLabel={centerLabel}
            officers={unifiedOfficers}
            selectedOfficerId={selectedOfficerId}
            onSelectOfficer={setSelectedOfficerId}
            language={language}
            isLoadingKey={isLoadingKey}
          />

          {/* Compact Map Pin Legend & PDF Disclaimer */}
          <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3 flex-wrap font-semibold">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block" />
                {t(o.controls.verifiedBadge, language)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                {t(o.controls.mapsBadge, language)}
              </span>
            </div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">
              {t(o.hero.disclaimer, language)}
            </span>
          </div>
        </div>
      </section>

      {/* Officer Onboarding & Admin Verification Modal */}
      <OfficerOnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        language={language}
      />
    </main>
  );
};

export const OfficerFinderView: React.FC<OfficerFinderViewProps> = (props) => (
  <OfficerFinderErrorBoundary>
    <OfficerFinderContent {...props} />
  </OfficerFinderErrorBoundary>
);
