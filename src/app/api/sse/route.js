import { google } from 'googleapis';
import { NextResponse } from 'next/server';

export async function GET() {
    console.log('start');
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_KEY),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const spreadsheetId = process.env.NEXT_GOOGLE_SHEET_ID;

  // Set up SSE headers
  const headers = new Headers({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  });

  const stream = new ReadableStream({
    async start(controller) {
        let isStreamOpen = true;

      const sendData = async () => {
        if (!isStreamOpen) return;
        try {
          const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A:Z',
          });

          const data = JSON.stringify(response.data.values) || JSON.stringify([]);
          console.log(data);
          controller.enqueue(`data: ${data}\n\n`);
        } catch (error) {
          console.error('Error fetching data from Google Sheets:', error);
          controller.enqueue(`data: ${JSON.stringify({ error: 'Failed to fetch data' })}\n\n`);
        }
      };

      // Send data immediately
      await sendData();

      // Poll for updates every 10 seconds
      const interval = setInterval(sendData, 10000);

      // Cleanup on client disconnect
      return () => {
        isStreamOpen = false;
        clearInterval(interval);
        controller.close();
      };
    },
  });

  return new NextResponse(stream, { headers });
}