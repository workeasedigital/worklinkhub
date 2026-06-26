const categories = [
  "Construction",
  "Electrical",
  "Plumbing",
  "Drivers",
  "Agriculture",
  "Factory Workers",
  "Home Services",
  "Event Workers",
  "Mechanics",
  "Beauty Services",
];

export default function Categories() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Popular Categories
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

          {categories.map((category) => (
            <div
              key={category}
              className="border rounded-xl p-6 text-center hover:shadow-lg cursor-pointer"
            >
              {category}
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}