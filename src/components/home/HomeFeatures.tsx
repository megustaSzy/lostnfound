export function HomeFeatures() {
  function Feature({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) {
    return (
      <div
        className="
    bg-white rounded-xl p-6
    border border-slate-200
    shadow-sm
    hover:border-blue-300 hover:shadow-md
    transition
  "
      >
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <p className="text-sm sm:text-base text-gray-600">{description}</p>
      </div>
    );
  }
  return (
    <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Feature
        title="Pelaporan Cepat"
        description="Laporkan barang yang tertinggal atau hilang di rental PS dengan mudah dan praktis"
      />
      <Feature
        title="Penemuan Terdata"
        description="Barang yang ditemukan dicatat secara rapi agar mudah dicocokkan dengan laporan"
      />
      <Feature
        title="Khusus Area Rental"
        description="Difokuskan untuk membantu pengunjung dan pengelola rental PlayStation"
      />
    </section>
  );
}
