"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { Loader2, CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  ResetPasswordFormData,
  resetPasswordSchema,
} from "@/schema/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";

export default function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionToken = searchParams.get("sessionToken") || "";

  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!sessionToken) {
      setErrorMessage("Token reset tidak ditemukan atau link tidak valid.");
      return;
    }

    try {
      setErrorMessage("");

      const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "";
      if (!API_BASE) {
        setErrorMessage("Service API belum dikonfigurasi.");
        return;
      }

      const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken: sessionToken,
          newPassword: data.password,
        }),
      });

      const resData = await res.json();
      if (!res.ok) throw new Error(resData.message || "Gagal reset password");

      setSuccess(true);

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto mt-10 text-center">
        <Card className="border border-slate-200 shadow-md p-6 text-center">
          <CheckCircle2 className="h-12 w-12 mx-auto mb-3 text-green-600" />

          <CardTitle className="text-xl font-bold text-slate-900 mb-1">
            Password Berhasil Diubah!
          </CardTitle>

          <p className="text-sm text-slate-600">
            Mengarahkan ke halaman login...
          </p>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto mt-10">
      {errorMessage && (
        <Alert variant="destructive" className="mb-3">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Card className="w-full max-w-md mx-auto border border-slate-200 shadow-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Reset Password
          </CardTitle>
          <CardDescription className="text-slate-600">
            Masukkan password baru Anda untuk akun ini
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* PASSWORD BARU */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="password">Password Baru</FieldLabel>

                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("password")}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* KONFIRMASI PASSWORD */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="confirmPassword">
                  Konfirmasi Password
                </FieldLabel>

                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    {...register("confirmPassword")}
                    className="pr-10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700"
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {errors.confirmPassword && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* BUTTON RESET PASSWORD */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              {isSubmitting && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? "Memproses..." : "Reset Password"}
            </Button>

            {/* BUTTON KEMBALI KE LUPA PASSWORD */}
            <Button
              type="button"
              onClick={() => router.push("/forgot-password")}
              className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Kembali ke Lupa Password
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
