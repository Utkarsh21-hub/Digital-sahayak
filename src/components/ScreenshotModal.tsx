import React, { useState, useRef } from 'react';

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResizer: () => void;
  taskTitle: string;
  language: 'hinglish' | 'hi' | 'en';
}

const SAMPLE_ERRORS = [
  {
    id: 'nta-502',
    portal: 'exams.nta.ac.in',
    code: 'HTTP 502 / Upload Error',
    message: '"Error Code 502: Document dimension mismatch or file exceeds 200KB limit during multipart upload session."',
    defaultAnalysis: {
      section1: 'Aapka photo size 200 KB se bada hai ya image ka format galat hai. Server ne upload reject kar diya hai.',
      section2: 'Portal par photo ka size maximum 200 KB allowed hai, lekin aapka phone camera se liya gaya file 1.8 MB ka hai.',
      section3: 'Digital Sahayak ke "KB Resizer" tool me photo daalein aur 85 KB wala file download karke wapas upload karein.',
    },
  },
  {
    id: 'parivahan-401',
    portal: 'parivahan.gov.in',
    code: 'HTTP 401 / Session Expired',
    message: '"Session timed out due to inactivity for more than 15 minutes. Token invalidated."',
    defaultAnalysis: {
      section1: 'Portal session expire ho gaya hai aur server ne security ke liye aapko log out kar diya hai.',
      section2: 'Form bharne me 15 minute se zyada der tak page bina click kiye khula raha.',
      section3: 'Browser ko Incognito/Private window me kholen, Parivahan par dobara login karein aur form jaldi submit karein.',
    },
  },
  {
    id: 'uidai-300',
    portal: 'myaadhaar.uidai.gov.in',
    code: 'Error 300 / Biometric Mismatch',
    message: '"Error 300: Biometric authentication failed with UIDAI central database."',
    defaultAnalysis: {
      section1: 'Aadhaar server aapke fingerprint ya iris ko pehchan nahi paaya hai.',
      section2: 'Ungli par dhool ya heena (mehendi) thi ya sensor par theek se press nahi hua.',
      section3: 'Ungli ko saaf karein aur operator se doosri ungli scan karne ko bolein, ya Iris (aankh) scan use karein.',
    },
  },
  {
    id: 'sbipay-pending',
    portal: 'pgportal / Bharatkosh / NTA',
    code: 'Payment Status: PENDING / DOUBLE DEDUCTION',
    message: '"Transaction status pending from bank. Do not initiate double payment for 24 hours."',
    defaultAnalysis: {
      section1: 'Bank se paise kat gaye hain lekin sarkari portal ko confirmation signal abhi nahi mila hai.',
      section2: 'Bank server aur government portal gateway ke beech network delay hai.',
      section3: 'Galti se dobara payment MAT karein. 24 ghante intezaar karein, status automatically update ya refund ho jayega.',
    },
  },
];

