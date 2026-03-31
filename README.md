# Food Delivery App

A full-stack food delivery application with product browsing, cart management, and order placement.

## Stack

- **Frontend:** Next.js 16, React 19, TypeScript, Zustand, React Hook Form, Zod
- **Backend:** Node.js, Express 5, TypeScript, Mongoose, Zod
- **Database:** MongoDB Atlas

## Features

- Browse products with filtering by shop and category
- Add to cart, update quantities, remove items
- Cart persisted in localStorage via Zustand
- Order form with Zod validation
- POST order to backend → saved in MongoDB

## Local Development

**Backend**
```bash
cd backend
npm install
npm run dev
```

Create `backend/.env`:
```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
```

Create `frontend/.env.local`:
```
NEXT_PUBLIC_URL_SERVER=http://localhost:5001
```

## Deployment

- **Backend:** Render (Web Service, Root Directory: `backend`)
- **Frontend:** Vercel

Set `NEXT_PUBLIC_URL_SERVER` on Vercel to your Render backend URL.