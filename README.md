# Tier-Based Event Showcase

A fully responsive **Next.js 14** web application that allows users to view events based on their tier (Free, Silver, Gold, Platinum).  
Authentication is handled by **Clerk.dev**, and event data is managed in **Supabase** with **Row-Level Security (RLS)**.  
Users can simulate tier upgrades and view restricted events with clear upgrade messages.

---

## 📌 Features

### ✅ Core Features

- **Authentication with Clerk.dev**
  - Login and signup support.
  - Tier stored in Clerk's **public metadata**.
  - Restrict event listing page to authenticated users.
- **Tier-based Event Filtering**
  - Users can view events only for their tier or lower.
  - Example: A Gold user can view Free, Silver, and Gold events, but not Platinum events.
- **Event Management with Supabase**
  - Events table with proper schema.
  - Row-Level Security (RLS) applied based on user tier.
- **UI/UX**
  - Modern responsive design using Tailwind CSS.
  - Event cards showing title, description, date, tier badge, and image.
  - Loading states, error handling, and user-friendly notifications.
- **Tier Upgrade Simulation**
  - Upgrade user tier by updating Clerk metadata.
  - Instant UI refresh to reflect new tier.

### ⚡ Bonus Features

- Event lock message: "🔒 Upgrade to Platinum to unlock details."
- Toast notifications for better UX.
- Mobile-first responsive design.
- Deployment on **Vercel**.

---

## 🛠 Tech Stack

| Technology          | Purpose                 |
| ------------------- | ----------------------- |
| **Next.js 14**      | Frontend framework      |
| **Clerk.dev**       | Authentication and tier |
| **Supabase**        | Database and RLS        |
| **Tailwind CSS**    | Styling                 |
| **React Hot Toast** | Notifications           |

---

## 📂 Project Structure

```
tier-based-event-showcase/
│
├── app/
│   ├── api/
│   │   └── upgrade/
│   │       └── route.ts            # API endpoint for upgrading user tier
│   │
│   ├── events/
│   │   └── page.tsx                # Events listing page
│   │
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx            # Clerk sign-in page
│   │
│   ├── sign-up/
│   │   └── [[...sign-up]]/
│   │       └── page.tsx            # Clerk sign-up page
│   │
│   ├── favicon.ico                 # App favicon
│   ├── globals.css                 # Global CSS
│   ├── layout.tsx                  # Root layout with ClerkProvider
│   └── page.tsx                    # Main landing page
│
├── components/
│   ├── EventCard.tsx               # Event card UI
│   ├── TierBadge.tsx               # Tier badge display
│   └── UpgradeTierButton.tsx       # Tier upgrade simulation button
│
├── lib/
│   ├── supabaseClient.ts           # Supabase client setup
│
├── public/
│   └── (assets if any)             # Public static assets
│
├── .env.local                      # Environment variables
├── .gitignore                      # Ignored files for Git
├── package.json                    # Project dependencies
├── package-lock.json               # Dependency lock file
└── README.md                       # Project documentation
```

---

## 🗄 Database Schema

### Table: `events`

| Column        | Type               | Description                          |
| ------------- | ------------------ | ------------------------------------ |
| `id`          | UUID (Primary Key) | Unique event ID                      |
| `title`       | TEXT               | Event title                          |
| `description` | TEXT               | Event description                    |
| `event_date`  | TIMESTAMP          | Event date                           |
| `image_url`   | TEXT               | Event image                          |
| `tier`        | ENUM               | 'free', 'silver', 'gold', 'platinum' |

### Example Events

| Title            | Tier     | Description               | Date       |
| ---------------- | -------- | ------------------------- | ---------- |
| Free Event 1     | free     | For all users             | 2025-08-02 |
| Silver Event 1   | silver   | For Silver users or below | 2025-08-06 |
| Gold Event 1     | gold     | For Gold users or below   | 2025-08-10 |
| Platinum Event 1 | platinum | For Platinum users        | 2025-08-12 |

---

## 🔐 Row-Level Security (RLS)

Enable RLS:

```sql
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
```

Create policy for tier-based access:

```sql
CREATE policy "Allow users to view events based on tier"
on events
for select
using (
  (
    case current_setting('request.jwt.claims', true)::json->>'tier'
    when 'platinum' then true
    when 'gold' then tier in ('free', 'silver', 'gold')
    when 'silver' then tier in ('free', 'silver')
    else tier = 'free'
    end
  )
);
```

---

## 🔑 Environment Variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SERVICE_ROLE_KEY=your_sevice_role_key
```

---

## 💻 Setup & Run Locally

1. **Clone repository**

   ```bash
   git clone https://github.com/parth2487/tier-based-event-showcase.git
   cd tier-based-event-showcase
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set environment variables**

   - Add `.env.local` file and configure Clerk & Supabase.

4. **Run development server**
   ```bash
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000).

---

## 🌐 Deployment (Vercel)

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. Go to [Vercel](https://vercel.com).
3. Import your GitHub repository.
4. Add environment variables in Vercel.
5. Deploy the project.

---

## 🚀 Future Enhancements

- Admin panel for event management.
- Email notifications for tier upgrades.
- Search and filtering for events.
- Improved analytics dashboard.

---
