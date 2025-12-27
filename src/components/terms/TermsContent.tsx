import Link from "next/link";
import { TermsSection } from "@/components/terms/TermsSection";

export function TermsContent() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">
        Syarat & Ketentuan
      </h1>

      <p className="mb-6 text-neutral-700">
        Selamat datang di LnF (Lost & Found). Dengan menggunakan layanan kami,
        Anda setuju untuk mematuhi syarat dan ketentuan berikut.
      </p>

      <TermsSection title="1. Penggunaan Layanan">
        Anda setuju untuk menggunakan layanan LnF hanya untuk tujuan yang sah.
        Anda tidak diperbolehkan menggunakan layanan ini untuk kegiatan ilegal,
        menipu, atau merugikan pihak lain.
      </TermsSection>

      <TermsSection title="2. Akun Pengguna">
        Untuk menggunakan beberapa fitur LnF, Anda harus membuat akun. Anda
        bertanggung jawab menjaga kerahasiaan email dan password Anda.
      </TermsSection>

      <TermsSection title="3. Laporan Barang">
        Semua laporan barang hilang atau ditemukan harus akurat dan jujur.
        LnF berhak meninjau atau menghapus laporan yang tidak valid.
      </TermsSection>

      <TermsSection title="4. Konten Pengguna">
        Anda tetap menjadi pemilik konten yang diunggah, namun memberikan izin
        kepada kami untuk menampilkan konten tersebut.
      </TermsSection>

      <TermsSection title="5. Privasi">
        Informasi pribadi digunakan sesuai dengan{" "}
        <Link href="/privacy" className="underline text-blue-600">
          Kebijakan Privasi
        </Link>{" "}
        kami.
      </TermsSection>

      <TermsSection title="6. Batasan Tanggung Jawab">
        LnF tidak bertanggung jawab atas kehilangan atau kerusakan yang timbul
        dari penggunaan layanan.
      </TermsSection>

      <TermsSection title="7. Perubahan Syarat">
        Kami berhak memperbarui syarat dan ketentuan kapan saja.
      </TermsSection>

      <TermsSection title="8. Kontak">
        Hubungi kami melalui email{" "}
        <a
          href="mailto:support@lnf.com"
          className="underline text-blue-600"
        >
          support@lnf.com
        </a>
        .
      </TermsSection>

      <p className="text-neutral-700 text-sm mt-8">
        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan ini.
      </p>
    </>
  );
}
