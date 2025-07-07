import { useState, useEffect } from 'react';
import { useUserDocuments, useUpdateDocumentName } from '../hooks';
import { useAccount } from 'wagmi';

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

  const formatDate = (timestamp: bigint) => {
    return new Date(Number(timestamp) * 1000).toLocaleString();
  };

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const truncateHash = (hash: string) => {
    return `${hash.slice(0, 10)}...${hash.slice(-8)}`;
  };

  if (!isConnected) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Wallet</h1>
            <p className="text-lg text-gray-600">
              Please connect your wallet to view your registered documents
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            My Documents
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            View and manage all your registered documents on the blockchain
          </p>
          {/* {address && (
            <p className="text-sm text-gray-500 mt-2">
              Connected: {truncateAddress(address)}
            </p>
          )} */}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Loading State */}
          {isLoadingDocuments && (
            <div className="text-center py-12">
              <div className="mx-auto w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">Loading your documents...</p>
            </div>
          )}

          {documentsError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Error loading documents</p>
                  <p className="text-xs text-red-600 mt-1">{documentsError.message}</p>
                </div>
              </div>
            </div>
          )}

          {!isLoadingDocuments && documents && (
            <>
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No documents found</h3>
                  <p className="text-gray-500">
                    You haven't registered any documents yet. Start by uploading a document!
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold text-gray-900">
                      Your Documents ({documents.length})
                    </h2>
                    <button
                      onClick={() => address && getUserDocuments(address)}
                      className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                    >
                      Refresh
                    </button>
                  </div>

                  <div className="grid gap-6">
                    {documents
                      .slice()
                      .sort((a, b) => Number(b.timestamp) - Number(a.timestamp))
                      .map((doc) => (
                      <div
                        key={doc.documentHash}
                        className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="mb-4">
                              {editingId === doc.documentHash ? (
                                <div className="flex items-center space-x-2">
                                  <input
                                    type="text"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                    placeholder="Enter new name"
                                  />
                                  <button
                                    onClick={() => handleSaveEdit(doc.documentHash as `0x${string}`)}
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 text-sm"
                                  >
                                    {isUpdating ? 'Saving...' : 'Save'}
                                  </button>
                                  <button
                                    onClick={handleCancelEdit}
                                    disabled={isUpdating}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 disabled:bg-gray-200 text-sm"
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                                    {doc.documentName}
                                  </h3>
                                  <button
                                    onClick={() => handleEditClick(doc.documentHash, doc.documentName)}
                                    className="text-gray-400 hover:text-purple-600 transition-colors duration-200"
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                  </button>
                                </div>
                              )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                  Document Hash
                                </label>
                                <p className="text-sm font-mono text-gray-900 break-all">
                                  {truncateHash(doc.documentHash)}
                                </p>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                  Registration Date
                                </label>
                                <p className="text-sm text-gray-900">
                                  {formatDate(doc.timestamp)}
                                </p>
                              </div>
                              
                              <div>
                                <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                                  Owner
                                </label>
                                <p className="text-sm font-mono text-gray-900">
                                  {truncateAddress(doc.owner)}
                                </p>
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col space-y-2 ml-4">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(doc.documentHash);
                                alert('Document hash copied to clipboard!');
                              }}
                              className="px-3 py-1 bg-purple-100 text-purple-700 rounded-md hover:bg-purple-200 text-xs font-medium transition-colors duration-200"
                            >
                              Copy Hash
                            </button>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(doc.documentName);
                                alert('Document name copied to clipboard!');
                              }}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 text-xs font-medium transition-colors duration-200"
                            >
                              Copy Name
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {isUpdateSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Document name updated successfully!</p>
                </div>
              </div>
            </div>
          )}

          {updateError && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Failed to update document name</p>
                  <p className="text-xs text-red-600 mt-1">{updateError.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            All your registered documents are stored on the blockchain and can be verified anytime
          </p>
        </div>
      </div>
    </div>
  );
}; 