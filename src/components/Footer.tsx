import React from 'react';

interface FooterProps {
  onOpenDirectory: () => void;
  onOpenHelp: () => void;
  onOpenResizer: () => void;
  onOpenScreenshotModal: () => void;
  onOpenChat: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenDirectory,
  onOpenHelp,
  onOpenResizer,
  onOpenScreenshotModal,
  onOpenChat,
}) => {
  return (
    <>
      {/* STATUTORY FOOTER (Shared Component Anchor) */}
      <footer className="bg-surface-container-high text-on-surface text-headline-sm font-headline-sm docked full-width bottom border-t border-outline-variant mt-12 pb-16 md:pb-0">
        <div className="w-full py-8 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright & Mandate */}
          <div className="text-caption font-caption text-on-surface-variant text-center md:text-left max-w-2xl">
            <p className="text-headline-sm font-headline-sm font-bold text-on-surface mb-1">
              Digital Sahayak
            </p>
            © 2025 Digital Sahayak (डिजिटल सहायक). An open civic initiative for direct citizen enablement on .gov.in and .nic.in systems. No middleman charges.
          </div>

          {/* Statutory Civic Links */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-x-6 gap-y-2 text-caption font-caption">
            <a
              className="text-on-surface-variant hover:text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary"
              href="tel:1947"
            >
              Official Helpline (1947)
            </a>
            <a
              className="text-secondary font-semibold underline hover:text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary"
              href="https://pgportal.gov.in"
              rel="noopener noreferrer"
              target="_blank"
            >
              CPGRAMS Grievance (pgportal.gov.in)
            </a>
            <button
              onClick={onOpenHelp}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
            >
              Anti-Fraud Guidelines
            </button>
            <button
              onClick={onOpenDirectory}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
            >
              Direct Portal Directory
            </button>
            <button
              onClick={onOpenHelp}
              className="text-on-surface-variant hover:text-secondary transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-secondary cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </footer>

      {/* Floating AI Chat Sahayak Trigger on Desktop */}
      <div className="hidden md:block fixed bottom-6 right-6 z-40">
        <button
          onClick={onOpenChat}
          className="bg-secondary hover:bg-secondary-container text-on-secondary px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 font-bold transition-all active:scale-95 cursor-pointer ring-2 ring-white/50"
          type="button"
          title="Open Digital Sahayak AI Assistant"
        >
          <span className="material-symbols-outlined text-2xl" data-icon="smart_toy">
            smart_toy
          </span>
          <span className="text-label-md">Ask Sahayak AI</span>
        </button>
      </div>

      {/* MOBILE BOTTOM NAVIGATION TRAY (Appears on Mobile only, hidden on md+) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest border-t border-outline-variant px-4 py-2 flex items-center justify-around shadow-lg">
        <button
          className="flex flex-col items-center text-secondary font-bold cursor-pointer"
          onClick={() => window.scrollTo({ top: 120, behavior: 'smooth' })}
        >
          <span
            className="material-symbols-outlined"
            data-icon="home"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            home
          </span>
          <span className="text-[11px] font-semibold">Services</span>
        </button>

        <button
          className="flex flex-col items-center text-on-surface-variant hover:text-secondary cursor-pointer"
          onClick={onOpenResizer}
        >
          <span className="material-symbols-outlined" data-icon="crop">
            crop
          </span>
          <span className="text-[11px]">Resizer</span>
        </button>

        <button
          className="flex flex-col items-center text-on-surface-variant hover:text-secondary cursor-pointer"
          onClick={onOpenScreenshotModal}
          type="button"
        >
          <span className="material-symbols-outlined" data-icon="photo_camera">
            photo_camera
          </span>
          <span className="text-[11px]">Sahayak</span>
        </button>

        <button
          className="flex flex-col items-center text-on-surface-variant hover:text-secondary cursor-pointer"
          onClick={onOpenChat}
          type="button"
        >
          <span className="material-symbols-outlined" data-icon="chat">
            chat
          </span>
          <span className="text-[11px]">AI Chat</span>
        </button>

        <a
          className="flex flex-col items-center text-on-surface-variant hover:text-secondary cursor-pointer"
          href="tel:1947"
        >
          <span className="material-symbols-outlined" data-icon="call">
            call
          </span>
          <span className="text-[11px]">1947 Help</span>
        </a>
      </nav>
    </>
  );
};
