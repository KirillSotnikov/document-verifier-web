import { useCallback, useEffect, useState } from 'react';
import { fileToHashBrowser, sha256 } from "../helper/hash.helper.ts";
import { uuid } from '../helper/uuid.helper.ts';
import { useRegisterDocument } from '../hooks';
import { useCurrentNetwork } from '../hooks/useCurrentNetwork';
import { NETWORKS } from '../hooks/config';
import { openErrorNotification } from '../helper/toast.helper.ts';
import { PageHeader } from '../components/ui/PageHeader';
import { DocumentInput } from '../components/ui/DocumentInput';
import { Notice, readableError } from '../components/ui/Notice';
import { Button } from '../components/ui/Button';
import { StepList, type Step } from '../components/ui/StepList';
import { HashFingerprint } from '../components/ui/HashFingerprint';
import { ExternalIcon, Spinner } from '../components/ui/icons';

type DocumentRegisterParams = {
  documentHash: `0x${string}`;
  documentName: string;
};

export const UploadPage = () => {
  const [registerParams, setRegisterParams] = useState<DocumentRegisterParams | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<DocumentRegisterParams | null>(null);
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');

  const { currentNetwork } = useCurrentNetwork();

  const {
    registerDocument,
    hash: txHash,
    isPending,
    isConfirming,
    isConnected,
    isSuccess,
    error,
    isLoading: isRegistering
  } = useRegisterDocument();

  useEffect(() => {
    if (registerParams && !isRegistering) {
      registerDocument(registerParams);
      setRegisterParams(null);
    }
  }, [registerParams, registerDocument, isRegistering]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      openErrorNotification('Connect your wallet to register documents');
      return;
    }
    setIsProcessing(true);

    try {
      let contentHash: string;
      let documentName: string;

      if (file) {
        const { hash } = await fileToHashBrowser(file);
        contentHash = hash;
        documentName = file.name;
      } else if (textInput.trim()) {
        contentHash = await sha256(textInput);
        documentName = `Text Document - ${uuid().slice(0, 8)}`;
      } else {
        openErrorNotification('Paste some text or choose a file first');
        return;
      }

      const params: DocumentRegisterParams = {
        documentHash: `0x${contentHash}`,
        documentName,
      };
      setLastSubmitted(params);
      setRegisterParams(params);
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

  const isLoading = isProcessing || isPending || isConfirming;
  const hasInput = inputMethod === 'file' ? !!file : !!textInput.trim();

  const steps: Step[] = [
    {
      title: 'Fingerprint the document',
      description: 'A SHA-256 hash of the content is computed in your browser.',
      state: isProcessing ? 'active' : isPending || isConfirming || isSuccess ? 'done' : 'idle',
    },
    {
      title: 'Sign the transaction',
      description: 'Your wallet asks you to approve writing the hash to the registry contract.',
      state: isPending ? 'active' : isConfirming || isSuccess ? 'done' : 'idle',
    },
    {
      title: 'Recorded on chain',
      description: 'Once confirmed, anyone can verify the document against this record.',
      state: isConfirming ? 'active' : isSuccess ? 'done' : 'idle',
    },
  ];

  const explorerTxUrl =
    txHash && currentNetwork ? `${NETWORKS[currentNetwork as keyof typeof NETWORKS].explorer}/tx/${txHash}` : undefined;

  return (
    <div className="py-10 sm:py-14">
      <PageHeader
        title="Register a document"
        description="Record a tamper-proof fingerprint of a document on the blockchain. Only the hash is stored — the content stays with you."
      />

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-12">
        <div className="space-y-4">
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
              disabled={isLoading}
            />

            <div className="mt-7 flex flex-col-reverse gap-3 border-t border-rule-soft pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-ink-faint">Registering costs a small network fee.</p>
              <Button type="submit" size="lg" disabled={isLoading || !hasInput} className="sm:min-w-[220px]">
                {isLoading ? (
                  <>
                    <Spinner />
                    {isProcessing ? 'Hashing document…' : isPending ? 'Confirm in your wallet…' : 'Writing to chain…'}
                  </>
                ) : (
                  'Register document'
                )}
              </Button>
            </div>
          </form>

          {!isConnected && (
            <Notice tone="caution" title="Wallet not connected">
              Connect a wallet using the button in the top bar to register documents.
            </Notice>
          )}

          {isSuccess && (
            <div role="status" className="rounded-lg border border-verified/30 bg-sheet">
              <div className="flex items-center justify-between gap-3 border-b border-verified/20 bg-verified-wash px-5 py-3">
                <p className="text-sm font-semibold text-verified">Document registered</p>
                {explorerTxUrl && (
                  <a
                    href={explorerTxUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-verified underline-offset-4 hover:underline"
                  >
                    View transaction
                    <ExternalIcon className="size-3.5" />
                  </a>
                )}
              </div>
              <div className="space-y-4 px-5 py-4">
                {lastSubmitted && (
                  <div>
                    <p className="text-sm font-medium text-ink">{lastSubmitted.documentName}</p>
                    <HashFingerprint hash={lastSubmitted.documentHash} className="mt-2" />
                  </div>
                )}
                {txHash && (
                  <p className="text-xs text-ink-faint">
                    Transaction <span className="font-mono break-all text-ink-soft">{txHash}</span>
                  </p>
                )}
              </div>
            </div>
          )}

          {error && (
            <Notice tone="error" title="Registration failed">
              {readableError(error)}
            </Notice>
          )}
        </div>

        <aside className="lg:pt-2">
          <h2 className="mb-5 text-sm font-semibold text-ink">How registration works</h2>
          <StepList steps={steps} />
        </aside>
      </div>
    </div>
  );
};
