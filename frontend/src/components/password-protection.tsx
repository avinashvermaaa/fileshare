"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff } from "lucide-react";

interface PasswordProtectionProps {
  onPasswordSet: (password: string) => void;
  onCancel: () => void;
}

export default function PasswordProtection({ onPasswordSet, onCancel }: PasswordProtectionProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSetPassword = () => {
    if (!password) {
      setError("Please enter a password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    onPasswordSet(password);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-md p-4 border border-gray-200 dark:border-gray-700 w-full">
      <div className="flex items-center mb-4">
        <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full mr-3">
          <Lock className="h-4 w-4 text-fileshare-blue" />
        </div>
        <h3 className="font-medium">Password protect your transfer</h3>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm">Set password</label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="Enter password"
              className="pr-10"
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-7 w-7"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-500" />
              ) : (
                <Eye className="h-4 w-4 text-gray-500" />
              )}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm">Confirm password</label>
          <Input
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            placeholder="Confirm password"
          />
        </div>

        {error && (
          <div className="text-sm text-red-500">{error}</div>
        )}

        <div className="text-xs text-gray-500">
          Recipients will need this password to download your files. Make sure to share it securely.
        </div>

        <div className="flex justify-end space-x-2 pt-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            className="bg-fileshare-blue hover:bg-blue-700 text-white"
            onClick={handleSetPassword}
          >
            Set Password
          </Button>
        </div>
      </div>
    </div>
  );
}
