import React, { useEffect, useState } from 'react';
import {
  X,
  ShieldCheck,
  UserPlus,
  ClipboardList,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Lock,
  LogOut,
  Trash2,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
  updateDoc,
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  isBootstrappedAdminUser,
  OperationType,
} from '../firebase';
import {
  OFFICER_ROLES,
  OfficerPrivateCredentials,
  OfficerProfile,
  OfficerRole,
  TASK_OFFICER_REQUIREMENTS,
} from '../utils/officerRequirements';
import { PROCEDURES_DATA } from '../utils/procedures';
import {
  Language,
  UI_TRANSLATIONS,
  getLocalizedProcedure,
  t,
} from '../utils/translations';

interface OfficerOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const LANGUAGE_CHOICES = [
  'English',
  'Hindi',
  'Bengali',
  'Marathi',
  'Telugu',
  'Tamil',
  'Gujarati',
  'Kannada',
];

const DEFAULT_TASKS_BY_ROLE: Record<OfficerRole, string[]> = {
  notary_advocate: [
    'gazette-notification',
    'oci-citizenship',
    'delhi-domicile',
    'up-domicile',
  ],
  gazetted_officer: ['fresh-aadhaar-enrolment', 'tatkaal-passport'],
  tehsildar_revenue: ['fresh-aadhaar-enrolment', 'up-domicile', 'up-caste'],
  mbbs_doctor: ['driving-licence-renewal'],
};

