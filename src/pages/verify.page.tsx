import { useCallback, useState } from 'react';
import { fileToHashBrowser, sha256 } from "../helper/hash.helper.ts";
import { useVerifyDocument } from '../hooks';
import { openErrorNotification } from '../helper/toast.helper.ts';

export const VerifyPage = () => {
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');
  const [documentHash, setDocumentHash] = useState<`0x${string}` | undefined>(undefined);

  const {
    document,
    verifyDocument,
    isLoading,
    error,
    isConnected,
    userAddress
  } = useVerifyDocument(documentHash);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      openErrorNotification('Please connect your wallet to register documents');
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
        alert('Please enter text or upload a file');
        return;
      }

      setDocumentHash(`0x${contentHash}`);
    } catch (error) {
      console.error(error);
      alert('Error processing document');
    } finally {
      setIsProcessing(false);
    }
  }, [textInput, file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    if (selectedFile) {
      setInputMethod('file');
      setTextInput('');
    }
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

  const isVerifying = isProcessing || isLoading;

  return (
    <div className="bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Document Verifier
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Verify your document by checking if it exists on the blockchain
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {!document ? (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setInputMethod('text')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${inputMethod === 'text'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  📝 Enter Text
                </button>
                <button
                  type="button"
                  onClick={() => setInputMethod('file')}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${inputMethod === 'file'
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  📁 Upload File
                </button>
              </div>

              {inputMethod === 'text' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Enter your text content
                  </label>
                  <textarea
                    value={textInput}
                    onChange={handleTextChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-200"
                    rows={6}
                    placeholder="Type or paste your text content here..."
                  />
                </div>
              )}

              {inputMethod === 'file' && (
                <div className="space-y-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Upload your document
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-400 transition-colors duration-200">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                      accept=".pdf,.docx,.xlsx,.csv,.txt,.doc,.xls"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="space-y-4">
                        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-lg font-medium text-gray-900">
                            {file ? file.name : 'Click to upload or drag and drop'}
                          </p>
                          <p className="text-sm text-gray-500">
                            PDF, DOCX, XLSX, CSV, TXT up to 10MB
                          </p>
                        </div>
                      </div>
                    </label>
                  </div>
                  {file && (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-sm font-medium text-green-800">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setFile(null)}
                        className="text-green-600 hover:text-green-800"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying || (!textInput.trim() && !file)}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isVerifying ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>
                      {isProcessing ? 'Processing...' : 'Verifying...'}
                    </span>
                  </div>
                ) : (
                  'Verify Document on Blockchain'
                )}
              </button>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Document Verified!</h2>
                <p className="text-gray-600">This document is registered on the blockchain</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Document Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Document Name</label>
                    <p className="text-sm font-semibold text-gray-900">{document.documentName}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Owner Address</label>
                    <p className="text-sm font-mono text-gray-900 break-all">{document.owner}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Registration Date</label>
                    <p className="text-sm font-semibold text-gray-900">
                      {new Date(Number(document.timestamp) * 1000).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-500 mb-1">Document Hash</label>
                    <p className="text-sm font-mono text-gray-900 break-all">{document.documentHash}</p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleVerifyAgain}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
                >
                  Verify Another Document
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(document.documentHash);
                    alert('Document hash copied to clipboard!');
                  }}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Copy Hash
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-red-800">Document not found</p>
                  <p className="text-xs text-red-600 mt-1">
                    This document is not registered on the blockchain
                  </p>
                </div>
              </div>
            </div>
          )}

          {!isConnected && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-yellow-800">Wallet not connected</p>
                  <p className="text-xs text-yellow-600 mt-1">
                    Please connect your wallet to verify documents
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Enter the same text or upload the same file that was originally registered to verify its authenticity
          </p>
        </div>
      </div>
    </div>
  );
}; 