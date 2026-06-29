export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full text-center">

        <h1 className="text-4xl font-bold text-orange-500 mb-4">
          WorkLinkHub Payments
        </h1>

        <p className="text-gray-600 mb-8">
          Choose what you want to unlock.
        </p>

        <div className="space-y-4">

          <a
            href="/payment/worker/1"
            className="block bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-xl font-bold"
          >
            👷 Unlock Worker Contact
          </a>

          <a
            href="/payment/job/1"
            className="block bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold"
          >
            💼 Unlock Employer Contact
          </a>

        </div>

      </div>
    </main>
  );
}