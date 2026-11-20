import React, { useEffect, useState } from 'react';
import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import {
  ExternalLink,
  ShieldCheck,
  MapPin,
  Clock,
  Phone,
  Star,
  Navigation,
} from 'lucide-react';
import {
  OFFICER_ROLE_STYLE,
  UnifiedOfficerItem,
  buildDirectionsUrl,
} from '../utils/officerRequirements';
import { Language, UI_TRANSLATIONS, t } from '../utils/translations';

interface OfficerMapCanvasProps {
  apiKey: string;
  center: { lat: number; lng: number };
  centerLabel: string;
  officers: UnifiedOfficerItem[];
  selectedOfficerId: string | null;
  onSelectOfficer: (id: string | null) => void;
  language: Language;
  isLoadingKey?: boolean;
}

function mapLanguageToMapsApi(lang: Language): string {
  if (lang === 'hinglish') return 'en';
  return lang;
}

const MapCameraSync: React.FC<{
  center: { lat: number; lng: number };
  selectedOfficer: UnifiedOfficerItem | null;
}> = ({ center, selectedOfficer }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    if (selectedOfficer) {
      map.panTo({ lat: selectedOfficer.lat, lng: selectedOfficer.lng });
      const currentZoom = map.getZoom();
      if (typeof currentZoom === 'number' && currentZoom < 14) {
        map.setZoom(14);
      }
    } else {
      map.panTo(center);
    }
  }, [map, center.lat, center.lng, selectedOfficer?.id]);

  return null;
};

interface OfficerMarkerItemProps {
  officer: UnifiedOfficerItem;
  isSelected: boolean;
  onSelect: () => void;
  onCloseInfo: () => void;
  language: Language;
}

const OfficerMarkerItem: React.FC<OfficerMarkerItemProps> = ({
  officer,
  isSelected,
  onSelect,
  onCloseInfo,
  language,
}) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const roleStyle = OFFICER_ROLE_STYLE[officer.role];
  const o = UI_TRANSLATIONS.officers;

  const pinBg = officer.verified ? '#059669' : roleStyle.pinBg;
  const pinBorder = officer.verified ? '#064e3b' : roleStyle.pinBorder;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: officer.lat, lng: officer.lng }}
        onClick={onSelect}
        title={officer.name}
        zIndex={isSelected ? 50 : officer.verified ? 20 : 10}
      >
        <Pin
          background={pinBg}
          borderColor={pinBorder}
          glyphColor="#ffffff"
          scale={isSelected ? 1.28 : officer.verified ? 1.1 : 0.98}
        >
          <span className="text-[11px] font-extrabold leading-none text-white">
            {officer.verified ? '✓' : roleStyle.shortCode}
          </span>
        </Pin>
      </AdvancedMarker>

      {isSelected && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={300}
          onCloseClick={onCloseInfo}
        >
          <div className="p-1 text-slate-900 font-sans max-w-[270px]">
            <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
              {officer.verified ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  <ShieldCheck className="w-3 h-3" />
                  {t(o.controls.verifiedBadge, language)}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-semibold">
                  <MapPin className="w-3 h-3" />
                  {t(o.controls.mapsBadge, language)}
                </span>
              )}
              {officer.distanceKm !== null && (
                <span className="text-[11px] font-bold text-blue-700">
                  {officer.distanceKm} {t(o.controls.awayKm, language)}
                </span>
              )}
            </div>

            <h4 className="font-bold text-sm text-slate-900 leading-snug">
              {officer.name}
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              {officer.subtitle}
            </p>
            <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
              {officer.address}
            </p>

            <div className="mt-2 space-y-1 text-[11px] text-slate-700">
              {officer.visitingHours && (
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{officer.visitingHours}</span>
                </div>
              )}
              {officer.contact && (
                <div className="flex items-center gap-1.5">
                  <Phone className="w-3 h-3 text-slate-500 shrink-0" />
                  <span>{officer.contact}</span>
                </div>
              )}
              {typeof officer.rating === 'number' && (
                <div className="flex items-center gap-1 text-amber-700 font-semibold">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  <span>
                    {officer.rating.toFixed(1)}
                    {officer.userRatingCount ? ` (${officer.userRatingCount})` : ''}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-3 flex items-center gap-2">
              <a
                href={
                  officer.googleMapsUri ||
                  buildDirectionsUrl(officer.lat, officer.lng, officer.name)
                }
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t(o.controls.directionsBtn, language)}</span>
                <ExternalLink className="w-3 h-3 opacity-80" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
};

export const OfficerMapCanvas: React.FC<OfficerMapCanvasProps> = ({
  apiKey,
  center,
  centerLabel,
  officers,
  selectedOfficerId,
  onSelectOfficer,
  language,
  isLoadingKey = false,
}) => {
  const [mapLoadError, setMapLoadError] = useState(false);
  const selectedOfficer =
    officers.find((item) => item.id === selectedOfficerId) || null;
  const mapsLang = mapLanguageToMapsApi(language);

  if (isLoadingKey) {
    return (
      <div className="w-full h-[460px] lg:h-[620px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 flex flex-col items-center justify-center gap-3">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
          Loading interactive map...
        </p>
      </div>
    );
  }

  if (!apiKey || mapLoadError) {
    return (
      <div className="w-full h-[460px] lg:h-[620px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/80 dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-3">
          <MapPin className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
          Interactive Map Unavailable
        </h4>
        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 max-w-sm">
          Verified portal officers from Digital Sahayak remain listed on the left with direct Google Maps navigation links.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full h-[460px] lg:h-[620px] rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xs bg-slate-100 dark:bg-slate-900 relative">
      <APIProvider
        apiKey={apiKey}
        libraries={['marker']}
        language={mapsLang}
        region="IN"
        onError={() => setMapLoadError(true)}
      >
        <GoogleMap
          mapId="DEMO_MAP_ID"
          defaultCenter={center}
          defaultZoom={12}
          gestureHandling="greedy"
          streetViewControl={false}
          mapTypeControl={false}
          fullscreenControl={true}
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          style={{ width: '100%', height: '100%' }}
        >
          <MapCameraSync center={center} selectedOfficer={selectedOfficer} />

          {/* User Search Origin / Home PIN Marker */}
          <AdvancedMarker
            position={center}
            title={centerLabel}
            zIndex={40}
          >
            <div className="flex flex-col items-center">
              <div className="w-5 h-5 rounded-full bg-slate-900 border-[3px] border-white shadow-md flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-blue-400" />
              </div>
            </div>
          </AdvancedMarker>

          {/* Verified Portal & Live Google Maps Officer Markers */}
          {officers.map((officer) => (
            <OfficerMarkerItem
              key={officer.id}
              officer={officer}
              isSelected={officer.id === selectedOfficerId}
              onSelect={() => onSelectOfficer(officer.id)}
              onCloseInfo={() => onSelectOfficer(null)}
              language={language}
            />
          ))}
        </GoogleMap>
      </APIProvider>
    </div>
  );
};
