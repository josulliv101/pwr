import { sql } from "@vercel/postgres";

export default async function Cart({
  params,
}: {
  params?: { user: string };
}): Promise<JSX.Element> {
  const { rows } = await sql`SELECT * from users`; // where user_id=${params.user}
  console.log("params", params);
  return (
    <div>
      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.name}
        </div>
      ))}
    </div>
  );
}
