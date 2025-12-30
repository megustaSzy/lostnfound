import Link from "next/link";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  return (
    <section className="mx-auto max-w-4xl px-4 text-center space-y-6 sm:space-y-8">
      {/* Title */}
      <h2 className="font-bold text-3xl sm:text-4xl md:text-5xl text-slate-900">
        Website Penemuan dan
        <br className="hidden sm:block" />
        <span className="text-blue-600"> Pelaporan Barang Hilang</span>
      </h2>

      {/* Description */}
      <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600">
        Lost and Found adalah platform penemuan dan pelaporan barang hilang di
        Universitas XYZ.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-4 sm:pt-6">
        <Link href="/login" className="w-full sm:w-auto">
          <Button className="h-12 w-full sm:w-auto px-8 font-semibold shadow-md bg-blue-600 hover:bg-blue-700">
            Laporkan Barang Hilang
          </Button>
        </Link>

        <Link href="/login" className="w-full sm:w-auto">
          <Button
            variant="outline"
            className="h-12 w-full sm:w-auto px-8 font-semibold border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Lihat Barang Ditemukan
          </Button>
        </Link>
      </div>
    </section>
  );
}
