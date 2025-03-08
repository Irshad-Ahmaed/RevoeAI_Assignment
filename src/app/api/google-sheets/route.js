import initializeSocketServer from '@/socket-server';
import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.NEXT_GOOGLE_SHEET_ID;

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:Z',
    });

    // Emit the new data to all connected clients
    const io = initializeSocketServer();
    if (io) {
      console.log('Emitting data-update event');
      io.emit('data-update', response.data.values);
    }

    return NextResponse.json(response.data.values);
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return NextResponse.json(
      { message: 'Error fetching data from Google Sheets' },
      { status: 500 }
    );
  }
}