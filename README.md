# Dashboard with Google Sheets Integration

This project is a **Next.js** application that integrates with **Google Sheets** to fetch and display data in real-time. It includes features like authentication, dynamic column addition, and real-time updates using **Server-Sent Events (SSE)**.

---

## Features

1. **Authentication**:
   - Login and Signup using JWT-based authentication.
   - Protected routes for the dashboard.

2. **Google Sheets Integration**:
   - Fetch data from a Google Sheet and display it in a table.
   - Real-time updates when the Google Sheet is modified.

3. **Dynamic Column Addition**:
   - Add new columns dynamically to the dashboard table.
   - Support for **Text** and **Date** column types.

4. **Real-Time Updates**:
   - Automatically reflect changes in the Google Sheet on the dashboard.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Shadcn UI
- **Backend**: Next.js API Routes
- **Database**: MongoDB (for authentication)
- **Authentication**: JWT
- **Real-Time Updates**: Server-Sent Events (SSE)
- **Google Sheets Integration**: Google Sheets API

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Irshad-Ahmaed/RevoeAI_Assignment.git
cd revoeai_assignment
npm install
```

## 2. Environment Variables

- MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/dashboard?retryWrites=true&w=majority

- JWT_SECRET=your_jwt_secret_key

- NEXT_GOOGLE_SERVICE_ACCOUNT_KEY='{
  "type": "service_account",
  "project_id": "your-project-id",
  "private_key_id": "your-private-key-id",
  "private_key": "-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n",
  "client_email": "your-service-account-email@your-project-id.iam.gserviceaccount.com",
  "client_id": "your-client-id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/your-service-account-email%40your-project-id.iam.gserviceaccount.com"
}'

- NEXT_GOOGLE_SHEET_ID=your-google-sheet-id

## Run the Application
```bash
    npm run dev
```