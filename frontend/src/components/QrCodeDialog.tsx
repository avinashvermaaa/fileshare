"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { QRCodeCanvas } from "qrcode.react";

interface QrCodeDialogProps {
  link: string;
  open: boolean;
  onClose: () => void;
}

export default function QrCodeDialog({ link, open, onClose }: QrCodeDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="flex flex-col items-center space-y-4">
        <DialogHeader>
          <DialogTitle>Scan to download</DialogTitle>
        </DialogHeader>
        <QRCodeCanvas value={link} size={200} />
        <p className="text-sm text-gray-500 break-all text-center">{link}</p>
      </DialogContent>
    </Dialog>
  );
}
