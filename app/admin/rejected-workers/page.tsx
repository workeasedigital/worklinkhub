import { supabase } from "../../../lib/supabase";

export default async function RejectedWorkersPage() {
  const { data: workers } = await supabase
    .from("workers")
    .select("*")
    .eq("status", "Rejected");

  return (
    <main className="min-h-screen bg-slate-100 p-6">

      <a
        href="/admin"
        className="text-orange-500 font-bold"
      >
        ← Back to Dashboard
      </a>

      <h1 className="text-4xl font-bold mt-4 mb-8">
        Rejected Workers
      </h1>

      <div className="space-y-4">
        {workers?.map((worker) => (
          <div
            key={worker.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold">
              {worker.name}
            </h2>

            <p>{worker.profession}</p>

            <p>{worker.phone}</p>

            <p className="text-red-500 font-semibold">
              Status: {worker.status}
            </p>

            <p>
              Reason:
              {" "}
              {worker.rejection_reason || "No reason provided"}
            </p>
          </div>
        ))}
      </div>

    </main>
  );
}