export const OfficerOnboardingModal: React.FC<OfficerOnboardingModalProps> = ({
  isOpen,
  onClose,
  language,
}) => {
  const o = UI_TRANSLATIONS.officers;

  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'register' | 'mine' | 'admin'>('register');

  // Form state
  const [role, setRole] = useState<OfficerRole>('notary_advocate');
  const [fullName, setFullName] = useState('');
  const [designation, setDesignation] = useState('');
  const [officeName, setOfficeName] = useState('');
  const [addressLine, setAddressLine] = useState('');
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const [stateName, setStateName] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [visitingHours, setVisitingHours] = useState('Mon–Sat, 10:00 AM – 5:00 PM');
  const [feeNote, setFeeNote] = useState('Standard statutory fee as per government norms');
  const [officeContact, setOfficeContact] = useState('');
  const [supportedTasks, setSupportedTasks] = useState<string[]>(
    DEFAULT_TASKS_BY_ROLE.notary_advocate
  );
  const [languagesSpoken, setLanguagesSpoken] = useState<string[]>(['Hindi', 'English']);

  // Private verification credentials
  const [personalEmail, setPersonalEmail] = useState('');
  const [personalPhone, setPersonalPhone] = useState('');
  const [registrationId, setRegistrationId] = useState('');

  // Action states
  const [geocoding, setGeocoding] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  // Listings & Admin Queue
  const [myListings, setMyListings] = useState<OfficerProfile[]>([]);
  const [adminQueue, setAdminQueue] = useState<OfficerProfile[]>([]);
  const [adminCredsMap, setAdminCredsMap] = useState<
    Record<string, OfficerPrivateCredentials | null>
  >({});
  const [reviewNotesMap, setReviewNotesMap] = useState<Record<string, string>>({});
  const [reviewActionId, setReviewActionId] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
      if (currentUser) {
        setPersonalEmail((prev) => prev || currentUser.email || '');
        setFullName((prev) => prev || currentUser.displayName || '');
        const bootstrapped = isBootstrappedAdminUser(
          currentUser.email,
          currentUser.emailVerified
        );
        if (bootstrapped) {
          setIsAdmin(true);
        } else {
          try {
            const adminSnap = await getDoc(doc(db, 'admins', currentUser.uid));
            setIsAdmin(adminSnap.exists());
          } catch {
            setIsAdmin(false);
          }
        }
      } else {
        setIsAdmin(false);
      }
    });
    return () => unsub();
  }, []);

  // Subscribe to My Listings when signed in and modal open
  useEffect(() => {
    if (!isOpen || !user) {
      setMyListings([]);
      return;
    }

    const q = query(
      collection(db, 'officers'),
      where('ownerUid', '==', user.uid)
    );
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items: OfficerProfile[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<OfficerProfile, 'id'>),
        }));
        setMyListings(items);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'officers');
        } catch {
          // Handled via structured console log
        }
      }
    );

    return () => unsub();
  }, [isOpen, user]);

  // Subscribe to Admin Verification Queue for bootstrapped admin
  useEffect(() => {
    if (!isOpen || !user || !isAdmin) {
      setAdminQueue([]);
      return;
    }

    const q = query(collection(db, 'officers'));
    const unsub = onSnapshot(
      q,
      (snapshot) => {
        const items: OfficerProfile[] = snapshot.docs
          .map((d) => ({
            id: d.id,
            ...(d.data() as Omit<OfficerProfile, 'id'>),
          }))
          .sort((a, b) => {
            const order = { pending: 0, rejected: 1, verified: 2 };
            return order[a.verificationStatus] - order[b.verificationStatus];
          });
        setAdminQueue(items);
      },
      (err) => {
        try {
          handleFirestoreError(err, OperationType.LIST, 'officers');
        } catch {
          // Handled via structured console log
        }
      }
    );

    return () => unsub();
  }, [isOpen, user, isAdmin]);

  if (!isOpen) return null;

  const handleRoleSelect = (newRole: OfficerRole) => {
    setRole(newRole);
    setSupportedTasks(DEFAULT_TASKS_BY_ROLE[newRole]);
  };

  const toggleTask = (taskId: string) => {
    setSupportedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleLanguageChoice = (langName: string) => {
    setLanguagesSpoken((prev) =>
      prev.includes(langName)
        ? prev.filter((l) => l !== langName)
        : [...prev, langName]
    );
  };

  const handleSignIn = async () => {
    setFormError('');
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      setFormError(err?.message || 'Google Sign-In was cancelled or failed.');
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setActiveTab('register');
  };

  const handleGeocodeAddress = async () => {
    const queryStr = [addressLine, city, stateName, pinCode]
      .filter((s) => s.trim().length > 0)
      .join(', ');
    if (queryStr.length < 3) {
      setFormError('Enter your 6-digit PIN code or office address first.');
      return;
    }

    setGeocoding(true);
    setFormError('');
    try {
      const resp = await fetch('/api/geocode-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryStr, language }),
      });

      const data = await resp.json().catch(() => ({}));
      if (resp.status === 429 || data?.quotaExceeded) {
        window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        setFormError('Maps lookup quota reached. You can still enter coordinates or retry later.');
        return;
      }

      if (!resp.ok || typeof data.lat !== 'number' || typeof data.lng !== 'number') {
        setFormError(data?.error || 'Could not locate PIN code on map. Check spelling and try again.');
        return;
      }

      setLat(data.lat);
      setLng(data.lng);
      if (data.city && !city.trim()) setCity(data.city);
      if (data.district && !district.trim()) setDistrict(data.district);
      if (data.state && !stateName.trim()) setStateName(data.state);
      if (data.pinCode && !pinCode.trim()) setPinCode(data.pinCode);
    } catch {
      setFormError('Network error while locating PIN code.');
    } finally {
      setGeocoding(false);
    }
  };

  const handleSubmitRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setFormError('');
    setFormSuccess('');

    const trimmedPin = pinCode.trim();
    if (!/^[1-9][0-9]{5}$/.test(trimmedPin)) {
      setFormError('Please enter a valid 6-digit Indian PIN code (e.g., 110001).');
      return;
    }
    if (supportedTasks.length === 0) {
      setFormError('Select at least one government service you can sign or attest.');
      return;
    }
    if (languagesSpoken.length === 0) {
      setFormError('Select at least one spoken language.');
      return;
    }

    let resolvedLat = lat;
    let resolvedLng = lng;

    // Auto-geocode from PIN if user hasn't clicked "Locate PIN on Map" yet
    if (resolvedLat === null || resolvedLng === null) {
      try {
        const resp = await fetch('/api/geocode-pin', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: `${addressLine.trim()}, ${city.trim()}, ${trimmedPin}`,
            language,
          }),
        });
        const geo = await resp.json().catch(() => ({}));
        if (resp.status === 429 || geo?.quotaExceeded) {
          window.dispatchEvent(new CustomEvent('gmp-quota-exceeded'));
        }
        if (resp.ok && typeof geo.lat === 'number' && typeof geo.lng === 'number') {
          resolvedLat = geo.lat;
          resolvedLng = geo.lng;
          setLat(geo.lat);
          setLng(geo.lng);
        }
      } catch {
        // Handled below
      }
    }

    if (resolvedLat === null || resolvedLng === null) {
      setFormError('Click "Locate PIN on Map" so citizens can find your exact office location.');
      return;
    }

    setSubmitting(true);
    const officerRef = doc(collection(db, 'officers'));
    const privateRef = doc(db, 'officers', officerRef.id, 'private', 'credentials');

    try {
      const batch = writeBatch(db);
      const now = serverTimestamp();

      batch.set(officerRef, {
        ownerUid: user.uid,
        fullName: fullName.trim(),
        role,
        designation: designation.trim(),
        officeName: officeName.trim(),
        addressLine: addressLine.trim(),
        city: city.trim(),
        district: (district.trim() || city.trim()),
        state: stateName.trim(),
        pinCode: trimmedPin,
        lat: resolvedLat,
        lng: resolvedLng,
        visitingHours: visitingHours.trim(),
        supportedTasks,
        languagesSpoken,
        feeNote: feeNote.trim(),
        officeContact: officeContact.trim(),
        verificationStatus: 'pending',
        createdAt: now,
        updatedAt: now,
      });

      batch.set(privateRef, {
        ownerUid: user.uid,
        personalEmail: personalEmail.trim(),
        personalPhone: personalPhone.trim(),
        registrationId: registrationId.trim(),
        reviewNotes: '',
        reviewedByUid: '',
        createdAt: now,
        updatedAt: now,
      });

      await batch.commit();

      setFormSuccess(
        'Submitted! Your listing is now Pending Verification and will appear publicly with a Verified badge once approved.'
      );
      setDesignation('');
      setOfficeName('');
      setAddressLine('');
      setPinCode('');
      setLat(null);
      setLng(null);
      setRegistrationId('');
      setActiveTab('mine');
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.WRITE, `officers/${officerRef.id}`);
      } catch {
        setFormError(
          'Could not save your registration. Check all fields (valid 6-digit PIN, phone, and registration ID) and try again.'
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteListing = async (officerId: string) => {
    try {
      const batch = writeBatch(db);
      batch.delete(doc(db, 'officers', officerId, 'private', 'credentials'));
      batch.delete(doc(db, 'officers', officerId));
      await batch.commit();
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.DELETE, `officers/${officerId}`);
      } catch {
        setFormError('Unable to delete listing right now.');
      }
    }
  };

  const handleLoadAdminCreds = async (officerId: string) => {
    if (officerId in adminCredsMap) return;
    try {
      const snap = await getDoc(
        doc(db, 'officers', officerId, 'private', 'credentials')
      );
      setAdminCredsMap((prev) => ({
        ...prev,
        [officerId]: snap.exists()
          ? (snap.data() as OfficerPrivateCredentials)
          : null,
      }));
    } catch (err) {
      try {
        handleFirestoreError(
          err,
          OperationType.GET,
          `officers/${officerId}/private/credentials`
        );
      } catch {
        setAdminCredsMap((prev) => ({ ...prev, [officerId]: null }));
      }
    }
  };

  const handleAdminReview = async (
    officerId: string,
    nextStatus: 'verified' | 'rejected'
  ) => {
    if (!user || !isAdmin) return;
    setReviewActionId(officerId);
    try {
      await updateDoc(doc(db, 'officers', officerId), {
        verificationStatus: nextStatus,
        updatedAt: serverTimestamp(),
      });

      const note = (reviewNotesMap[officerId] || '').trim();
      try {
        await updateDoc(
          doc(db, 'officers', officerId, 'private', 'credentials'),
          {
            reviewNotes: note || (nextStatus === 'verified' ? 'Verified by admin' : 'Needs revision'),
            reviewedByUid: user.uid,
            updatedAt: serverTimestamp(),
          }
        );
      } catch {
        // Private doc update is secondary if it wasn't created
      }
    } catch (err) {
      try {
        handleFirestoreError(err, OperationType.UPDATE, `officers/${officerId}`);
      } catch {
        setFormError('Failed to update verification status.');
      }
    } finally {
      setReviewActionId(null);
    }
  };

  const relevantProcedures = PROCEDURES_DATA.filter(
    (proc) => TASK_OFFICER_REQUIREMENTS[proc.id]?.level !== 'no'
  ).map((proc) => getLocalizedProcedure(proc, language));

  const pendingCount = adminQueue.filter(
    (item) => item.verificationStatus === 'pending'
  ).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden my-auto">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 bg-slate-50/80 dark:bg-slate-900">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                {t(o.onboarding.modalTitle, language)}
              </h3>
              {user && (
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {user.email}
                  {isAdmin && (
                    <span className="ml-2 px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[10px] font-bold">
                      ADMIN
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t(o.onboarding.signOutBtn, language)}</span>
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="w-8 h-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auth Gate or Tabs */}
        {authLoading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
          </div>
        ) : !user ? (
          <div className="p-8 text-center flex flex-col items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <UserPlus className="w-7 h-7" />
            </div>
            <div className="max-w-md">
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                {t(o.hero.registerOfficerBtn, language)}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1.5">
                {t(o.onboarding.signInPrompt, language)}
              </p>
            </div>
            {formError && (
              <div className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-3 py-2 rounded-lg border border-red-200 dark:border-red-900">
                {formError}
              </div>
            )}
            <button
              type="button"
              onClick={handleSignIn}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-sm transition-all active:scale-95"
            >
              {t(o.onboarding.signInBtn, language)}
            </button>
          </div>
        ) : (
          <>
            {/* Navigation Tabs */}
            <div className="px-5 pt-3 border-b border-slate-200 dark:border-slate-800 flex items-center gap-2 overflow-x-auto bg-white dark:bg-slate-900 shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('register')}
                className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'register'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                {t(o.onboarding.tabRegister, language)}
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('mine')}
                className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  activeTab === 'mine'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                <ClipboardList className="w-3.5 h-3.5" />
                {t(o.onboarding.tabMyListings, language)}
                <span className="px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px]">
                  {myListings.length}
                </span>
              </button>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => setActiveTab('admin')}
                  className={`px-3.5 py-2 text-xs font-bold border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                    activeTab === 'admin'
                      ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {t(o.onboarding.tabAdminQueue, language)}
                  {pendingCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-extrabold">
                      {pendingCount}
                    </span>
                  )}
                </button>
              )}
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4">
              {formError && (
                <div className="p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{formError}</span>
                </div>
              )}
              {formSuccess && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{formSuccess}</span>
                </div>
              )}

              {/* TAB 1: REGISTER OFFICE */}
              {activeTab === 'register' && (
                <form onSubmit={handleSubmitRegistration} className="space-y-4">
                  {/* Role Selection */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Officer Category *
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {OFFICER_ROLES.map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => handleRoleSelect(r)}
                          className={`px-3 py-2.5 rounded-xl border text-left text-xs font-bold transition-all ${
                            role === r
                              ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200'
                              : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                          }`}
                        >
                          {t(o.roles[r], language)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Public Office Profile Fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={120}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Adv. Rajesh Sharma / Dr. Meera Verma"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Official Designation *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={120}
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        placeholder="e.g. Notary Public (Govt. of India) / MBBS"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Office / Chamber / Clinic Name *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={160}
                        value={officeName}
                        onChange={(e) => setOfficeName(e.target.value)}
                        placeholder="e.g. Chamber 14, Tis Hazari Court / Tehsil Sadar"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Public Office Desk Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        maxLength={32}
                        value={officeContact}
                        onChange={(e) => setOfficeContact(e.target.value)}
                        placeholder="e.g. 011-23456789"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      Public Office Address & Landmark *
                    </label>
                    <input
                      type="text"
                      required
                      minLength={4}
                      maxLength={240}
                      value={addressLine}
                      onChange={(e) => setAddressLine(e.target.value)}
                      placeholder="Building, Road, Locality, Landmark"
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        6-Digit PIN *
                      </label>
                      <input
                        type="text"
                        required
                        pattern="[1-9][0-9]{5}"
                        maxLength={6}
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        placeholder="110001"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="New Delhi"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        District *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        placeholder="Central Delhi"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        State *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="Delhi"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Map Coordinates Helper */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                      {lat !== null && lng !== null ? (
                        <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                          Map Pin Ready: {lat.toFixed(4)}, {lng.toFixed(4)}
                        </span>
                      ) : (
                        <span>Verify your office PIN coordinates so citizens can navigate accurately.</span>
                      )}
                    </div>
                    <button
                      type="button"
                      disabled={geocoding}
                      onClick={handleGeocodeAddress}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 disabled:opacity-60"
                    >
                      {geocoding && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{t(o.onboarding.autoGeocodeBtn, language)}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Visiting Hours *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={120}
                        value={visitingHours}
                        onChange={(e) => setVisitingHours(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                        Transparent Fee Note
                      </label>
                      <input
                        type="text"
                        maxLength={160}
                        value={feeNote}
                        onChange={(e) => setFeeNote(e.target.value)}
                        placeholder="e.g. ₹0 statutory / ₹50 affidavit attestation"
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>

                  {/* Supported Tasks */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Government Services You Can Sign / Attest *
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {relevantProcedures.map((proc) => {
                        const checked = supportedTasks.includes(proc.id);
                        return (
                          <button
                            key={proc.id}
                            type="button"
                            onClick={() => toggleTask(proc.id)}
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                              checked
                                ? 'bg-blue-600 border-blue-600 text-white'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {proc.title}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Spoken Languages */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Languages Spoken *
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {LANGUAGE_CHOICES.map((langName) => {
                        const checked = languagesSpoken.includes(langName);
                        return (
                          <button
                            key={langName}
                            type="button"
                            onClick={() => toggleLanguageChoice(langName)}
                            className={`px-2.5 py-1 rounded-lg border text-[11px] font-semibold transition-colors ${
                              checked
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                            }`}
                          >
                            {langName}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Private Verification Credentials Section */}
                  <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 space-y-3">
                    <div className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-xs font-bold text-amber-950 dark:text-amber-200">
                          Private Verification Credentials (Not Shown Publicly)
                        </h4>
                        <p className="text-[11px] text-amber-800 dark:text-amber-300/90 mt-0.5">
                          {t(o.onboarding.privacyNotice, language)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Registration / Bar / NMC / Govt ID *
                        </label>
                        <input
                          type="text"
                          required
                          minLength={3}
                          maxLength={100}
                          value={registrationId}
                          onChange={(e) => setRegistrationId(e.target.value)}
                          placeholder="e.g. NOTARY/DL/2021/481"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Personal Phone (For Verification) *
                        </label>
                        <input
                          type="tel"
                          required
                          minLength={7}
                          maxLength={24}
                          value={personalPhone}
                          onChange={(e) => setPersonalPhone(e.target.value)}
                          placeholder="+91 98XXXXXXXX"
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                          Verification Email *
                        </label>
                        <input
                          type="email"
                          required
                          maxLength={160}
                          value={personalEmail}
                          onChange={(e) => setPersonalEmail(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-2 shadow-xs disabled:opacity-60"
                    >
                      {submitting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>{t(o.onboarding.submitBtn, language)}</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: MY LISTINGS */}
              {activeTab === 'mine' && (
                <div className="space-y-3">
                  {myListings.length === 0 ? (
                    <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        You have not submitted any officer listings yet.
                      </p>
                      <button
                        type="button"
                        onClick={() => setActiveTab('register')}
                        className="mt-3 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
                      >
                        {t(o.onboarding.tabRegister, language)}
                      </button>
                    </div>
                  ) : (
                    myListings.map((item) => (
                      <div
                        key={item.id}
                        className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                              {item.fullName}
                            </h4>
                            {item.verificationStatus === 'verified' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[11px] font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                {t(o.onboarding.statusVerified, language)}
                              </span>
                            )}
                            {item.verificationStatus === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                                <Clock className="w-3 h-3" />
                                {t(o.onboarding.statusPending, language)}
                              </span>
                            )}
                            {item.verificationStatus === 'rejected' && (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 text-[11px] font-bold">
                                <XCircle className="w-3 h-3" />
                                {t(o.onboarding.statusRejected, language)}
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                            {item.designation} • {item.officeName}
                          </p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                            {item.addressLine}, {item.city}, {item.state} – {item.pinCode}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleDeleteListing(item.id)}
                          className="self-start sm:self-center px-3 py-1.5 rounded-lg border border-red-200 dark:border-red-900/60 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-semibold flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remove</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 3: ADMIN VERIFICATION QUEUE */}
              {activeTab === 'admin' && isAdmin && (
                <div className="space-y-3">
                  {adminQueue.length === 0 ? (
                    <div className="p-8 text-center rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-xs text-slate-500">
                      No officer onboarding submissions yet.
                    </div>
                  ) : (
                    adminQueue.map((item) => {
                      const creds = adminCredsMap[item.id];
                      const credsLoaded = item.id in adminCredsMap;
                      return (
                        <div
                          key={item.id}
                          className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/40 space-y-3"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                                  {item.fullName}
                                </h4>
                                <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-[11px] font-semibold text-slate-700 dark:text-slate-200">
                                  {t(o.roles[item.role], language)}
                                </span>
                                <span
                                  className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                                    item.verificationStatus === 'verified'
                                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                                      : item.verificationStatus === 'rejected'
                                      ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                                  }`}
                                >
                                  {item.verificationStatus.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                                {item.designation} — {item.officeName}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                                {item.addressLine}, {item.city}, {item.state} ({item.pinCode}) • {item.visitingHours}
                              </p>
                            </div>

                            {!credsLoaded && (
                              <button
                                type="button"
                                onClick={() => handleLoadAdminCreds(item.id)}
                                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 shrink-0"
                              >
                                Inspect Credentials
                              </button>
                            )}
                          </div>

                          {credsLoaded && (
                            <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                              {creds ? (
                                <>
                                  <div>
                                    <span className="font-semibold text-slate-500">Reg / Govt ID:</span>{' '}
                                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                                      {creds.registrationId}
                                    </span>
                                  </div>
                                  <div>
                                    <span className="font-semibold text-slate-500">Contact:</span>{' '}
                                    <span>{creds.personalPhone} • {creds.personalEmail}</span>
                                  </div>
                                </>
                              ) : (
                                <span className="text-slate-500">No private credentials document found.</span>
                              )}
                            </div>
                          )}

                          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
                            <input
                              type="text"
                              value={reviewNotesMap[item.id] || ''}
                              onChange={(e) =>
                                setReviewNotesMap((prev) => ({
                                  ...prev,
                                  [item.id]: e.target.value,
                                }))
                              }
                              placeholder="Optional verification note..."
                              className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-white"
                            />
                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                type="button"
                                disabled={reviewActionId === item.id || item.verificationStatus === 'verified'}
                                onClick={() => handleAdminReview(item.id, 'verified')}
                                className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                {t(o.onboarding.approveBtn, language)}
                              </button>
                              <button
                                type="button"
                                disabled={reviewActionId === item.id || item.verificationStatus === 'rejected'}
                                onClick={() => handleAdminReview(item.id, 'rejected')}
                                className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-1"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                                {t(o.onboarding.rejectBtn, language)}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
