import Link from "next/link";
import { supabase } from "../../../lib/supabase";
import DeleteJobButton from "../../../components/DeleteJobButton";
export default async function AdminJobsPage() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-slate-100">

      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500">
            Admin - Jobs
          </h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto p-6">

        <h2 className="text-4xl font-bold mb-8">
          All Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {jobs?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold">
                {job.title}
              </h3>

              <p className="text-orange-500 mt-2">
                {job.profession}
              </p>

              <p className="text-gray-600 mt-2">
                📍 {job.location}
              </p>

              <p className="text-green-600 font-bold mt-2">
                ₹ {job.budget}
              </p>

              <Link href={`/jobs/${job.id}`}>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                  View Job
                </button>
              </Link>

  <Link href={`/admin/jobs/edit/${job.id}`}>
    <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
      Edit Job
    </button>
  </Link>
               <DeleteJobButton id={job.id} />

            </div>
          ))}
        </div>

      </section>

    </main>
  );
}