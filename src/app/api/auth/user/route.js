import clientPromise from '@/app/utils/db';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  const token = req.headers.get('authorization')?.split(' ')[1]; // Extract token from headers

  if (!token) {
    return new Response(JSON.stringify({ message: 'No token provided' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.NEXT_JWT_SECRET);
    const userId = decoded.userId;

    // Fetch user from the database
    const client = await clientPromise;
    const dbInstance = client.db('dashboard');
    const user = await dbInstance.collection('users').findOne({ _id: userId });

    if (!user) {
      return new Response(JSON.stringify({ message: 'User not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Return user details (excluding sensitive data like password)
    const { password, ...userDetails } = user;
    return new Response(JSON.stringify(userDetails), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}