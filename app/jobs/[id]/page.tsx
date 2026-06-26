import { supabase } from "../../../lib/supabase";

export default async function JobDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (!job || error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Job Not Found
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100">

      {/* Header */}
      <div className="bg-gray-900 text-white py-5">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-3xl font-bold text-orange-500">
            WorkLinkHub
          </h1>
        </div>
      </div>

      <section className="max-w-5xl mx-auto px-6 py-10">

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

          {/* Top Banner */}
          <div className="bg-orange-500 h-28"></div>

          <div className="p-8">

            <div className="-mt-20 mb-6">
              <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center text-5xl">
                💼
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900">
              {job.title}
            </h2>

            <p className="text-orange-500 text-xl mt-2">
              {job.profession}
            </p>

            <p className="text-gray-600 mt-3">
              📍 {job.location}
            </p>

            <p className="text-green-600 text-2xl font-bold mt-3">
              ₹ {job.budget}
            </p>

            <div className="mt-8 bg-gray-50 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-3">
                Job Description
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {job.description}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold mb-2">
                  Profession Required
                </h3>

                <p>{job.profession}</p>
              </div>

              <div className="bg-gray-50 p-5 rounded-xl">
                <h3 className="font-bold mb-2">
                  Location
                </h3>

                <p>{job.location}</p>
              </div>

            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-4">

              <a
                href={`tel:${job.mobile}`}
                className="bg-green-500 text-white text-center px-6 py-3 rounded-lg font-semibold"
              >
                📞 Call Customer
              </a>

              <a
                href={`https://wa.me/${job.mobile}`}
                target="_blank"
                className="bg-orange-500 text-white text-center px-6 py-3 rounded-lg font-semibold"
              >
                💬 WhatsApp Customer
              </a>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}