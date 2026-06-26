
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function LatestWorkers() {
  const { data: workers } = await supabase
    .from("workers")
    .select("*")
    .order("id", { ascending: false })
    .limit(6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Latest Workers
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {workers?.map((worker) => (
            <div
  key={worker.id}
  className="bg-white rounded-xl shadow-lg p-6"
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

  <h3 className="text-xl font-bold">
    {worker.name}
  </h3>

              <p className="text-orange-500 mt-2">
                {worker.profession}
              </p>

              <p className="text-gray-600 mt-2">
                📍 {worker.location}
              </p>

              <Link href={`/workers/${worker.id}`}>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">
                  View Profile
                </button>
              </Link>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}