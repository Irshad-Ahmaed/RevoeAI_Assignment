import clientPromise from "@/app/utils/db";

export async function GET() {
  const client = await clientPromise;
  const dbInstance = client.db('dashboard');
  const columns = await dbInstance.collection('columns').find().toArray();
  return new Response(JSON.stringify(columns), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(req) {
  const { date, value, name, type } = await req.json();

  const client = await clientPromise;
  const dbInstance = client.db('dashboard');
  await dbInstance.collection('columns').insertOne({ date, value, name, type });

  return new Response(JSON.stringify({ message: 'Column added successfully' }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' },
  });
}