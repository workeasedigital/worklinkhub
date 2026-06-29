import { supabase } from "../../../lib/supabase";
export const dynamic = "force-dynamic";
export default async function WorkerDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data: worker, error } = await supabase
    .from("workers")
    .select("*")
    .eq("id", id)
    .single();
    const isUnlocked = false;

  if (!worker || error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 text-xl">
        Worker Not Found
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

          {/* Orange Banner */}
          <div className="bg-orange-500 h-32"></div>

          <div className="px-8 pb-8">

            {/* Worker Photo */}
            <div className="-mt-16 mb-6">
              {worker.photo_url ? (
                <img
                  src={worker.photo_url}
                  alt={worker.name}
                  className="w-32 h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
              ) : (
                <div className="w-32 h-32 bg-orange-100 rounded-full border-4 border-white flex items-center justify-center text-5xl shadow-lg">
                  👷
                </div>
              )}
            </div>

            {/* Basic Info */}
            <h2 className="text-4xl font-bold text-gray-900">
              {worker.name}
            </h2>

            <p className="text-orange-500 text-xl mt-2">
              {worker.profession}
            </p>

            <p className="text-gray-600 mt-2">
              📍 {worker.location}
            </p>

            <p className="text-yellow-500 mt-2 font-semibold">
              ⭐ 5.0
            </p>

            {/* Stats */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">

              <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                <h3 className="font-bold text-lg mb-2">
                  Experience
                </h3>

                <p className="text-gray-700">
                  {worker.experience} Years
                </p>
              </div>
              <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
                <div className="bg-gray-50 p-5 rounded-xl shadow-sm">
  <h3 className="font-bold text-lg mb-2">
    Contact Number
  </h3>

  {isUnlocked ? (
    <p className="text-gray-700">
      {worker.phone}
    </p>
  ) : (
    <>
      <p className="text-red-500 font-semibold">
        🔒 Contact Locked
      </p>

      <a
        href={`/payment/worker/${worker.id}`}
        className="inline-block mt-3 bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold"
      >
        Unlock Contact ₹99
      </a>
    </>
  )}
</div>
              </div>

            </div>

            {/* About Section */}
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-3">
                About Worker
              </h3>

              <p className="text-gray-700 leading-relaxed">
                {worker.about ||
                  "Experienced professional available for work."}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col md:flex-row gap-4">

              {isUnlocked ? (
  <a
    href={`tel:${worker.phone}`}
    className="bg-green-500 hover:bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold"
  >
    📞 Call Worker
  </a>
) : (
  <a
    href={`/payment/worker/${worker.id}`}
    className="bg-green-500 hover:bg-green-600 text-white text-center px-6 py-3 rounded-lg font-semibold"
  >
    🔓 Unlock Call ₹99
  </a>
)}

  {isUnlocked ? (
  <a
    href={`https://wa.me/91${worker.whatsapp}`}
    target="_blank"
    className="bg-orange-500 hover:bg-orange-600 text-white text-center px-6 py-3 rounded-lg font-semibold"
  >
    💬 WhatsApp Worker
  </a>
) : (
  <a
    href={`/payment/worker/${worker.id}`}
    className="bg-orange-500 hover:bg-orange-600 text-white text-center px-6 py-3 rounded-lg font-semibold"
  >
    🔓 Unlock WhatsApp ₹99
  </a>
)}

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}