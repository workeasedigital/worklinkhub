import { supabase } from "../../../../../lib/supabase";
import EditJobForm from "../../../../../components/EditJobForm";

export default async function EditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: job } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (!job) {
    return (
      <div className="p-10 text-red-500">
        Job not found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6">
          Edit Job
        </h1>

        <EditJobForm job={job} />

      </div>

    </main>
  );
}