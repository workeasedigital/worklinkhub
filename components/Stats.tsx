
import { supabase } from "../lib/supabase";

export default async function Stats() {
  const { count: workersCount } = await supabase
    .from("workers")
    .select("*", { count: "exact", head: true });

  const { count: jobsCount } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true });

  return (
    <section className="py-16 bg-orange-500 text-white">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center mb-12">
          WorkLinkHub Growth
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">

          <div>
            <h3 className="text-5xl font-bold">
              {workersCount || 0}
            </h3>
            <p className="mt-2">Workers Registered</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">
              {jobsCount || 0}
            </h3>
            <p className="mt-2">Jobs Posted</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">
              20+
            </h3>
            <p className="mt-2">Professions</p>
          </div>

          <div>
            <h3 className="text-5xl font-bold">
              10+
            </h3>
            <p className="mt-2">Cities Covered</p>
          </div>

        </div>

      </div>
    </section>
  );
}