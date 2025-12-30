"use client";

import { useRouter } from "next/navigation";
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
import { useForm } from "react-hook-form";
import Link from "next/link";
import { User, Mail, Lock, Phone, Loader2 } from "lucide-react";
import { submitRegister } from "@/lib/api/auth";
import { ApiError } from "@/error/ApiError";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/schema/registerSchema";

export function SignupForm(props: React.ComponentProps<typeof Card>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegisterSchema>({ resolver: zodResolver(registerSchema) });

  const { toast, ToastContainer } = useToast();
  const router = useRouter();

  const onSubmit = async (data: RegisterSchema) => {
    try {
      const res = await submitRegister(data);

      toast({
        title: "Registrasi Berhasil",
        description: "Akunmu sudah berhasil dibuat. Silakan login.",
        variant: "success",
      });

      reset();
      setTimeout(() => router.push("/login"), 1500);
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        toast({
          title: "Gagal Registrasi",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Terjadi Kesalahan",
          description: "Terjadi kesalahan tidak diketahui",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="w-full max-w-md">
      <Card className="border border-slate-200 shadow-md" {...props}>
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold text-slate-900">
            Buat Akun Baru
          </CardTitle>
          <CardDescription className="text-slate-600">
            Masukkan data diri Anda
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* NAMA LENGKAP */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Nama Lengkap</FieldLabel>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="pl-10"
                    {...register("name")}
                  />
                </div>
                {errors.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* EMAIL */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="nama@email.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Minimal 6 karakter"
                    className="pl-10"
                    {...register("password")}
                  />
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.password.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* NOMOR TELEPON */}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="notelp">Nomor Telepon</FieldLabel>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
                  <Input
                    id="notelp"
                    placeholder="081234567890"
                    className="pl-10"
                    {...register("notelp")}
                  />
                </div>
                {errors.notelp && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.notelp.message}
                  </p>
                )}
              </Field>
            </FieldGroup>

            {/* BUTTON SUBMIT */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-70 text-white font-medium"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Buat Akun"
              )}
            </Button>

            {/* DIVIDER */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-white px-2 text-slate-500">atau</span>
              </div>
            </div>

            {/* LINK KE LOGIN */}
            <div className="text-center text-sm text-neutral-600">
              Sudah punya akun?{" "}
              <Link
                href="/login"
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>

      <p className="text-center text-xs text-neutral-600 mt-4">
        Dengan mendaftar, Anda menyetujui{" "}
        <Link href="/terms" className="text-blue-600 hover:underline">
          {" "}
          Syarat & Ketentuan
        </Link>{" "}
        dan{" "}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          {" "}
          Kebijakan Privasi
        </Link>
      </p>
      <ToastContainer></ToastContainer>
    </div>
  );
}
