import { HomeHeader } from "@/components/home/HomeHeader";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";

export default function HomePage() {
  return (
    <section className="min-h-screen bg-slate-50">
      <HomeHeader />
      <main className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-2 py-10">
        <HomeHero />
        <HomeFeatures />
      </main>
    </section>
  );
}
