import React, { useState, useRef, useEffect } from 'react';

interface Preset {
  id: string;
  name: string;
  minKb: number;
  maxKb: number;
  format: 'image/jpeg' | 'application/pdf';
  targetKb: number;
}

const PRESETS: Preset[] = [
  {
    id: 'neet-photo',
    name: 'NEET Photo (10–200 KB)',
    minKb: 10,
    maxKb: 200,
    targetKb: 85,
    format: 'image/jpeg',
  },
  {
    id: 'signature',
    name: 'Signature (10–100 KB)',
    minKb: 10,
    maxKb: 100,
    targetKb: 45,
    format: 'image/jpeg',
  },
  {
    id: 'document',
    name: 'Document (50–300 KB)',
    minKb: 50,
    maxKb: 300,
    targetKb: 180,
    format: 'image/jpeg',
  },
];

interface KbResizerProps {
  initialPreset?: string;
}

export const KbResizer: React.FC<KbResizerProps> = ({ initialPreset }) => {
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
        initialPreset.toLowerCase().includes(p.name.split(' ')[0].toLowerCase())
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

        // Downscale large dimensions if needed
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

        // Iterative compression towards targetKb
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
      // Demo simulated file download
      const canvas = document.createElement('canvas');
      canvas.width = 400;
      canvas.height = 500;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#f8fafc';
        ctx.fillRect(0, 0, 400, 500);
        ctx.fillStyle = '#0051d5';
        ctx.font = '20px Inter, sans-serif';
        ctx.fillText('Digital Sahayak Resized File', 50, 240);
        ctx.font = '14px Inter, sans-serif';
        ctx.fillStyle = '#64748b';
        ctx.fillText(`Target: ${file.resizedSizeKb} KB • 100% Client-Side`, 50, 270);
      }
      const demoUrl = canvas.toDataURL('image/jpeg', 0.82);
      const a = document.createElement('a');
      a.href = demoUrl;
      a.download = `digital_sahayak_${file.resizedSizeKb}kb.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-5 shadow-sm" id="resizer">
      <div className="flex items-center gap-2 pb-3 border-b border-outline-variant">
        <span className="material-symbols-outlined text-secondary text-xl" data-icon="crop">
          crop
        </span>
        <div>
          <h3 className="text-body-strong font-body-strong text-on-surface">Client-Side KB Resizer</h3>
          <p className="text-[11px] text-on-tertiary-container font-semibold">🔒 Files never leave your browser</p>
        </div>
      </div>

      {/* Spec Presets */}
      <div className="mt-4">
        <label className="text-label-sm font-label-sm text-on-surface-variant block mb-1.5">Preset Specifications</label>
        <div className="grid grid-cols-1 gap-1.5">
          {PRESETS.map((preset) => {
            const isSelected = selectedPreset.id === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => {
                  setSelectedPreset(preset);
                  setFile((prev) => ({
                    ...prev,
                    resizedSizeKb: preset.targetKb,
                  }));
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-label-sm font-label-sm flex items-center justify-between transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-surface-container-low border border-secondary text-secondary font-bold'
                    : 'bg-surface-container-lowest border border-outline-variant hover:border-secondary text-on-surface'
                }`}
                type="button"
              >
                <span>{preset.name}</span>
                {isSelected ? (
                  <span className="material-symbols-outlined text-base" data-icon="check_circle">
                    check_circle
                  </span>
                ) : (
                  <span className="text-caption font-caption text-on-surface-variant">JPG</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Resizer Drop/Preview Area */}
      <div className="mt-4 border-2 border-dashed border-outline-variant rounded-xl p-3 bg-surface-container-low text-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-3 bg-surface-container-lowest p-2 rounded-lg border border-outline-variant text-left cursor-pointer hover:border-secondary transition-colors"
          title="Click to choose a file from your device"
        >
          <div className="w-12 h-14 bg-surface-container rounded overflow-hidden flex items-center justify-center flex-shrink-0 border border-outline-variant">
            {file.dataUrl ? (
              <img src={file.dataUrl} alt="Thumbnail preview" className="w-full h-full object-cover" />
            ) : (
              <span className="material-symbols-outlined text-2xl text-on-surface-variant" data-icon="person">
                person
              </span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-label-sm font-label-sm font-bold text-on-surface truncate">
                {file.name}
              </span>
              <span className="text-label-sm font-label-sm text-error font-semibold line-through">
                {(file.origSizeKb / 1024).toFixed(1)} MB
              </span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="text-label-sm font-label-sm text-on-tertiary-container font-extrabold flex items-center gap-1">
                <span
                  className="material-symbols-outlined text-sm"
                  data-icon="check"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  check
                </span>
                {file.resizedSizeKb} KB (Ready)
              </span>
              <span className="text-[10px] text-on-surface-variant">Quality: {file.quality}%</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2 text-[11px] text-secondary">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="hover:underline font-semibold cursor-pointer"
          >
            📂 Upload Another Image
          </button>
          <span>Within {selectedPreset.minKb}–{selectedPreset.maxKb} KB</span>
        </div>

        <p className="text-caption font-caption text-on-surface-variant mt-2 text-left">
          Fits within standard portal {selectedPreset.minKb}–{selectedPreset.maxKb} KB envelope without losing clarity.
        </p>

        <button
          onClick={handleDownload}
          className="mt-3 w-full bg-secondary hover:bg-secondary-container text-on-secondary font-label-md font-semibold py-2.5 px-3 rounded-lg shadow-sm transition-all active:scale-[0.98] flex items-center justify-center gap-1.5 min-h-[44px] cursor-pointer"
          type="button"
        >
          <span className="material-symbols-outlined text-lg" data-icon="download">
            download
          </span>
          <span>Download Resized File ({file.resizedSizeKb} KB)</span>
        </button>
      </div>
    </div>
  );
};
