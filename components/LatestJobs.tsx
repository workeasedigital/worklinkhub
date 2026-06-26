
import Link from "next/link";
import { supabase } from "../lib/supabase";

export default async function LatestJobs() {
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*")
    .order("id", { ascending: false })
    .limit(6);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-10">
          Latest Jobs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          {jobs?.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl shadow-lg p-6 border"
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

              <p className="text-green-600 font-semibold mt-2">
                ₹ {job.budget}
              </p>

              <Link href={`/jobs/${job.id}`}>
                <button className="mt-4 bg-orange-500 text-white px-4 py-2 rounded-lg">
                  View Job
                </button>
              </Link>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}