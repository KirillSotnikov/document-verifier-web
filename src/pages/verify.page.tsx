import { useCallback, useState } from 'react';
import { fileToHashBrowser, sha256 } from "../helper/hash.helper.ts";
import { useVerifyDocument } from '../hooks';
import { useCurrentNetwork } from '../hooks/useCurrentNetwork';
import { NETWORKS } from '../hooks/config';
import { openErrorNotification, openSuccessNotification } from '../helper/toast.helper.ts';
import { PageHeader } from '../components/ui/PageHeader';
import { DocumentInput } from '../components/ui/DocumentInput';
import { Notice } from '../components/ui/Notice';
import { Button } from '../components/ui/Button';
import { HashFingerprint } from '../components/ui/HashFingerprint';
import { CopyIcon, Spinner } from '../components/ui/icons';

const Seal = () => (
  <svg viewBox="0 0 120 120" className="size-28 animate-stamp text-verified sm:size-32" role="img" aria-label="Verified seal">
    <defs>
      <path id="seal-circle" d="M60,60 m-42,0 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" />
    </defs>
    <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2.5" />
    <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" />
    <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="1" />
    <text fill="currentColor" fontSize="9" fontWeight="600" letterSpacing="1.75" fontFamily="IBM Plex Sans Condensed, sans-serif">
      <textPath href="#seal-circle" startOffset="0">
        VERIFIED ON CHAIN · DOCUMENT REGISTRY ·
      </textPath>
    </text>
    <path d="m47 60 9 9 18-18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const VerifyPage = () => {
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [documentHash, setDocumentHash] = useState<`0x${string}` | undefined>(undefined);

  const { currentNetwork } = useCurrentNetwork();

  const {
    document,
    isLoading,
    error,
    isConnected,
  } = useVerifyDocument(documentHash);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      openErrorNotification('Connect your wallet on a supported network to verify documents');
      return;
    }

    setIsProcessing(true);

    try {
      let contentHash: string;

      if (file) {
        const { hash } = await fileToHashBrowser(file);
        contentHash = hash;
      } else if (textInput.trim()) {
        contentHash = await sha256(textInput);
      } else {
        openErrorNotification('Paste some text or choose a file first');
        return;
      }

      setDocumentHash(`0x${contentHash}`);
    } catch (error) {
      console.error(error);
      openErrorNotification('Could not read this document. Check the file is not corrupted or password-protected.');
    } finally {
      setIsProcessing(false);
    }
  }, [textInput, file, isConnected]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setInputMethod('file');
      setTextInput('');
    }
  };

  const handleFileDrop = (droppedFile: File) => {
    setFile(droppedFile);
    setInputMethod('file');
    setTextInput('');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextInput(e.target.value);
    if (e.target.value.trim()) {
      setInputMethod('text');
      setFile(null);
    }
  };

  const handleVerifyAgain = () => {
    setDocumentHash(undefined);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    openSuccessNotification('Document hash copied');
  };

  const isVerifying = isProcessing || isLoading;
  const hasInput = inputMethod === 'file' ? !!file : !!textInput.trim();

  return (
    <div className="py-10 sm:py-14">
      <PageHeader
        title="Verify a document"
        description="Check whether a document was registered, by whom and when. Provide the exact text or file that was originally registered."
      />

      <div className="mx-auto mt-8 max-w-3xl space-y-4">
        {!document ? (
          <form onSubmit={handleSubmit} className="rounded-lg border border-rule bg-sheet p-5 sm:p-7">
            <DocumentInput
              inputMethod={inputMethod}
              onInputMethodChange={setInputMethod}
              textInput={textInput}
              onTextChange={handleTextChange}
              file={file}
              onFileChange={handleFileChange}
              onFileDrop={handleFileDrop}
              onFileClear={() => setFile(null)}
              disabled={isVerifying}
            />

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-rule-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-faint">Verification is a free read — no transaction is sent.</p>
              <Button type="submit" size="lg" disabled={isVerifying || !hasInput} className="sm:min-w-[200px]">
                {isVerifying ? (
                  <>
                    <Spinner />
                    {isProcessing ? 'Hashing document…' : 'Checking registry…'}
                  </>
                ) : (
                  'Verify document'
                )}
              </Button>
            </div>
          </form>
        ) : (
          <article className="relative overflow-hidden rounded-lg border border-rule bg-sheet">
            <div className="h-1.5 bg-verified" aria-hidden="true" />
            <div className="p-6 sm:p-9">
              <div className="flex flex-col-reverse gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-verified">Registered document found</p>
                  <h2 className="mt-2 font-display text-[1.75rem] font-semibold leading-tight text-ink break-words sm:text-[2rem]">
                    {document.documentName}
                  </h2>
                  {currentNetwork && (
                    <p className="mt-2 text-sm text-ink-faint">Recorded on {NETWORKS[currentNetwork as keyof typeof NETWORKS].name}</p>
                  )}
                </div>
                <div className="shrink-0 self-start sm:-mr-2 sm:-mt-2">
                  <Seal />
                </div>
              </div>

              <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 border-t border-rule-soft pt-6 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium text-ink-faint">Registered</dt>
                  <dd className="mt-1 text-[15px] text-ink">
                    {new Date(Number(document.timestamp) * 1000).toLocaleString(undefined, {
                      dateStyle: 'long',
                      timeStyle: 'short',
                    })}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium text-ink-faint">Registered by</dt>
                  <dd className="mt-1 font-mono text-[13px] leading-6 text-ink break-all">{document.owner}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs font-medium text-ink-faint">Document fingerprint (SHA-256)</dt>
                  <dd className="mt-2">
                    <HashFingerprint hash={document.documentHash} />
                  </dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-col gap-3 border-t border-rule-soft bg-paper/60 px-6 py-4 sm:flex-row sm:justify-end sm:px-9">
              <Button variant="secondary" onClick={() => handleCopyHash(document.documentHash)}>
                <CopyIcon className="size-4" />
                Copy hash
              </Button>
              <Button onClick={handleVerifyAgain}>Verify another document</Button>
            </div>
          </article>
        )}

        {error && (
          <Notice tone="error" title="No matching record">
            This document is not in the registry on the current network. Check that it's the exact
            original, or switch to the network it was registered on.
          </Notice>
        )}

        {!isConnected && (
          <Notice tone="caution" title="Wallet not ready">
            Connect a wallet and select a supported network to verify documents.
          </Notice>
        )}
      </div>
    </div>
  );
};
