"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Upload, Plus, Paperclip, Clock, X,
  Eye, Lock, Unlock, RotateCw
} from "lucide-react";
import FilePreview from "@/components/file-preview";
import PasswordProtection from "@/components/password-protection";

import axios from "axios";
import QrCodeDialog from "./QrCodeDialog";
interface FileWithPreview extends File {
  preview?: string;
}

export default function FileDropZone() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [transferOption, setTransferOption] = useState<"link">("link");
  const [previewFile, setPreviewFile] = useState<FileWithPreview | null>(null);
  const [showPasswordProtection, setShowPasswordProtection] = useState(false);
  const [password, setPassword] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);
const [showQr, setShowQr] = useState(false);
const [lastTransferLink, setLastTransferLink] = useState("");

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Add touch event listeners for mobile
  useEffect(() => {
    const dropZone = dropZoneRef.current;
    if (!dropZone) return;

    let touchTimeout: NodeJS.Timeout;

    const handleTouchStart = () => {
      touchTimeout = setTimeout(() => {
        setIsDragging(true);
      }, 200);
    };

    const handleTouchEnd = () => {
      clearTimeout(touchTimeout);
      setIsDragging(false);
    };

    dropZone.addEventListener('touchstart', handleTouchStart);
    dropZone.addEventListener('touchend', handleTouchEnd);
    dropZone.addEventListener('touchcancel', handleTouchEnd);

    return () => {
      dropZone.removeEventListener('touchstart', handleTouchStart);
      dropZone.removeEventListener('touchend', handleTouchEnd);
      dropZone.removeEventListener('touchcancel', handleTouchEnd);
    };
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, []);

  const handleFiles = (newFiles: File[]) => {
    const updatedFiles = newFiles.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file)
      })
    );

    setFiles(prev => [...prev, ...updatedFiles]);
  };

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
      e.target.value = "";
    }
  };

  const removeFile = (index: number) => {
    setFiles(files => {
      const file = files[index];
      if (file.preview) {
        URL.revokeObjectURL(file.preview);
      }
      return files.filter((_, i) => i !== index);
    });
  };

  const openFilePreview = (file: FileWithPreview) => {
    setPreviewFile(file);
  };

  const closeFilePreview = () => {
    setPreviewFile(null);
  };

  const togglePasswordProtection = () => {
    setShowPasswordProtection(!showPasswordProtection);
  };

  const handlePasswordSet = (newPassword: string) => {
    setPassword(newPassword);
    setShowPasswordProtection(false);
    toast.success("Password protection added");
  };

  const cancelPasswordProtection = () => {
    setShowPasswordProtection(false);
  };

  const handleTransfer = async () => {
    if (files.length === 0) {
      toast.error("Please add at least one file");
      return;
    }


    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    files.forEach(file => {
      formData.append("files", file);
    });
    formData.append("title", title);
    formData.append("message", message);
    formData.append("transferOption", transferOption);

    if (password) {
      formData.append("password", password);
    }

  try {
    const response = await axios.post("https://share247.onrender.com/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
        setUploadProgress(percentCompleted);
      },
    });

      const data = response.data;

      if (!data?.shortLinks) {
        throw new Error("No download link received from server.");
      }

      const transferLink = data.shortLinks;
      // await navigator.clipboard.writeText(transferLink);

setLastTransferLink(transferLink);

