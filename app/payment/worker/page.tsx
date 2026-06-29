export default function WorkerPaymentHome() {
  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center">

        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          Worker Contact Unlock
        </h1>

        <p className="text-gray-600 mb-8">
          Select a worker to unlock their contact details.
        </p>

        <a
          href="/workers"
          className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold"
        >
          Browse Workers
        </a>

      </div>
    </main>
  );
}