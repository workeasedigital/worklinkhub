export default function Hero() {
  return (
    <section className="bg-orange-500 text-white py-24">
      <div className="max-w-6xl mx-auto text-center px-6">

        <h1 className="text-6xl font-bold mb-6">
          WorkLinkHub
        </h1>

        <p className="text-2xl mb-4">
          Connect Workers. Get Work Done.
        </p>

        <p className="text-lg mb-12">
          Find trusted local workers or get hired instantly.
        </p>

        <div className="flex flex-wrap justify-center gap-6">

          <a
            href="/workers"
            className="bg-white text-orange-500 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            🔍 Find Workers
          </a>

          <a
            href="/register-worker"
            className="bg-black text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            👷 Join as Worker
          </a>

          <a
            href="/post-job"
            className="bg-gray-900 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition"
          >
            📢 Post a Job
          </a>

        </div>

      </div>
    </section>
  );
}