import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { useState } from "react";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"signup" | "signin">("signin");

  const handleSuccess = () => {
    onClose();
  };

  const handleClose = () => {
    setMode("signin");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{mode === "signup" ? "Sign Up" : "Sign In"}</DialogTitle>
        </DialogHeader>

        {mode === "signup" ? (
          <SignUpForm
            onSuccess={handleSuccess}
            onToggleMode={() => setMode("signin")}
          />
        ) : (
          <SignInForm
            onSuccess={handleSuccess}
            onToggleMode={() => setMode("signup")}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
