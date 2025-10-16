"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Download, FileText, File, Image as ImageIcon } from "lucide-react";
import { useState } from "react";

interface FilePreviewProps {
  file: File & { preview?: string };
  isOpen: boolean;
  onClose: () => void;
}

export default function FilePreview({ file, isOpen, onClose }: FilePreviewProps) {
  const [loading, setLoading] = useState(true);

  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  const isPreviewable = isImage || isPdf;

  const handleDownload = () => {
    if (file.preview) {
      const link = document.createElement('a');
      link.href = file.preview;
      link.download = file.name;
      link.click();
    }
  };

  const handleLoad = () => {
    setLoading(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl md:max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex justify-between items-center">
          <DialogTitle className="truncate max-w-[80%] text-lg">{file.name}</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose} className="absolute right-4 top-4">
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex-1 min-h-[300px] flex items-center justify-center p-4 overflow-auto relative">
          {loading && <div className="absolute inset-0 flex items-center justify-center">Loading preview...</div>}

          {isPreviewable ? (
            isImage ? (
              <img
                src={file.preview}
                alt={file.name}
                className="max-w-full max-h-[calc(90vh-10rem)] object-contain"
                onLoad={handleLoad}
              />
            ) : isPdf ? (
              <iframe
                src={`${file.preview}#toolbar=0&navpanes=0`}
                className="w-full h-[calc(90vh-10rem)]"
                onLoad={handleLoad}
              />
            ) : null
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4">
                {isImage ? (
                  <ImageIcon className="h-8 w-8 text-gray-500" />
                ) : file.type.includes('pdf') ? (
                  <FileText className="h-8 w-8 text-gray-500" />
                ) : (
                  <File className="h-8 w-8 text-gray-500" />
                )}
              </div>
              <h3 className="text-lg font-medium mb-2">Preview not available</h3>
              <p className="text-sm text-gray-500 mb-4">
                This file type cannot be previewed. Please download the file to view it.
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="flex justify-between items-center px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t">
          <div className="text-sm text-gray-500">
            {(file.size / 1024 / 1024).toFixed(2)} MB
          </div>
          <Button onClick={handleDownload} className="bg-fileshare-blue hover:bg-blue-700">
            <Download className="mr-2 h-4 w-4" /> Download
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
