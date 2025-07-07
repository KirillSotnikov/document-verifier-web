import { useCallback, useEffect, useState } from 'react';
import { fileToHashBrowser, sha256 } from "../helper/hash.helper.ts";
import { uuid } from '../helper/uuid.helper.ts';
import { useRegisterDocument } from '../hooks';
import { openErrorNotification } from '../helper/toast.helper.ts';

type DocumentRegisterParams = {
  documentHash: `0x${string}`;
  documentName: string;
};

export const UploadPage = () => {
  const [registerParams, setRegisterParams] = useState<DocumentRegisterParams | null>(null);
  const [textInput, setTextInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [inputMethod, setInputMethod] = useState<'text' | 'file'>('text');

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
      openErrorNotification('Please connect your wallet to register documents');
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
        alert('Please enter text or upload a file');
        return;
      }

      setRegisterParams({
        documentHash: `0x${contentHash}`,
        documentName,
      });
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

  const isLoading = isProcessing || isPending || isConfirming;

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Document Verifier
          </h1>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Upload your document or enter text to store its hash on the blockchain for verification
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setInputMethod('text')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${inputMethod === 'text'
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                📝 Enter Text
              </button>
              <button
                type="button"
                onClick={() => setInputMethod('file')}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${inputMethod === 'file'
                    ? 'bg-white text-blue-600 shadow-sm'
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-200"
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
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                    accept=".pdf,.docx,.xlsx,.csv,.txt,.doc,.xls"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="space-y-4">
                      <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
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
              disabled={isLoading || (!textInput.trim() && !file)}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>
                    {isProcessing ? 'Processing...' : isPending ? 'Confirming...' : 'Registering...'}
                  </span>
                </div>
              ) : (
                'Register Document on Blockchain'
              )}
            </button>
          </form>


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

          {isSuccess && (
            <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Document registered successfully!</p>
                  {txHash && (
                    <p className="text-xs text-green-600 mt-1 break-all">
                      TX Hash: {txHash}
                    </p>
                  )}
                </div>
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
                  <p className="text-sm font-medium text-red-800">Registration failed</p>
                  <p className="text-xs text-red-600 mt-1">{error.message}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your document will be hashed and stored on the blockchain for future verification
          </p>
        </div>
      </div>
    </div>
  );
};
