import React, { useState, useRef, useEffect } from 'react';
import { getAppIcon } from '../utils/appIcons';
import { Language } from '../utils/translations';

interface Preset {
  id: string;
  name: string;
  label: string;
  range: string;
  minKb: number;
  maxKb: number;
  format: 'image/jpeg' | 'application/pdf';
  targetKb: number;
}

const PRESETS: Preset[] = [
  {
    id: 'neet-photo',
    name: 'NEET photo',
    label: 'NEET photo',
    range: '10-200 KB',
    minKb: 10,
    maxKb: 200,
    targetKb: 85,
    format: 'image/jpeg',
  },
  {
    id: 'signature',
    name: 'Signature',
    label: 'Signature',
    range: '10-100 KB',
    minKb: 10,
    maxKb: 100,
    targetKb: 45,
    format: 'image/jpeg',
  },
  {
    id: 'document',
    name: 'Document',
    label: 'Document',
    range: '50-300 KB',
    minKb: 50,
    maxKb: 300,
    targetKb: 180,
    format: 'image/jpeg',
  },
];

interface KbResizerProps {
  initialPreset?: string;
  language?: Language;
  theme?: 'light' | 'dark';
}

export const KbResizer: React.FC<KbResizerProps> = ({
  initialPreset,
  language = 'hinglish',
  theme = 'light',
}) => {
  const [selectedPreset, setSelectedPreset] = useState<Preset>(PRESETS[0]);
  const [file, setFile] = useState<{
    name: string;
    origSizeKb: number;
    resizedSizeKb: number;
    dataUrl: string;
    quality: number;
  }>({
    name: 'passport_photo.jpg',
    origSizeKb: 3480, // 3.4 MB
    resizedSizeKb: 85,
    dataUrl: '',
    quality: 82,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialPreset) {
      const match = PRESETS.find((p) =>
        initialPreset.toLowerCase().includes(p.name.toLowerCase())
      );
      if (match) setSelectedPreset(match);
    }
  }, [initialPreset]);

  // Client-side image resizing using HTML Canvas
  const processImage = (imageFile: File, targetKb: number) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let quality = 0.85;
        let width = img.width;
        let height = img.height;

        const maxDim = 1200;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        let compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        let approxKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);

        if (approxKb > targetKb && quality > 0.3) {
          quality = Math.max(0.2, (targetKb / approxKb) * quality);
          compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
          approxKb = Math.round((compressedDataUrl.length * 3) / 4 / 1024);
        }

        setFile({
          name: imageFile.name,
          origSizeKb: Math.round(imageFile.size / 1024),
          resizedSizeKb: approxKb,
          dataUrl: compressedDataUrl,
          quality: Math.round(quality * 100),
        });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      processImage(selected, selectedPreset.targetKb);
    }
  };

  const handleDownload = () => {
    if (file.dataUrl) {
      const a = document.createElement('a');
      a.href = file.dataUrl;
      a.download = `resized_${file.name.replace(/\.[^/.]+$/, '')}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      // Create a dummy download if demo image
      const canvas = document.createElement('canvas');
      canvas.width = 350;
      canvas.height = 450;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f1f5f9';
        ctx.fillRect(0, 0, 350, 450);
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 16px Inter, sans-serif';
        ctx.fillText('Digital Sahayak Resized', 50, 220);
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/jpeg', 0.85);
        a.download = `resized_${file.name}`;
        a.click();
      }
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4" id="resizer">
      {/* Resizer Header matching Screenshot */}
      <div>
        <div className="flex items-center gap-2">
          <img
            src={getAppIcon('resize', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            {language === 'hi' ? 'केबी (KB) रीसाइज़र' : 'KB Resizer'}
          </h3>
        </div>
        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-0.5">
          {language === 'hi' ? 'फ़ाइलें कभी आपके फ़ोन/ब्राउज़र से बाहर नहीं जातीं' : 'Files never leave your browser'}
        </p>
      </div>

      {/* Preset specifications tabs */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
          {language === 'hi' ? 'प्रीसेट साइज़ निर्देश' : 'PRESET SPECIFICATIONS'}
        </span>
        <div className="space-y-1.5">
          {PRESETS.map((p) => {
            const isSelected = p.id === selectedPreset.id;
            const localizedLabel =
              p.id === 'neet-photo' && language === 'hi'
                ? 'नीट फोटो (NEET Photo)'
                : p.id === 'signature' && language === 'hi'
                ? 'हस्ताक्षर (Signature)'
                : p.id === 'document' && language === 'hi'
                ? 'दस्तावेज़ (Document)'
                : p.label;

            return (
              <button
                key={p.id}
                onClick={() => setSelectedPreset(p)}
                type="button"
                className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-bold shadow-2xs'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200'
                }`}
              >
                <span>{localizedLabel}</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  {p.range}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* File status container matching Screenshot */}
      <div className="bg-slate-50/70 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-800 rounded-xl p-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/50 flex items-center justify-center shrink-0">
          <img
            src={getAppIcon('camera', theme)}
            alt=""
            className="w-5 h-5 object-contain"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-xs text-slate-900 dark:text-white truncate">
            {file.name}
          </div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
            {file.origSizeKb > 1000
              ? `${(file.origSizeKb / 1024).toFixed(1)} MB`
              : `${file.origSizeKb} KB`}{' '}
            →{' '}
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              {file.resizedSizeKb} KB {language === 'hi' ? 'तैयार' : 'ready'}
            </span>{' '}
            • {language === 'hi' ? 'गुणवत्ता' : 'quality'} {file.quality}%
          </div>
        </div>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Action Buttons matching Screenshot */}
      <div className="space-y-2">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-xs py-2 px-3 rounded-xl transition cursor-pointer"
          type="button"
        >
          {language === 'hi' ? 'दूसरी फ़ोटो अपलोड करें' : 'Upload another image'}
        </button>

        <button
          onClick={handleDownload}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-2.5 px-3 rounded-xl shadow-xs transition active:scale-[0.99] cursor-pointer"
          type="button"
        >
          {language === 'hi'
            ? `रीसाइज़ फ़ाइल डाउनलोड करें (${file.resizedSizeKb} KB)`
            : `Download resized file (${file.resizedSizeKb} KB)`}
        </button>
      </div>
    </div>
  );
};
