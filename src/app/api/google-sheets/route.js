import { google } from 'googleapis';

export async function GET(req) {
  console.log('Fetching data from Google Sheets...');

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.NEXT_GOOGLE_SERVICE_ACCOUNT_KEY),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.NEXT_GOOGLE_SHEET_ID;

    console.log('Spreadsheet ID:', spreadsheetId);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A:Z',
    });

    console.log('Data fetched successfully:', response.data.values);
    return new Response(JSON.stringify(response.data.values), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return new Response(JSON.stringify({ message: 'Error fetching data from Google Sheets' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}