toast.success(`Files ${transferOption === "link"}${password ? " (Password protected)" : ""}`, {
  description: transferLink,
  action: {
    label: "Copy",
    onClick: () => {
      navigator.clipboard.writeText(transferLink)
        .then(() => toast.success("Link copied to clipboard!"))
        .catch(() => toast.error("Failed to copy link"));
    },
  },
  cancel: {
    label: "QR Code",
    onClick: () => setShowQr(true),
  },
});



      // reset state
      setFiles([]);
      setTitle("");
      setMessage("");
      setUploadProgress(0);
      setPassword("");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed", {
        description: "Something went wrong try re-uploading",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const totalSize = files.reduce((total, file) => total + file.size, 0);
  const formattedSize = totalSize > 0
    ? totalSize < 1024 * 1024
      ? `${(totalSize / 1024).toFixed(1)} KB`
      : `${(totalSize / (1024 * 1024)).toFixed(1)} MB`
    : "0 KB";

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden relative -top-5">
      <div className="p-4 space-y-4">
        <div className="flex justify-center gap-4 mb-2">
          <Button
            variant={transferOption === "link" ? "default" : "outline"}
            onClick={() => setTransferOption("link")}
            className={transferOption === "link" ? "bg-fileshare-blue dark:bg-fileshare-blue" : ""}
          >
            Link transfer
          </Button>
        </div>

        {/* Password Protection UI */}
        {showPasswordProtection ? (
          <PasswordProtection
            onPasswordSet={handlePasswordSet}
            onCancel={cancelPasswordProtection}
          />
        ) : (
          <>
            {/* File Upload Area */}
            {files.length === 0 ? (
              <div
                ref={dropZoneRef}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                className={`file-drop-zone ${isDragging ? 'drag-active' : ''} cursor-pointer dark:border-gray-700 dark:text-gray-300`}
                onClick={handleBrowse}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                <Plus size={24} className="mx-auto mb-2 text-gray-500 dark:text-gray-400" />
                <div className="font-medium text-lg">
                  {isTouchDevice ? 'Tap to add files' : 'Add files'}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {isTouchDevice ? 'Or hold for options' : 'Or select a folder'}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-md p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {files.length} {files.length === 1 ? 'file' : 'files'} · {formattedSize}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleBrowse}
                    className="text-fileshare-blue dark:text-blue-400"
                  >
                    <Plus size={16} className="mr-1" />
                    Add more
                  </Button>
                </div>

                <div className="max-h-40 overflow-y-auto space-y-2">
                  {files.map((file, index) => (
                    <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded">
                      <div className="flex items-center space-x-2 flex-1 truncate">
                        <Paperclip size={16} className="text-gray-500 dark:text-gray-400 shrink-0" />
                        <span className="text-sm truncate max-w-[180px]">{file.name}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openFilePreview(file)}
                          className="h-6 w-6 text-gray-500 hover:text-fileshare-blue dark:text-gray-400 dark:hover:text-blue-400"
                          title="Preview file"
                        >
                          <Eye size={14} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFile(index)}
                          className="h-6 w-6 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                          title="Remove file"
                        >
                          <X size={14} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}


            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-gray-200">Title</label>
              <Input
                placeholder="Title for your transfer"
                className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium dark:text-gray-200">Message</label>
              <Input
                placeholder="Add a message (optional)"
                className="bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </>
        )}
      </div>

      {/* Footer with Transfer Button */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t dark:border-gray-600">
        {isUploading ? (
          <div className="space-y-2">
            <div className="flex justify-between text-sm dark:text-gray-200">
              <span>Uploading...</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2 bg-fileshare-blue/20" />
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                <Clock size={16} className="mr-1" />
                <span>7 days</span>
              </div>

              {/* Password Protection Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={togglePasswordProtection}
                className={`text-gray-500 hover:text-fileshare-blue dark:text-gray-400 dark:hover:text-blue-400 ${password ? 'text-fileshare-blue dark:text-blue-400' : ''}`}
                title={password ? "Password protected" : "Add password protection"}
              >
                {password ? (
                  <>
                    <Lock size={16} className="mr-1" />
                    <span className="text-xs">Protected</span>
                  </>
                ) : (
                  <>
                    <Unlock size={16} className="mr-1" />
                    <span className="text-xs">Add password</span>
                  </>
                )}
              </Button>
            </div>

            <Button
              onClick={handleTransfer}
              disabled={files.length === 0 || showPasswordProtection}
              className="bg-fileshare-blue hover:bg-blue-600 dark:bg-fileshare-blue dark:hover:bg-blue-700 text-white"
            >
              {transferOption === "link" ? "Get a link" : ""}
              <Upload size={16} className="ml-2" />
            </Button>
          </div>
        )}
      </div>

      {showQr && (
        <QrCodeDialog
          link={lastTransferLink}
          open={showQr}
          onClose={() => setShowQr(false)}
        />
      )}


      {/* File Preview Dialog */}
      {previewFile && (
        <FilePreview
          file={previewFile}
          isOpen={!!previewFile}
          onClose={closeFilePreview}
        />
      )}
    </div>
  );
}
