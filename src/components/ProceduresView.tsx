import React, { useState, useMemo, useRef } from 'react';
import { PROCEDURES_DATA, Procedure, filterProcedures } from '../utils/procedures';
import { Icon, getProcedureIcon } from './Icon';

interface ProceduresViewProps {
  selectedProcedureId: string;
  onSelectProcedure: (id: string) => void;
  onOpenResizerForPreset?: (preset: string) => void;
  onOpenScreenshotModal: () => void;
  onOpenDraftGenerator: (template?: string) => void;
  onGoToChat: () => void;
  onGoToScam: () => void;
  language?: 'hinglish' | 'hi' | 'en';
}

export const ProceduresView: React.FC<ProceduresViewProps> = ({
  selectedProcedureId,
  onSelectProcedure,
  onOpenScreenshotModal,
  onOpenDraftGenerator,
  onGoToChat,
  onGoToScam,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [stepIndexMap, setStepIndexMap] = useState<Record<string, number>>({});
  const [checklistMap, setChecklistMap] = useState<Record<string, Record<string, boolean>>>({
    'neet-ug-2025': { photo: true, signature: true, marksheet: false, mobile: false },
  });
  const [copiedWhatsApp, setCopiedWhatsApp] = useState(false);

  // In-browser KB Resizer state
  const [resizerPreset, setResizerPreset] = useState<'photo' | 'signature' | 'document'>('photo');
  const [resizerFile, setResizerFile] = useState<{
    name: string;
    origKb: number;
    resizedKb: number;
    quality: number;
    dataUrl: string;
  }>({
    name: 'passport_photo.jpg',
    origKb: 3480,
    resizedKb: 85,
    quality: 82,
    dataUrl: '',
  });
  const resizerInputRef = useRef<HTMLInputElement>(null);

  // Selected procedure
  const currentProcedure: Procedure = useMemo(() => {
    return (
      PROCEDURES_DATA.find((p) => p.id === selectedProcedureId) ||
      PROCEDURES_DATA[0]
    );
  }, [selectedProcedureId]);

  const currentStepIndex = stepIndexMap[currentProcedure.id] ?? 0;
  const currentStep = currentProcedure.steps[currentStepIndex] || currentProcedure.steps[0];
  const currentChecklist = checklistMap[currentProcedure.id] ?? {};

  const handleToggleChecklist = (itemId: string) => {
    setChecklistMap((prev) => {
      const existing = prev[currentProcedure.id] || {};
      const currentVal =
        existing[itemId] ??
        currentProcedure.checklist.find((c) => c.id === itemId)?.defaultChecked ??
        false;
      return {
        ...prev,
        [currentProcedure.id]: {
          ...existing,
          [itemId]: !currentVal,
        },
      };
    });
  };

  const handleStepChange = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < currentProcedure.steps.length) {
      setStepIndexMap((prev) => ({
        ...prev,
        [currentProcedure.id]: newIndex,
      }));
    }
  };

  const filteredProcedures = useMemo(() => {
    return filterProcedures(PROCEDURES_DATA, searchQuery, categoryFilter);
  }, [searchQuery, categoryFilter]);

  const categoryCounts = useMemo(() => {
    return {
      all: PROCEDURES_DATA.length,
      easy: PROCEDURES_DATA.filter((p) => p.category === 'easy').length,
      medium: PROCEDURES_DATA.filter((p) => p.category === 'medium').length,
      hard: PROCEDURES_DATA.filter((p) => p.category === 'hard').length,
    };
  }, []);

  const readyChecklistCount = currentProcedure.checklist.filter((item) => {
    return currentChecklist[item.id] ?? item.defaultChecked ?? false;
  }).length;

  const progressPercent = Math.round(
    ((currentStepIndex + 1) / currentProcedure.steps.length) * 100
  );

  const tempRefId = `${currentProcedure.tempRefPrefix}88492`;

  const handleCopyWhatsApp = () => {
    const text = `Digital Sahayak: Application Progress Card\nTask: ${currentProcedure.title}\nTemp Ref: ${tempRefId}\nCurrent Step: Step ${currentStepIndex + 1} (${currentStep.title})\nPortal: ${currentProcedure.portalUrl}\nZero tout commission guaranteed.`;
    navigator.clipboard.writeText(text);
    setCopiedWhatsApp(true);
    setTimeout(() => setCopiedWhatsApp(false), 2000);
  };

  // Canvas Image Compression
  const handleResizerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        let targetKb = 85;
        if (resizerPreset === 'signature') targetKb = 40;
        if (resizerPreset === 'document') targetKb = 150;

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

        let compressedUrl = canvas.toDataURL('image/jpeg', quality);
        let approxKb = Math.round((compressedUrl.length * 3) / 4 / 1024);

        if (approxKb > targetKb && quality > 0.3) {
          quality = Math.max(0.2, (targetKb / approxKb) * quality);
          compressedUrl = canvas.toDataURL('image/jpeg', quality);
          approxKb = Math.round((compressedUrl.length * 3) / 4 / 1024);
        }

        setResizerFile({
          name: uploadedFile.name,
          origKb: Math.round(uploadedFile.size / 1024),
          resizedKb: approxKb,
          quality: Math.round(quality * 100),
          dataUrl: compressedUrl,
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(uploadedFile);
    e.target.value = '';
  };

  const handleDownloadResized = () => {
    if (!resizerFile.dataUrl) return;
    const link = document.createElement('a');
    link.download = `resized_${resizerFile.name}`;
    link.href = resizerFile.dataUrl;
    link.click();
  };

  return (
    <div className="view pv" id="view-procs">
      {/* Top Strip */}
      <div className="pv-strip">
        <span className="pill ok">
          <Icon name="check" size={16} />
          100% official portals
        </span>
        <span className="pill">
          <Icon name="shield" size={16} />
          Zero cyber cafe commission
        </span>
        <span className="pill warn">
          <Icon name="help" size={16} />
          Never share your OTP
        </span>
        <span className="saved">
          <span className="dot" />
          Citizens saved today: <b>₹4,28,950</b> in middleman fees
        </span>
      </div>

      {/* Search & Filter Bar */}
      <div className="pv-search">
        <label className="sbox" htmlFor="pq">
          <Icon name="ai-chat" size={18} />
          <input
            id="pq"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search a procedure or grievance, e.g. Driving Licence, NEET, Aadhaar"
          />
          <button
            type="button"
            className="btn ghost sm"
            onClick={() => {
              if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
                const SpeechRecognition =
                  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
                const rec = new SpeechRecognition();
                rec.continuous = false;
                rec.onresult = (e: any) => setSearchQuery(e.results[0][0].transcript);
                rec.start();
              } else {
                alert('Speech recognition is not available in this browser.');
              }
            }}
          >
            <Icon name="mic" size={16} />
            Bol kar
          </button>
        </label>

        <div className="filters" id="pfilters">
          <button
            type="button"
            aria-pressed={categoryFilter === 'all'}
            onClick={() => setCategoryFilter('all')}
          >
            All <b>{categoryCounts.all}</b>
          </button>
          <button
            type="button"
            aria-pressed={categoryFilter === 'easy'}
            onClick={() => setCategoryFilter('easy')}
          >
            Easy · online <b>{categoryCounts.easy}</b>
          </button>
          <button
            type="button"
            aria-pressed={categoryFilter === 'medium'}
            onClick={() => setCategoryFilter('medium')}
          >
            Medium · multi-step <b>{categoryCounts.medium}</b>
          </button>
          <button
            type="button"
            aria-pressed={categoryFilter === 'hard'}
            onClick={() => setCategoryFilter('hard')}
          >
            Hard · grievance <b>{categoryCounts.hard}</b>
          </button>
        </div>
      </div>

      {/* Gemini Chat Callout Banner */}
      <div className="pv-promo">
        <Icon name="ai-chat" size={36} />
        <div>
          <b>Digital Sahayak Gemini Chat</b>
          <small>
            Sawal poochhein, file size check karein, ya error screenshot samjhein: Hinglish, हिंदी ya English mein.
          </small>
        </div>
        <button type="button" className="btn red sm" onClick={onGoToScam}>
          <Icon name="shield" size={16} />
          Scam Shield
        </button>
        <button type="button" className="btn sm" onClick={onGoToChat}>
          Open Gemini Chat
        </button>
      </div>

      {/* Main 3-Column Grid */}
      <div className="pv-grid">
        {/* LEFT COLUMN: PROCEDURE DIRECTORY */}
        <aside className="pv-col">
          <div className="pbox">
            <div className="pbox-h">
              <b>Procedures &amp; Redressal</b>
              <span className="tag" id="verCount">
                {PROCEDURES_DATA.length} verified
              </span>
            </div>
            <div className="avg">
              Average direct citizen saving: <b>₹850 per task</b>
            </div>
          </div>

          <div className="plist" id="plist">
            {filteredProcedures.map((p) => {
              const iconName = getProcedureIcon(p.id);
              const isSelected = p.id === currentProcedure.id;
              const lvlClass = p.category === 'easy' ? 'easy' : p.category === 'medium' ? 'med' : 'hard';
              return (
                <button
                  key={p.id}
                  type="button"
                  className="pitem"
                  aria-current={isSelected ? 'true' : undefined}
                  onClick={() => onSelectProcedure(p.id)}
                >
                  <span className="row1">
                    <Icon name={iconName} size={28} />
                    <span className={`lvl ${lvlClass}`}>{p.tag}</span>
                  </span>
                  <b>{p.title}</b>
                  <span className="url">{p.portal}</span>
                  <span className="row2">
                    <span>
                      Fee: <strong>{p.officialFee ? `₹${p.officialFee}` : 'Free'}</strong>
                    </span>
                    <em>Save {p.savingsLabel}</em>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        {/* MIDDLE COLUMN: STEP-BY-STEP WORKFLOW CANVAS */}
        <section className="pv-col">
          {/* Workflow Header & Pre-flight Box */}
          <div className="pbox">
            <div className="wf-head">
              <div>
                <span className="eyebrow">Step-by-step self-help workflow</span>
                <h2 id="wfTitle">{currentProcedure.title}</h2>
                <p className="sub" id="wfSub">
                  {currentProcedure.subtitle}
                </p>
              </div>
              <a
                className="btn green portal"
                id="wfPortal"
                href={currentProcedure.portalUrl}
                target="_blank"
                rel="noreferrer"
              >
                Open portal
                <small id="wfPortalTxt">{currentProcedure.portal}</small>
              </a>
            </div>

            {/* Fee Transparency */}
            <div className="sec-h">
              <Icon name="check" size={18} />
              Fee transparency <span className="muted">no extra kiosk charges</span>
            </div>
            <div className="fees">
              <div className="fee">
                <small>Official portal fee</small>
                <b id="fOff">{currentProcedure.officialFeeLabel}</b>
                <span>{currentProcedure.officialFeeSubtext}</span>
              </div>
              <div className="fee bad">
                <small>Cyber cafe charge</small>
                <b>
                  <s id="fCafe">{currentProcedure.cyberCafeLabel}</s>
                </b>
                <span>Extra kiosk margin</span>
              </div>
              <div className="fee good">
                <small>Your direct saving</small>
                <b id="fSave">{currentProcedure.savingsLabel}</b>
                <span>100% free self-service</span>
              </div>
            </div>

            {/* Pre-flight Checklist */}
            <div className="sec-h">
              <Icon name="checklist" size={18} />
              Pre-flight document checklist{' '}
              <span className="muted" id="ckCount">
                {readyChecklistCount} of {currentProcedure.checklist.length} ready
              </span>
            </div>
            <div className="checks" id="checks">
              {currentProcedure.checklist.map((item) => {
                const isChecked = currentChecklist[item.id] ?? item.defaultChecked ?? false;
                return (
                  <label key={item.id} className="ck">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleToggleChecklist(item.id)}
                    />
                    <span>
                      <b>{item.label}</b>
                      <small>{item.note}</small>
                    </span>
                    {item.canResize && (
                      <button
                        type="button"
                        className="chip"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById('kb-resizer-tool');
                          el?.scrollIntoView({ behavior: 'smooth' });
                        }}
                      >
                        Resize now
                      </button>
                    )}
                    {item.tag && <span className="chip mute">{item.tag}</span>}
                  </label>
                );
              })}
            </div>

            {/* Fraud Alert */}
            <div className="fraud">
              <Icon name="shield" size={26} />
              <div>
                <b>Middleman &amp; cyber fraud alert</b>
                <p>{currentProcedure.fraudWarning}</p>
              </div>
            </div>

            <button
              type="button"
              className="btn big"
              id="startStep"
              onClick={() => {
                handleStepChange(0);
                const coachEl = document.getElementById('coach-container');
                coachEl?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Icon name="check" size={18} />
              I have these ready: start step 1
            </button>
          </div>

          {/* Guided Coach Box */}
          <div className="pbox" id="coach-container">
            <div className="prog-h">
              <b id="stepLbl">
                Step {currentStepIndex + 1} of {currentProcedure.steps.length}: {currentStep.title}
              </b>
              <span className="tag" id="stepPct">
                {progressPercent}% complete
              </span>
            </div>
            <div className="bar-track">
              <div className="bar-fill" id="stepBar" style={{ width: `${progressPercent}%` }} />
            </div>

            {/* Step Dots Navigation */}
            <div className="steps-row">
              <div className="step-dots" id="stepDots">
                {currentProcedure.steps.map((_, i) => {
                  const isDone = i < currentStepIndex;
                  const isCurrent = i === currentStepIndex;
                  return (
                    <button
                      key={i}
                      type="button"
                      className={`${isDone ? 'done' : ''} ${isCurrent ? 'cur' : ''}`.trim()}
                      onClick={() => handleStepChange(i)}
                      aria-label={`Step ${i + 1}`}
                    >
                      {isDone ? '✓' : i + 1}
                    </button>
                  );
                })}
              </div>
              <div className="nav">
                <button
                  type="button"
                  className="btn ghost sm"
                  id="stepBack"
                  disabled={currentStepIndex === 0}
                  onClick={() => handleStepChange(currentStepIndex - 1)}
                >
                  ← Back
                </button>
                <button
                  type="button"
                  className="btn ghost sm"
                  id="stepNext"
                  disabled={currentStepIndex === currentProcedure.steps.length - 1}
                  onClick={() => handleStepChange(currentStepIndex + 1)}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Coach Detailed Guidance */}
            <div className="coach">
              <span className="eyebrow">Coach instruction</span>
              <h3 id="coachT">{currentStep.actionInstruction}</h3>
              <p id="coachP">{currentStep.detailInstruction}</p>

              {currentStep.toughTerms && currentStep.toughTerms.length > 0 && (
                <>
                  <span className="eyebrow">Tough terms (aasaan matlab)</span>
                  <div className="terms">
                    {currentStep.toughTerms.map((t, idx) => (
                      <span key={idx}>
                        <b>{t.term}</b> = {t.meaning}
                      </span>
                    ))}
                  </div>
                </>
              )}

              {/* Draft Sahayak CTA */}
              <div className="draft-cta">
                <Icon name="draft" size={30} />
                <div>
                  <b>{currentStep.draftButtonLabel || 'Generate formal undertaking / affidavit'}</b>
                  <small>Ready court/portal template · free Gemini auto-fill</small>
                </div>
                <button
                  type="button"
                  className="btn sm"
                  onClick={() => onOpenDraftGenerator(currentStep.draftTemplateId)}
                >
                  Open Draft Sahayak
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: UTILITY TOOLS & ESCALATION */}
        <aside className="pv-col">
          {/* KB Resizer Tool */}
          <div className="pbox" id="kb-resizer-tool">
            <input
              ref={resizerInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleResizerUpload}
            />
            <div className="tool-h">
              <Icon name="resize" size={28} />
              <div>
                <b>KB Resizer</b>
                <small className="okt">Files never leave your browser</small>
              </div>
            </div>
            <span className="eyebrow">Preset specifications</span>
            <div className="presets-v" id="presetsV">
              <button
                type="button"
                aria-pressed={resizerPreset === 'photo'}
                onClick={() => setResizerPreset('photo')}
              >
                NEET photo <small>10-200 KB</small>
              </button>
              <button
                type="button"
                aria-pressed={resizerPreset === 'signature'}
                onClick={() => setResizerPreset('signature')}
              >
                Signature <small>10-100 KB</small>
              </button>
              <button
                type="button"
                aria-pressed={resizerPreset === 'document'}
                onClick={() => setResizerPreset('document')}
              >
                Document <small>50-300 KB</small>
              </button>
            </div>

            <div className="filecard">
              <div className="thumb">
                <Icon name="camera" size={24} />
              </div>
              <div>
                <b>{resizerFile.name}</b>
                <small>
                  <s>{resizerFile.origKb > 1024 ? `${(resizerFile.origKb / 1024).toFixed(1)} MB` : `${resizerFile.origKb} KB`}</s> →{' '}
                  <span className="okt">{resizerFile.resizedKb} KB ready</span> · quality {resizerFile.quality}%
                </small>
              </div>
            </div>

            <button
              type="button"
              className="btn ghost sm full"
              onClick={() => resizerInputRef.current?.click()}
            >
              Upload another image
            </button>
            <button
              type="button"
              className="btn full"
              disabled={!resizerFile.dataUrl}
              onClick={handleDownloadResized}
            >
              Download resized file ({resizerFile.resizedKb} KB)
            </button>
          </div>

          {/* Screenshot Sahayak Tool */}
          <div className="pbox">
            <div className="tool-h">
              <Icon name="camera" size={28} />
              <div>
                <b>Screenshot Sahayak</b>
                <small>
                  <span className="ai-tag">AI decoder</span>
                </small>
              </div>
            </div>
            <p className="muted-p">
              Sarkari portal par ajeeb error aaya? Screenshot daalein, hum Hinglish mein samjhayenge.
            </p>
            <button
              type="button"
              className="dropzone w-full cursor-pointer hover:border-[var(--accent)] transition"
              onClick={onOpenScreenshotModal}
            >
              Upload error screen to analyse
            </button>
          </div>

          {/* Direct Escalation & Application Card */}
          <div className="pbox">
            <div className="tool-h">
              <Icon name="help" size={28} />
              <div>
                <b>Direct escalation &amp; help</b>
                <small>Official channels, no middlemen</small>
              </div>
            </div>
            <div className="kv">
              <span>Call portal helpline</span>
              <code>{currentProcedure.helpline}</code>
            </div>
            <div className="kv">
              <span>CPGRAMS central grievance</span>
              <a href="https://pgportal.gov.in" target="_blank" rel="noreferrer">
                pgportal.gov.in ↗
              </a>
            </div>

            <div className="appcard">
              <div className="pbox-h">
                <b>Your application card</b>
                <span className="tag ok">In progress</span>
              </div>
              <dl>
                <dt>Task</dt>
                <dd id="acTask">{currentProcedure.title}</dd>
                <dt>Temp ref</dt>
                <dd>
                  <code>{tempRefId}</code>
                </dd>
                <dt>Current</dt>
                <dd id="acStep" className="acc">
                  Step {currentStepIndex + 1} ({currentStep.title.slice(0, 24)}...)
                </dd>
                <dt>Remaining</dt>
                <dd id="acRem">
                  {currentProcedure.steps.length - currentStepIndex - 1} steps to final submit
                </dd>
              </dl>
            </div>

            <button
              type="button"
              className="btn green full"
              onClick={handleCopyWhatsApp}
            >
              {copiedWhatsApp ? 'Copied to clipboard!' : 'Copy / share on WhatsApp'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};
