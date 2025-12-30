"use client";

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
import { useCallback, useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useLogin } from "@/hooks/useLogin";
import { Loader2 } from "lucide-react";
import { GoogleLoginButton } from "./GoogleLoginButton";

import { loginSchema } from "@/schema/loginSchema";
import type { LoginSchema } from "@/schema/loginSchema";
import { Eye, EyeOff } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const { submitLogin, loading } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
  });

  const onSubmit = useCallback(
    async (data: LoginSchema) => {
      try {
        const res = await submitLogin(data);
        router.push(
          res.data.user.role === "Admin"
            ? "/dashboard/admin"
            : "/dashboard/user"
        );
      } catch (err: any) {
        setError("root", {
          type: "server",
          message: err.message,
        });
      }
    },
    [submitLogin, router, setError]
  );

  return (
    <Card className="w-full max-w-md mx-auto shadow-md border border-slate-200">
      <CardHeader className="space-y-1 text-center">
        <CardTitle className="text-2xl font-bold text-slate-900">
          Login
        </CardTitle>
        <CardDescription className="text-slate-600">
          Masukkan email dan password Anda
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          aria-busy={loading}
        >
          {/* GLOBAL ERROR */}
          {errors.root && (
            <div className="rounded-md bg-red-50 border border-red-200 px-3 py-2 text-sm text-red-700 flex items-center gap-2">
              <span>⚠️</span>
              <span>{errors.root.message}</span>
            </div>
          )}

          {/* EMAIL */}
          <FieldGroup>
            <Field>
              <FieldLabel>Email</FieldLabel>
              <Input
                type="email"
                placeholder="email@example.com"
                disabled={loading}
                {...register("email", {
                  onChange: () => clearErrors("root"),
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.email.message}
                </p>
              )}
            </Field>
          </FieldGroup>

          {/* PASSWORD */}
          <FieldGroup>
            <Field>
              <FieldLabel>Password</FieldLabel>

              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  disabled={loading}
                  {...register("password", {
                    onChange: () => clearErrors("root"),
                  })}
                  className="pr-10"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={loading}
                  className="
  absolute right-3 top-1/2 -translate-y-1/2
  text-slate-500 hover:text-slate-700
  disabled:opacity-50
"
                  aria-label="Toggle password visibility"
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

          {/* LUPA PASSWORD */}
          <div className="flex justify-end -mt-2">
            <Link
              href="/forgot-password"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              Lupa password?
            </Link>
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="
    w-full mt-2
    bg-blue-600 hover:bg-blue-700
    text-white font-medium
  "
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Loading..." : "Login"}
          </Button>

          {/* GOOGLE LOGIN */}
          <GoogleLoginButton />

          <div className="text-center text-sm text-neutral-600">
            Belum punya akun?{" "}
            <Link
              href="/signup"
              className="text-blue-600 hover:text-blue-700 hover:underline"
            >
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
