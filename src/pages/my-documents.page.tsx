import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAccount } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useUserDocuments, useUpdateDocumentName } from '../hooks';
import { openSuccessNotification } from '../helper/toast.helper.ts';
import { NavigationRoutes } from '../../types.ts';
import { PageHeader } from '../components/ui/PageHeader';
import { Notice, readableError } from '../components/ui/Notice';
import { Button } from '../components/ui/Button';
import { FingerprintStrip, truncateMiddle } from '../components/ui/HashFingerprint';
import { CopyIcon, DocumentIcon, PencilIcon, RefreshIcon, Spinner, WalletIcon } from '../components/ui/icons';

export const MyDocumentsPage = () => {
  const { address, isConnected } = useAccount();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const {
    documents,
    getUserDocuments,
    isLoading: isLoadingDocuments,
    error: documentsError
  } = useUserDocuments(address);

  const {
    updateDocumentName,
    isSuccess: isUpdateSuccess,
    error: updateError,
    isLoading: isUpdating
  } = useUpdateDocumentName();

  useEffect(() => {
    if (isConnected && address) {
      getUserDocuments(address);
    }
  }, [isConnected, address, getUserDocuments]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setEditingId(null);
      setEditName('');
      if (address) {
        getUserDocuments(address);
      }
    }
  }, [isUpdateSuccess, address, getUserDocuments]);

  const handleEditClick = (documentHash: string, currentName: string) => {
    setEditingId(documentHash);
    setEditName(currentName);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditName('');
  };

  const handleSaveEdit = async (documentHash: `0x${string}`) => {
    if (editName.trim()) {
      await updateDocumentName(documentHash, editName.trim());
    }
  };

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    openSuccessNotification(`${label} copied`);
  };

  const formatDate = (timestamp: bigint) =>
    new Date(Number(timestamp) * 1000).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });

  if (!isConnected) {
    return (
      <div className="py-10 sm:py-14">
        <PageHeader
          title="My documents"
          description="Everything you've registered from your wallet, newest first."
        />
        <div className="mt-8 flex flex-col items-center rounded-lg border border-dashed border-rule bg-sheet px-6 py-16 text-center">
          <span className="flex size-12 items-center justify-center rounded-full border border-rule bg-paper text-ink-soft">
            <WalletIcon className="size-5" />
          </span>
          <h2 className="mt-4 text-lg font-semibold text-ink">Connect a wallet to see your documents</h2>
          <p className="mt-1 max-w-sm text-sm text-ink-soft">
            Documents are listed by the wallet address that registered them.
          </p>
          <div className="mt-6">
            <ConnectButton chainStatus="none" showBalance={false} />
          </div>
        </div>
      </div>
    );
  }

  const sortedDocuments = documents
    ? documents.slice().sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
    : [];

  return (
    <div className="py-10 sm:py-14">
      <PageHeader
        title="My documents"
        description="Everything you've registered from your wallet, newest first."
        aside={
          documents && documents.length > 0 ? (
            <Button
              variant="secondary"
              onClick={() => address && getUserDocuments(address)}
              disabled={isLoadingDocuments}
            >
              <RefreshIcon className={`size-4 ${isLoadingDocuments ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          ) : undefined
        }
      />

      <div className="mt-8 space-y-4">
        {isLoadingDocuments && (
          <div className="flex items-center justify-center gap-3 rounded-lg border border-rule bg-sheet py-16 text-sm text-ink-soft">
            <Spinner className="text-stamp" />
            Loading your documents…
          </div>
        )}

        {documentsError && (
          <Notice tone="error" title="Couldn't load your documents">
            {readableError(documentsError)}
          </Notice>
        )}

        {updateError && (
          <Notice tone="error" title="Rename failed">
            {readableError(updateError)}
          </Notice>
        )}

        {isUpdateSuccess && <Notice tone="success" title="Document renamed" />}

        {!isLoadingDocuments && documents && (
          documents.length === 0 ? (
            <div className="flex flex-col items-center rounded-lg border border-dashed border-rule bg-sheet px-6 py-16 text-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-rule bg-paper text-ink-soft">
                <DocumentIcon className="size-5" />
              </span>
              <h2 className="mt-4 text-lg font-semibold text-ink">No documents registered yet</h2>
              <p className="mt-1 max-w-sm text-sm text-ink-soft">
                Register a document and it will appear here with its fingerprint and registration date.
              </p>
              <Link
                to={NavigationRoutes.root}
                className="mt-6 inline-flex h-10 items-center rounded-md bg-stamp px-4 text-sm font-medium text-white transition-colors hover:bg-stamp-dark"
              >
                Register a document
              </Link>
            </div>
          ) : (
            <div className="overflow-hidden rounded-lg border border-rule bg-sheet">
              <div className="flex items-center justify-between border-b border-rule bg-paper/60 px-5 py-2.5 text-xs font-medium text-ink-faint">
                <span>
                  {documents.length} {documents.length === 1 ? 'document' : 'documents'}
                </span>
                <span className="hidden sm:inline">Registered</span>
              </div>
              <ul className="divide-y divide-rule-soft">
                {sortedDocuments.map((doc) => {
                  const isEditing = editingId === doc.documentHash;
                  return (
                    <li key={doc.documentHash} className="group px-5 py-4 transition-colors hover:bg-paper/40">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                        <div className="min-w-0 flex-1">
                          {isEditing ? (
                            <form
                              className="flex flex-wrap items-center gap-2"
                              onSubmit={(e) => {
                                e.preventDefault();
                                handleSaveEdit(doc.documentHash as `0x${string}`);
                              }}
                            >
                              <label htmlFor={`rename-${doc.documentHash}`} className="sr-only">
                                New name
                              </label>
                              <input
                                id={`rename-${doc.documentHash}`}
                                type="text"
                                value={editName}
                                autoFocus
                                onChange={(e) => setEditName(e.target.value)}
                                onKeyDown={(e) => e.key === 'Escape' && handleCancelEdit()}
                                disabled={isUpdating}
                                className="h-9 min-w-0 flex-1 rounded-md border border-rule bg-sheet px-3 text-sm text-ink focus:border-stamp focus:outline-none focus:ring-2 focus:ring-stamp/20"
                                placeholder="Document name"
                              />
                              <Button type="submit" disabled={isUpdating || !editName.trim()} className="!h-9">
                                {isUpdating ? <><Spinner /> Saving…</> : 'Save name'}
                              </Button>
                              <Button variant="ghost" onClick={handleCancelEdit} disabled={isUpdating} className="!h-9">
                                Cancel
                              </Button>
                            </form>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <h3 className="truncate text-[15px] font-semibold text-ink" title={doc.documentName}>
                                {doc.documentName}
                              </h3>
                              <button
                                onClick={() => handleEditClick(doc.documentHash, doc.documentName)}
                                aria-label={`Rename ${doc.documentName}`}
                                title="Rename"
                                className="rounded p-1 text-ink-faint opacity-100 transition hover:bg-paper hover:text-stamp sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                              >
                                <PencilIcon className="size-3.5" />
                              </button>
                            </div>
                          )}
                          <div className="mt-2 flex items-center gap-3">
                            <FingerprintStrip hash={doc.documentHash} className="!h-1.5 max-w-[160px]" />
                            <span className="font-mono text-xs text-ink-soft">
                              {truncateMiddle(doc.documentHash, 10, 8)}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-4 sm:justify-end">
                          <span className="text-sm text-ink-soft tabular-nums">{formatDate(doc.timestamp)}</span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              className="!h-8 !px-2.5 text-xs"
                              onClick={() => handleCopy(doc.documentHash, 'Document hash')}
                            >
                              <CopyIcon className="size-3.5" />
                              Hash
                            </Button>
                            <Button
                              variant="ghost"
                              className="!h-8 !px-2.5 text-xs"
                              onClick={() => handleCopy(doc.documentName, 'Document name')}
                            >
                              <CopyIcon className="size-3.5" />
                              Name
                            </Button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};
