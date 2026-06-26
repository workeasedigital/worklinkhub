import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import DeleteWorkerButton from "../../../components/DeleteWorkerButton";
export default async function AdminWorkersPage() {
  const { data: workers } = await supabase
    .from("workers")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500">
            Admin - Workers
          </h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto p-6">

        <h2 className="text-4xl font-bold mb-8">
          All Workers
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
                    className="w-20 h-20 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-orange-100 flex items-center justify-center text-3xl">
                    👷
                  </div>
                )}

              </div>

              <div className="flex items-center gap-3">

  {worker.photo_url ? (
    <img
      src={worker.photo_url}
      alt={worker.name}
      className="w-12 h-12 rounded-full object-cover"
    />
  ) : (
    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
      👷
    </div>
  )}

  <div>
    <p className="font-semibold text-slate-900">
      {worker.name}
    </p>

    <p className="text-slate-600">
      {worker.profession}
    </p>
  </div>

</div>

              <p className="text-orange-500">
                {worker.profession}
              </p>

              <p className="text-gray-600 mt-2">
                📍 {worker.location}
              </p>

              <Link href={`/workers/${worker.id}`}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  View Profile
                </button>
              </Link>
              <Link href={`/admin/workers/edit/${worker.id}`}>
    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
      Edit Worker
    </button>
  </Link>
<div className="mt-2 text-red-500">
  Worker ID: {worker.id}
</div>

<DeleteWorkerButton id={worker.id} />
            </div>
          ))}
        </div>

      </section>

    </main>
  );
}