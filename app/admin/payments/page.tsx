import { supabase } from "../../../lib/supabase";
import ApprovePaymentButton from "../../../components/ApprovePaymentButton";
export default async function PaymentsPage() {

  const { data: payments } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 p-8">

      <div className="flex justify-between items-center mb-8">

  <h1 className="text-4xl font-bold text-orange-500">
    💰 Payment Requests
  </h1>

  <a
    href="/admin"
    className="bg-gray-700 hover:bg-gray-800 text-white px-5 py-3 rounded-lg font-semibold"
  >
    ← Back to Dashboard
  </a>

</div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <table className="w-full">

          <thead className="bg-orange-500 text-white">

            <tr>

              <th className="p-4">Name</th>

              <th>Email</th>

              <th>Amount</th>

              <th>UTR</th>

              <th>Type</th>

              <th>Status</th>

              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {payments?.map((payment) => (

              <tr
                key={payment.id}
                className="border-b text-center"
              >

                <td className="p-4">
                  {payment.user_name}
                </td>

                <td>
                  {payment.user_email}
                </td>

                <td>
                  ₹{payment.amount}
                </td>

                <td>
                  {payment.utr}
                </td>

                <td>
                  {payment.payment_type}
                </td>

                <td>
                  {payment.status}
                </td>
                 <td>
  {payment.status === "Pending" ? (
    <ApprovePaymentButton
      id={payment.id}
    />
  ) : (
    <span className="text-green-600 font-bold">
      Approved
    </span>
  )}
</td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </main>
  );
}