import Link from "next/link";
import { supabase } from "../../lib/supabase";

export default async function JobsPage() {
  const { data: jobs, error } = await supabase
  .from("jobs")
  .select("*")
  .order("id", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-50">

      <div className="bg-gray-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500">
            WorkLinkHub
          </h1>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-4xl font-bold text-center mb-10 text-gray-900">
          Available Jobs
        </h2>

        {jobs?.length === 0 && (
          <div className="text-center text-red-500 text-xl">
            No Jobs Available
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">

          {jobs?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-lg p-6"
            >
              <h3 className="text-2xl font-bold text-gray-900">
                {job.title}
              </h3>

              <p className="mt-3 text-orange-500 font-semibold">
                {job.profession}
              </p>

              <p className="mt-3 text-gray-600">
                📍 {job.location}
              </p>

              <p className="mt-3 text-green-600 font-semibold">
                ₹ {job.budget}
              </p>

              
              <Link href={`/jobs/${job.id}`}>
              <button className="mt-5 bg-orange-500 text-white px-5 py-2 rounded-lg">
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