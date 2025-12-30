import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="mx-auto max-w-4xl px-4 text-center space-y-6 sm:space-y-8">
      {/* Title */}
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900">
        Website Penemuan dan
        <br className="hidden sm:block" />
        Pelaporan Barang Hilang
      </h2>

      {/* Description */}
      <p className="mx-auto max-w-2xl text-base sm:text-lg text-gray-600">
        Lost and Found adalah platform penemuan dan pelaporan barang hilang di
        Universitas XYZ.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
        <Link href="/login" className="w-full sm:w-auto">
          <Button className="h-12 w-full sm:w-auto px-8 shadow-md font-semibold">
            Laporkan Barang Hilang
          </Button>
        </Link>

        <Link href="/login" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-12 w-full sm:w-auto px-8 shadow-md font-semibold"
          >
            Lihat Barang Ditemukan
          </Button>
        </Link>
      </div>
    </section>
  );
}