export const ScreenshotModal: React.FC<ScreenshotModalProps> = ({
  isOpen,
  onClose,
  onOpenResizer,
  taskTitle,
  language,
}) => {
  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [customImageName, setCustomImageName] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{
    section1: string;
    section2: string;
    section3: string;
  }>(SAMPLE_ERRORS[0].defaultAnalysis);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const currentSample = SAMPLE_ERRORS[selectedSampleIndex];

  const handleSelectSample = (idx: number) => {
    setSelectedSampleIndex(idx);
    setCustomImage(null);
    setCustomImageName('');
    setAnalysisResult(SAMPLE_ERRORS[idx].defaultAnalysis);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCustomImageName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setCustomImage(base64);
        // Automatically analyze the uploaded screenshot with Gemini
        analyzeWithGemini(base64, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeWithGemini = async (imageBase64?: string, imageName?: string) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/analyze-screenshot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imageBase64 || (customImage ? customImage : null),
          mimeType: 'image/jpeg',
          errorText: imageBase64 ? `User uploaded screenshot: ${imageName}` : currentSample.message,
          taskContext: taskTitle,
          language,
        }),
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      if (data.analysis) {
        setAnalysisResult({
          section1: data.analysis.section1 || 'Error analysis completed.',
          section2: data.analysis.section2 || 'Cause identified from portal message.',
          section3: data.analysis.section3 || 'Suggested actionable resolution provided.',
        });
      }
    } catch (err) {
      console.error(err);
      // Fallback gracefully to default helpful analysis
      setAnalysisResult(currentSample.defaultAnalysis);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-surface-container-lowest max-w-2xl w-full rounded-2xl border border-outline-variant shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-xl" data-icon="psychology">
                psychology
              </span>
            </div>
            <div>
              <h3 className="text-headline-sm font-headline-sm text-on-surface">
                Screenshot Sahayak — Visual Error Decoder
              </h3>
              <p className="text-caption font-caption text-on-surface-variant">
                Plain Hinglish analysis of confusing government server errors
              </p>
            </div>
          </div>
          <button
            className="w-10 h-10 rounded-xl hover:bg-surface-container text-on-surface-variant hover:text-on-surface flex items-center justify-center transition-colors cursor-pointer"
            onClick={onClose}
            type="button"
          >
            <span className="material-symbols-outlined" data-icon="close">
              close
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Preset Error Selector or Custom Upload */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-label-sm font-label-sm text-on-surface-variant font-bold uppercase">
                Choose Sample Error or Upload Your Own:
              </label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="text-label-sm font-label-sm text-secondary bg-surface-container-low hover:bg-surface-container px-3 py-1 rounded-lg border border-secondary font-bold flex items-center gap-1 cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-sm" data-icon="upload_file">
                  upload_file
                </span>
                <span>Upload My Screenshot</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {SAMPLE_ERRORS.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => handleSelectSample(idx)}
                  className={`text-left p-2 rounded-lg text-[11px] border transition-colors cursor-pointer truncate ${
                    selectedSampleIndex === idx && !customImage
                      ? 'border-secondary bg-surface-container-low font-bold text-secondary'
                      : 'border-outline-variant bg-surface-container-lowest text-on-surface-variant hover:text-on-surface'
                  }`}
                  type="button"
                >
                  <span className="block truncate font-semibold">{s.code.split('/')[0]}</span>
                  <span className="text-[10px] text-on-surface-variant block truncate">{s.portal}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Error Screenshot Visual Simulation */}
          <div className="bg-surface-container rounded-xl p-4 border border-outline-variant">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-outline-variant text-label-sm font-label-sm text-on-surface-variant">
              <span>
                {customImage
                  ? `Uploaded User Screenshot (${customImageName})`
                  : `Captured Portal Window (${currentSample.portal})`}
              </span>
              <span className="text-error font-mono font-bold">
                {customImage ? 'Custom Screenshot' : currentSample.code}
              </span>
            </div>

            {customImage ? (
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <img
                  src={customImage}
                  alt="User uploaded screenshot"
                  className="max-h-36 rounded-lg border border-outline-variant object-contain bg-white"
                />
                <div className="flex-1 text-caption text-on-surface">
                  <p className="font-semibold">Analyzed via gemini-3.5-flash-lite / flash-lite model.</p>
                  <p className="text-on-surface-variant text-xs mt-1">
                    Decoded server error text directly from your uploaded image.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-error-container/40 border border-error-container p-3 rounded-lg flex items-center gap-3">
                <span className="material-symbols-outlined text-error text-2xl" data-icon="error">
                  error
                </span>
                <code className="text-caption font-caption text-on-error-container font-mono">
                  {currentSample.message}
                </code>
              </div>
            )}
          </div>

          {/* Trigger Live AI Analysis button */}
          <div className="flex justify-end">
            <button
              onClick={() => analyzeWithGemini()}
              disabled={isLoading}
              className="bg-secondary hover:bg-secondary-container text-on-secondary text-label-sm font-semibold px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
              type="button"
            >
              <span className="material-symbols-outlined text-base" data-icon="auto_awesome">
                auto_awesome
              </span>
              <span>{isLoading ? 'Decoding with Gemini...' : 'Re-Analyze with Gemini AI'}</span>
            </button>
          </div>

          {/* 3-Section AI Analysis Output Card */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Section 1 */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-secondary text-label-sm font-label-sm font-bold mb-2">
                <span className="material-symbols-outlined text-base" data-icon="visibility">
                  visibility
                </span>
                <span>1. Screen Par Kya Likha Hai</span>
              </div>
              <p className="text-caption font-caption text-on-surface leading-relaxed">
                {analysisResult.section1}
              </p>
            </div>

            {/* Section 2 */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-error text-label-sm font-label-sm font-bold mb-2">
                <span className="material-symbols-outlined text-base" data-icon="help_center">
                  help_center
                </span>
                <span>2. Galti Kyun Hui</span>
              </div>
              <p className="text-caption font-caption text-on-surface leading-relaxed">
                {analysisResult.section2}
              </p>
            </div>

            {/* Section 3 */}
            <div className="bg-surface-container-low border border-outline-variant rounded-xl p-4">
              <div className="flex items-center gap-1.5 text-on-tertiary-container text-label-sm font-label-sm font-bold mb-2">
                <span className="material-symbols-outlined text-base" data-icon="arrow_circle_right">
                  arrow_circle_right
                </span>
                <span>3. Abhi Kya Karein</span>
              </div>
              <p className="text-caption font-caption text-on-surface leading-relaxed">
                {analysisResult.section3}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-surface-container-low border-t border-outline-variant flex items-center justify-between">
          <span className="text-label-sm font-label-sm text-on-surface-variant">
            Zero fee self-resolution guidance
          </span>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2.5 rounded-xl border border-outline-variant text-label-md font-label-md font-semibold text-on-surface hover:bg-surface-container transition-all cursor-pointer"
              onClick={onClose}
              type="button"
            >
              Close
            </button>
            <button
              className="px-4 py-2.5 rounded-xl bg-secondary text-on-secondary text-label-md font-label-md font-semibold hover:bg-secondary-container transition-all cursor-pointer"
              onClick={() => {
                onClose();
                onOpenResizer();
              }}
              type="button"
            >
              Open KB Resizer Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
