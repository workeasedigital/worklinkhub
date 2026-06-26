import { supabase } from "../../../../../lib/supabase";
import EditWorkerForm from "../../../../../components/EditWorkerForm";
export default async function EditWorkerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: worker } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();

  if (!worker) {
    return (
      <div className="p-10 text-red-500">
        Worker not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Edit Worker
        </h1>

          <EditWorkerForm worker={worker} />

      </div>

    </main>
  );
}