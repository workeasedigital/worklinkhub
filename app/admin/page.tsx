import { supabase } from "../../lib/supabase";
import { redirect } from "next/navigation";
import { ADMIN_EMAIL } from "../../lib/admin";
import { cookies } from "next/headers";
import ApproveWorkerButton from "../../components/ApproveWorkerButton";
import RejectWorkerButton from "../../components/RejectWorkerButton";
import AdminLogoutButton from "../../components/AdminLogoutButton";
export const dynamic = "force-dynamic";
export default async function AdminPage() 
{
  const { data: workers } = await supabase
  .from("workers")
  .select("*")
  .eq("approved", false);

  const { data: approvedWorkers } = await supabase
  .from("workers")
  .select("*")
  .eq("approved", true);

const { data: rejectedWorkers } = await supabase
  .from("workers")
  .select("*")
  .eq("status", "Rejected");

  const { data: pendingWorkers } = await supabase
  .from("workers")
  .select("*")
  .eq("status", "Pending");

  const { data: jobs } = await supabase
  .from("jobs")
  .select("*");

  return (
    <main className="min-h-screen bg-slate-100">

      {/* Header */}
      <div className="bg-gray-900 text-white p-6">
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <h1 style={{ color: "orange", fontSize: "32px", fontWeight: "bold" }}>
      WorkLinkHub Admin
    </h1>

    <button
      style={{
        background: "red",
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
      }}
    >
      Logout
    </button>
  </div>
</div>

      <section className="max-w-7xl mx-auto p-6">

        {/* Dashboard Title */}
        <div className="mb-10">
          <h2 className="text-5xl font-bold text-slate-900">
            Admin Dashboard
          </h2>

          <p className="text-slate-600 mt-2 text-lg">
            Monitor workers, jobs and platform activity.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          {/* Total Workers */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold">
              👷 Total Workers
            </h3>

            <p className="text-5xl font-bold mt-4">
               {approvedWorkers?.length || 0}
            </p>
          </div>


          {/* Total Jobs */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-8 rounded-2xl shadow-xl">
            <h3 className="text-xl font-semibold">
              💼 Total Jobs
            </h3>

            <p className="text-5xl font-bold mt-4">
              {jobs?.length || 0}
            </p>
          </div>

          <div className="bg-blue-500 text-white p-8 rounded-2xl shadow-xl">
  <h3 className="text-xl font-semibold">
    ⏳ Pending Approvals
  </h3>

  <p className="text-5xl font-bold mt-4">
    {pendingWorkers?.length || 0}
  </p>
</div>
<a href="/admin/rejected-workers">
  <div className="bg-red-500 text-white p-8 rounded-2xl shadow-xl">
    <h3 className="text-xl font-semibold">
      ❌ Rejected Workers
    </h3>

  <p className="text-5xl font-bold mt-4">
    {rejectedWorkers?.length || 0}
  </p>
</div>
</a>
        </div>
<div className="grid md:grid-cols-4 gap-4 mb-10">
  <a
    href="/register-worker"
    className="bg-orange-500 text-white p-4 rounded-xl text-center font-bold"
  >
    Add Worker
  </a>

  <a
    href="/post-job"
    className="bg-green-500 text-white p-4 rounded-xl text-center font-bold"
  >
    Add Job
  </a>

  <a
    href="/admin/workers"
    className="bg-blue-500 text-white p-4 rounded-xl text-center font-bold"
  >
    View Workers
  </a>

  <a
   href="/admin/jobs"
    className="bg-purple-500 text-white p-4 rounded-xl text-center font-bold"
  >
    View Jobs
  </a>
</div>

<div className="bg-white rounded-2xl shadow-lg p-6 mb-10">

  <h2 className="text-2xl font-bold mb-6">
    Pending Worker Approvals
  </h2>

  {pendingWorkers?.length ? (
    pendingWorkers.map((worker) => (
      <div
        key={worker.id}
        className="flex justify-between items-center border-b py-4"
      >
        <div>
          <p className="font-bold">
            {worker.name}
          </p>

          <p className="text-gray-600">
            {worker.profession}
          </p>
        </div>

       <div className="flex gap-2">
        <a
  href={`/workers/${worker.id}`}
  target="_blank"
  className="bg-blue-500 text-white px-4 py-2 rounded-lg"
>
  View Details
</a>
  <ApproveWorkerButton id={worker.id} />

  <RejectWorkerButton id={worker.id} />
</div>
      </div>
    ))
  ) : (
    <p>No pending workers.</p>
  )}

</div>
        {/* Recent Data */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* Recent Workers */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">

            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              👷 Recent Workers
            </h3>

            {approvedWorkers?.length ? (
             approvedWorkers
                .slice(-5)
                .reverse()
                .map((worker) => (
                  <div
                    key={worker.id}
                    className="border-b border-slate-200 py-3"
                  >
                    <p className="font-semibold text-slate-900">
                      {worker.name}
                    </p>

                    <p className="text-slate-600">
                      {worker.profession}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-slate-500">
                No workers available.
              </p>
            )}
          </div>

          {/* Recent Jobs */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-200">

            <h3 className="text-2xl font-bold mb-6 text-slate-800">
              💼 Recent Jobs
            </h3>

            {jobs?.length ? (
              jobs
                .slice(-5)
                .reverse()
                .map((job) => (
                  <div
                    key={job.id}
                    className="border-b border-slate-200 py-3"
                  >
                    <p className="font-semibold text-slate-900">
                      {job.title}
                    </p>

                    <p className="text-slate-600">
                      📍 {job.location}
                    </p>
                  </div>
                ))
            ) : (
              <p className="text-slate-500">
                No jobs available.
              </p>
            )}
          </div>

        </div>

      </section>

    </main>
  );
}