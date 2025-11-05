import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useForm } from "react-hook-form";
import {
  SignUpValidation,
  type SignUpValidationType,
} from "../../lib/validations";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "sonner";

export const SignUpForm: React.FC<{
  onSuccess: () => void;
  onToggleMode?: () => void;
}> = ({ onSuccess, onToggleMode }) => {
  const { signUp } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValidationType>({
    resolver: zodResolver(SignUpValidation),
  });

  const onSubmit = async (data: SignUpValidationType) => {
    const { data: signUpData, error } = await signUp(
      data.email,
      data.password,
      data.fullName
    );

    if (error) {
      toast.error(error.message || "Ceva nu a mers bine");
      return;
    }
    console.log("User inregistrat:", signUpData?.user);
    toast.success("Cont creat! Verifică emailul pentru activare.");
    onSuccess?.();
  };

  return (
    <form className="App" onSubmit={handleSubmit(onSubmit)}>
      <Label>Full Name</Label>
      <Input {...register("fullName")} type="text"></Input>
      {errors.fullName && (
        <p className="text-red-500 text-sm">{errors.fullName.message}</p>
      )}
      <Label>Email</Label>
      <Input {...register("email")} type="text"></Input>
      {errors.email && (
        <p className="text-red-500 text-sm">{errors.email.message}</p>
      )}
      <Label>Password</Label>
      <Input {...register("password")} type="text"></Input>
      {errors.password && (
        <p className="text-red-500 text-sm">{errors.password.message}</p>
      )}
      <Label>Confirm password</Label>
      <Input {...register("confirmPassword")} type="text"></Input>
      {!errors.password && errors.confirmPassword && (
        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Sign Up"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Ai deja cont?{" "}
        <button
          type="button"
          onClick={onToggleMode}
          className="text-blue-600 hover:underline font-medium"
        >
          Autentifică-te
        </button>
      </p>
    </form>
  );
};
