import React from "react";
import {
  SignInValidation,
  type SignInValidationType,
} from "../../lib/validations";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";

export const SignInForm: React.FC<{
  onSuccess: () => void;
  onToggleMode: () => void;
}> = ({ onSuccess, onToggleMode }) => {
  const { signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValidationType>({
    resolver: zodResolver(SignInValidation),
  });

  const onSubmit = async (data: SignInValidationType) => {
    const { data: signInData, error } = await signIn(data.email, data.password);

    if (error) {
      toast.error(error.message || "Ceva nu a mers bine");
      return;
    }
    console.log("User logat:", signInData?.user);
    toast.success("Te-ai logat cu succes");
    onSuccess?.();
  };

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <Label>Email</Label>
      <Input {...register("email")}></Input>
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Label>Password</Label>
      <Input {...register("password")}></Input>
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "...Loading" : "SignIn"}
      </Button>
      <p className="text-center text-sm text-gray-600">
        Nu ai cont?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-600 hover:underline font-medium"
        >
          Creeaza cont
        </button>
      </p>
    </form>
  );
};
