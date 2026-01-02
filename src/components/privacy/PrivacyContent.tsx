import Link from "next/link";
import { PrivacySection } from "@/components/privacy/PrivacySection";

export function PrivacyContent() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-neutral-900">
        Kebijakan Privasi
      </h1>

      <p className="mb-6 text-neutral-700">
        LnF (Lost & Found) menghargai dan melindungi privasi pengguna. 
        Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, 
        menggunakan, dan melindungi informasi pribadi Anda.
      </p>

      <PrivacySection title="1. Informasi yang Kami Kumpulkan">
        Kami dapat mengumpulkan informasi pribadi seperti nama, alamat email,
        nomor telepon, serta informasi terkait laporan barang hilang atau
        ditemukan yang Anda kirimkan melalui layanan kami.
      </PrivacySection>

      <PrivacySection title="2. Penggunaan Informasi">
        Informasi yang dikumpulkan digunakan untuk mengelola akun pengguna,
        memproses laporan barang, menghubungi pengguna terkait status laporan,
        serta meningkatkan kualitas layanan LnF.
      </PrivacySection>

      <PrivacySection title="3. Penyimpanan & Keamanan Data">
        Kami berupaya menjaga keamanan data pribadi Anda dengan langkah-langkah
        teknis dan organisasi yang wajar untuk mencegah akses, penggunaan,
        atau pengungkapan yang tidak sah.
      </PrivacySection>

      <PrivacySection title="4. Pembagian Informasi">
        LnF tidak akan menjual atau menyewakan data pribadi Anda kepada pihak
        ketiga. Informasi hanya dapat dibagikan jika diwajibkan oleh hukum
        atau untuk kepentingan operasional layanan.
      </PrivacySection>

      <PrivacySection title="5. Konten Publik">
        Informasi yang Anda tampilkan dalam laporan barang (seperti deskripsi
        dan foto barang) dapat dilihat oleh pengguna lain sebagai bagian dari
        fungsi layanan Lost & Found.
      </PrivacySection>

      <PrivacySection title="6. Hak Pengguna">
        Anda berhak untuk mengakses, memperbarui, atau menghapus informasi
        pribadi Anda melalui akun LnF, sesuai dengan ketentuan yang berlaku.
      </PrivacySection>

      <PrivacySection title="7. Perubahan Kebijakan Privasi">
        Kebijakan Privasi ini dapat diperbarui dari waktu ke waktu. Perubahan
        akan ditampilkan pada halaman ini dan berlaku sejak tanggal
        diperbarui.
      </PrivacySection>

      <PrivacySection title="8. Kontak">
        Jika Anda memiliki pertanyaan mengenai Kebijakan Privasi ini,
        silakan hubungi kami melalui email{" "}
        <a
          href="mailto:support@lnf.com"
          className="underline text-blue-600"
        >
          support@lnf.com
        </a>
        .
      </PrivacySection>

      <p className="text-neutral-700 text-sm mt-8">
        Dengan menggunakan layanan LnF, Anda menyetujui Kebijakan Privasi ini.
      </p>

      <p className="text-sm text-neutral-500 mt-2">
        Kembali ke{" "}
        <Link href="/terms" className="underline text-blue-600">
          Syarat & Ketentuan
        </Link>
      </p>
    </>
  );
}
