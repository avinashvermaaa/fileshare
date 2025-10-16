"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function TermsDialog() {
  const [open, setOpen] = useState(true);

  const handleAgree = () => {
    setOpen(false);
    // In a real app, you would set a cookie/localStorage item here
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center mb-4">
            <svg width="40" height="40" viewBox="0 0 40 24" className="fill-fileshare-dark">
              <path d="M16.41 8.53a1.009 1.009 0 00-1.383-.386c-.513.292-.693.956-.401 1.47l8.272 14.624a1.009 1.009 0 001.383.386c.513-.292.693-.956.401-1.47L16.41 8.53zm-5.263-.134a1.009 1.009 0 011.383.386l8.272 14.625c.292.513.112 1.177-.401 1.47a1.009 1.009 0 01-1.383-.387L10.746 9.866c-.292-.513-.112-1.177.401-1.47z"></path>
              <path d="M24.715 0a12.92 12.92 0 100 25.842 12.92 12.92 0 000-25.842zm0 2.013c6.02 0 10.906 4.886 10.906 10.907 0 6.021-4.886 10.907-10.906 10.907-6.022 0-10.907-4.886-10.907-10.907 0-6.021 4.885-10.907 10.907-10.907z"></path>
            </svg>
          </div>
          <DialogTitle className="text-center fileshare-heading text-2xl">
            You're <span className="font-black">almost</span> there
          </DialogTitle>
          <DialogDescription className="text-center py-2">
            To continue, please agree to our <a href="#" className="text-fileshare-blue underline">Terms of Service</a>, and
            acknowledge our <a href="#" className="text-fileshare-blue underline">Privacy Policy</a>.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button
            onClick={handleAgree}
            className="w-full bg-fileshare-blue hover:bg-blue-600 rounded-full"
          >
            I agree
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
