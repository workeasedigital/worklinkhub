export default function Hero() {
  return (
    <section className="bg-orange-500 text-white py-24">
      <div className="max-w-6xl mx-auto text-center">

        <h1 className="text-6xl font-bold mb-6">
          WorkLinkHub
        </h1>

        <p className="text-2xl mb-6">
          Connect Workers. Get Work Done.
        </p>

        <p className="text-lg mb-10">
          Find trusted local workers near you.
        </p>

        <div className="flex justify-center gap-4">
          <button className="bg-white text-orange-500 px-6 py-3 rounded-lg font-semibold">
            Find Workers
          </button>

          <button className="bg-black px-6 py-3 rounded-lg font-semibold">
            Join as Worker
          </button>
        </div>

      </div>
    </section>
  );
}
