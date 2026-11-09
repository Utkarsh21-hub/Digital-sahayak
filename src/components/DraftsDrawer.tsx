import React from 'react';
import { Icon } from './Icon';

interface DraftsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenDraftTemplate: (templateId: string) => void;
}

export const DraftsDrawer: React.FC<DraftsDrawerProps> = ({
  isOpen,
  onClose,
  onOpenDraftTemplate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="card drawer" id="drawer" role="dialog" aria-label="Your drafts">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
        <strong className="text-sm font-bold flex items-center gap-1.5">
          <Icon name="drafts" size={16} />
          Your drafts
        </strong>
        <button
          type="button"
          onClick={onClose}
          className="text-xs text-[var(--muted)] hover:text-[var(--ink)] font-semibold"
        >
          Close
        </button>
      </div>

      <div
        className="d cursor-pointer hover:border-[var(--accent)] transition"
        onClick={() => {
          onOpenDraftTemplate('gazette-name-change');
          onClose();
        }}
      >
        <b>Name change affidavit</b>
        <small>Edited today, 3:40 PM • Gazette Notification</small>
      </div>

      <div
        className="d cursor-pointer hover:border-[var(--accent)] transition"
        onClick={() => {
          onOpenDraftTemplate('cpgrams-grievance');
          onClose();
        }}
      >
        <b>CPGRAMS Grievance Complaint</b>
        <small>Edited yesterday • Vigilance & Public Grievance</small>
      </div>

      <div
        className="d cursor-pointer hover:border-[var(--accent)] transition"
        onClick={() => {
          onOpenDraftTemplate('neet-undertaking');
          onClose();
        }}
      >
        <b>NEET / NTA Name Undertaking</b>
        <small>Draft template ready • Exam Declaration</small>
      </div>
    </div>
  );
};
