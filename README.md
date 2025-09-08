# Random Quote Generator (Roar) - In Empiseysocheata

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Brief Description
A Random Quote Generator website where users can get daily quotes, sign up, and log in. Users can also save favorite quotes.  
**Technologies used:** Next.js, React, Tailwind CSS, Supabase.

---
## Project Setup & Architecture

Clone the repository and navigate into it:  
`git clone https://github.com/your-username/your-repo.git`  
`cd your-repo`  

Install dependencies:  
`npm install`  
or  
`yarn install`  

Install Supabase dependencies:  
`npm install @supabase/supabase-js`  
or
`yarn add @supabase/supabase-js`

Set up environment variables by creating a `.env.local` file in the root directory with:  
`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url`  
`NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key`  

Run the development server:  
`npm run dev`  
or  
`yarn dev`  

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Project Architecture:  
- Frontend: Next.js app (React) runs in the browser. Users interact with the UI to view quotes, sign up, and log in. Requests for quotes or authentication are sent to backend API routes.  

- Backend: API route files (e.g., `route.js`) handle requests from the frontend. When the frontend asks for a random quote, the backend receives the request and queries Supabase.  

- Database: Supabase hosts the PostgreSQL database. The backend uses the Supabase client to fetch quotes or handle user authentication.  

- Communication Flow: Frontend sends a request to `/api/quotes`. Backend receives the request and queries Supabase. Supabase returns the data to the backend, which then responds to the frontend. The frontend displays the result to the user.

## Deployment

You can deploy this Next.js app on Vercel. 
Sign in to [Vercel](https://vercel.com/), import your GitHub repository, and Vercel will automatically detect the Next.js project. 
Make sure your environment variables are set in Vercel. Click “Deploy” and your app will be live. The deployment URL will be provided by Vercel.
