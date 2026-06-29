import Link from "next/link";
import { supabase } from "../../lib/supabase";
export const dynamic = "force-dynamic";
export default async function WorkersPage({
  searchParams,
}: {
  searchParams: Promise<{
    profession?: string;
    location?: string;
  }>;
}) {
const params = await searchParams;

const profession =
  params.profession?.toLowerCase() || "";

const location =
  params.location?.toLowerCase() || "";

const { data: workers, error } = await supabase
  .from("workers")
  .select("*")
  .eq("approved", true);

const filteredWorkers =
  workers?.filter((worker) => {
    const professionMatch =
      !profession ||
      worker.profession
        ?.toLowerCase()
        .includes(profession);

    const locationMatch =
      !location ||
      worker.location
        ?.toLowerCase()
        .includes(location);

    return professionMatch && locationMatch;
  }) || [];

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">

      {/* Header */}
      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500">
            WorkLinkHub
          </h1>
        </div>
      </div>

      {/* Page Title */}
      <section className="py-12">
        <h1 className="text-5xl font-bold text-center text-gray-900">
          Find Workers
        </h1>

        <p className="text-center text-gray-600 mt-4">
          Browse skilled workers near your location.
        </p>
      </section>
{filteredWorkers.length === 0 && (
  <div className="text-center text-red-500 text-xl mb-8">
    No workers found.
  </div>
)}
      {/* Worker Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

  <div className="mb-6">
    <h2 className="text-2xl font-bold text-gray-900">
      {filteredWorkers.length} Workers Found
    </h2>
  </div>

  <div className="grid md:grid-cols-3 gap-6">

          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <div className="mb-4">
  {worker.photo_url ? (
    <img
      src={worker.photo_url}
      alt={worker.name}
      className="w-20 h-20 rounded-full object-cover border-2 border-orange-500"
    />
  ) : (
    <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
      👷
    </div>
  )}
</div>

              <h2 className="text-2xl font-bold text-gray-900">
                {worker.name}
              </h2>

              <p className="text-orange-500 font-semibold mt-2">
                {worker.profession}
              </p>

              <p className="text-gray-600 mt-1">
                📍 {worker.location}
              </p>

              <p className="text-yellow-500 mt-2">
                ⭐ 5.0
              </p>

              <Link href={`/workers/${worker.id}`}>
  <button className="mt-5 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg">
    View Details
  </button>
</Link>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
}