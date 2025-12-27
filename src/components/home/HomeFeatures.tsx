export function HomeFeatures() {
  return (
    <section className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <Feature
        title="Mudah & Cepat"
        description="Laporkan atau temukan barang dalam beberapa klik"
      />
      <Feature
        title="Aman & Terpercaya"
        description="Data terlindungi dengan aman"
      />
      <Feature
        title="Komunitas Kampus"
        description="Mahasiswa dan staff universitas"
      />
    </section>
  );
}

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
        border border-gray-200
        shadow-sm
        transition-all duration-300
        hover:-translate-y-1 hover:shadow-xl
      "
    >
      <h3 className="mb-2 text-base sm:text-lg font-semibold text-gray-900">
        {title}
      </h3>
      <p className="text-sm sm:text-base text-gray-600">{description}</p>
    </div>
  );
}
