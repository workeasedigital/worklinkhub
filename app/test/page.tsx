import { supabase } from "../../lib/supabase";

export default async function TestPage() {
  const { data, error } = await supabase
    .from("workers")
    .select("*");

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold mb-5">
        Supabase Test
      </h1>

      <pre>
        {JSON.stringify(
          { data, error },
          null,
          2
        )}
      </pre>
    </main>
  );
}