import { useEffect, useId, useRef, useState } from 'react';
import type { ChangeEvent, DragEvent, FC } from 'react';
import { sha256 } from '../../helper/hash.helper.ts';
import { CloseIcon, DocumentIcon, TextIcon, UploadIcon } from './icons';
import { HashFingerprint } from './HashFingerprint';

export const ACCEPTED_FILE_TYPES = '.pdf,.docx,.xlsx,.csv,.txt,.doc,.xls';

type InputMethod = 'text' | 'file';

interface IProps {
  inputMethod: InputMethod;
  onInputMethodChange: (method: InputMethod) => void;
  textInput: string;
  onTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  file: File | null;
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onFileDrop: (file: File) => void;
  onFileClear: () => void;
  disabled?: boolean;
}

const formatSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

export const DocumentInput: FC<IProps> = ({
  inputMethod,
  onInputMethodChange,
  textInput,
  onTextChange,
  file,
  onFileChange,
  onFileDrop,
  onFileClear,
  disabled,
}) => {
  const id = useId();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [textHash, setTextHash] = useState<string | null>(null);

  useEffect(() => {
    if (inputMethod !== 'text' || !textInput.trim()) {
      setTextHash(null);
      return;
    }
    let cancelled = false;
    sha256(textInput).then((hash) => {
      if (!cancelled) setTextHash(hash);
    });
    return () => {
      cancelled = true;
    };
  }, [textInput, inputMethod]);

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const dropped = e.dataTransfer.files?.[0];
    if (dropped) onFileDrop(dropped);
  };

  const handleClear = () => {
    onFileClear();
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const tabClass = (active: boolean) =>
    `flex items-center gap-2 border-b-2 px-1 pb-2.5 text-sm font-medium transition-colors ${
      active ? 'border-stamp text-ink' : 'border-transparent text-ink-faint hover:text-ink'
    }`;

  return (
    <div>
      <div role="tablist" aria-label="Document source" className="flex gap-6 border-b border-rule">
        <button
          type="button"
          role="tab"
          aria-selected={inputMethod === 'text'}
          onClick={() => onInputMethodChange('text')}
          className={tabClass(inputMethod === 'text')}
        >
          <TextIcon className="size-4" />
          Paste text
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={inputMethod === 'file'}
          onClick={() => onInputMethodChange('file')}
          className={tabClass(inputMethod === 'file')}
        >
          <DocumentIcon className="size-4" />
          Upload file
        </button>
      </div>

      <div className="pt-5">
        {inputMethod === 'text' ? (
          <div>
            <label htmlFor={`${id}-text`} className="sr-only">
              Document text
            </label>
            <textarea
              id={`${id}-text`}
              value={textInput}
              onChange={onTextChange}
              disabled={disabled}
              rows={7}
              placeholder="Paste the exact text of the document…"
              className="block w-full resize-y rounded-md border border-rule bg-sheet px-4 py-3 text-[15px] leading-relaxed text-ink placeholder:text-ink-faint/80 transition-colors focus:border-stamp focus:outline-none focus:ring-2 focus:ring-stamp/20 disabled:opacity-60"
            />
            <p className="mt-2 text-xs text-ink-faint">
              Whitespace and punctuation count — the text must match character for character.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              id={`${id}-file`}
              onChange={onFileChange}
              disabled={disabled}
              className="sr-only"
              accept={ACCEPTED_FILE_TYPES}
            />
            {!file ? (
              <label
                htmlFor={`${id}-file`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`flex cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed px-6 py-10 text-center transition-colors ${
                  isDragging
                    ? 'border-stamp bg-stamp-wash'
                    : 'border-rule bg-paper/60 hover:border-ink-faint hover:bg-paper'
                }`}
              >
                <span className="flex size-11 items-center justify-center rounded-full border border-rule bg-sheet text-stamp">
                  <UploadIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-[15px] font-medium text-ink">
                    {isDragging ? 'Drop to add this file' : 'Choose a file or drag it here'}
                  </span>
                  <span className="mt-1 block text-sm text-ink-faint">PDF, DOCX, XLSX, CSV or TXT</span>
                </span>
              </label>
            ) : (
              <div className="flex items-center gap-3 rounded-md border border-rule bg-sheet px-4 py-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded border border-rule bg-paper text-ink-soft">
                  <DocumentIcon className="size-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-ink">{file.name}</p>
                  <p className="text-xs text-ink-faint">{formatSize(file.size)}</p>
                </div>
                <button
                  type="button"
                  onClick={handleClear}
                  disabled={disabled}
                  aria-label={`Remove ${file.name}`}
                  className="rounded p-1.5 text-ink-faint transition-colors hover:bg-paper hover:text-ink disabled:opacity-50"
                >
                  <CloseIcon className="size-4" />
                </button>
              </div>
            )}
            <p className="text-xs text-ink-faint">
              The text content of the file is extracted and hashed in your browser. The file itself never
              leaves your device.
            </p>
          </div>
        )}
      </div>

      {textHash && (
        <div className="mt-5 rounded-md border border-rule-soft bg-paper/70 px-4 py-3">
          <p className="mb-2 text-xs font-medium text-ink-faint">SHA-256 fingerprint of this text</p>
          <HashFingerprint hash={textHash} />
        </div>
      )}
    </div>
  );
};
