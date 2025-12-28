# Bitcoin Mining Site Builder

A production-grade web application for planning, designing, and optimizing Bitcoin mining infrastructure with advanced tools and 3D visualization.

## Features

- **Mining Profitability Calculator**: Calculate revenue, costs, and ROI based on hashrate, power consumption, and energy costs
- **Site Capacity Calculator**: Determine optimal container count and power requirements
- **3D Site Planner**: Visualize your mining site in 3D with interactive container and generator placement
- **Scenario Management**: Save and load scenarios with shareable links
- **Modern UI**: Dark theme with professional B2B aesthetic

## Tech Stack

- **Framework**: Next.js 16 with App Router, TypeScript, React
- **Styling**: Tailwind CSS v4
- **Database**: PostgreSQL with Prisma ORM
- **3D Graphics**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **Deployment**: Docker Compose

## Getting Started

### Prerequisites

- Node.js 20+
- Docker and Docker Compose
- PostgreSQL (if running locally without Docker)

### Local Development

1. **Clone the repository**

```bash
git clone <repository-url>
cd cryptocoin
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/cryptocoin
NODE_ENV=development
APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3000
SESSION_SECRET=replace-with-a-long-random-string
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

4. **Run database migrations**

```bash
npx prisma migrate dev
```

5. **Start the development server**

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

### Docker Deployment

1. **Build and start services**

```bash
docker compose up -d
```

2. **Run database migrations manually** (first time only, from your host shell)

```bash
npx prisma migrate deploy
```

3. **Access the application**

- Web: `http://localhost:3000`
- Database: `localhost:5432`

### Database Management

**Generate Prisma Client**
```bash
npx prisma generate
```

**Create a new migration**
```bash
npx prisma migrate dev --name migration_name
```

**Open Prisma Studio**
```bash
npx prisma studio
```

## Project Structure

```
cryptocoin/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── calculators/       # Calculators page
│   ├── site-planner/      # 3D planner page
│   └── scenarios/         # Scenario view pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── landing/          # Landing page components
│   ├── calculators/      # Calculator components
│   ├── site-planner/     # 3D planner components
│   └── scenarios/        # Scenario components
├── lib/                  # Utilities and helpers
│   ├── db/              # Database client
│   ├── calculations/    # Calculation utilities
│   ├── utils/           # General utilities
│   └── types/           # TypeScript types
└── prisma/              # Prisma schema and migrations
```

## API Routes

- `GET /api/scenarios` - List recent scenarios
- `POST /api/scenarios` - Create new scenario
- `GET /api/scenarios/[id]` - Get scenario by ID
- `DELETE /api/scenarios/[id]` - Delete scenario
- `POST /api/contact` - Submit contact form
- `GET /auth/:provider/start` - Begin OAuth 2.0 login (Google, GitHub)
- `GET /auth/:provider/callback` - Complete OAuth 2.0 login and issue session cookie

## Authentication (OAuth 2.0)

- Uses Authorization Code flow with PKCE for Google and GitHub.
- State parameter is stored in an HTTP-only cookie and validated on callback to prevent CSRF.
- Authorization codes are exchanged server-side for provider access tokens.
- A Prisma-backed `User` table stores `email`, `name`, `avatar_url`, `oauth_provider`, `oauth_provider_user_id`, and timestamps. Existing accounts are linked by email when a new provider login occurs.
- Successful sign-ins set an HTTP-only, signed session cookie (`session_token`) scoped to the application domain.

## Development

### Adding New Features

1. **New Calculator**: Add component in `components/calculators/` and calculation logic in `lib/calculations/`
2. **New Page**: Create route in `app/` directory
3. **Database Changes**: Update `prisma/schema.prisma` and run migrations

### Code Style

- Use TypeScript for all new code
- Follow Next.js App Router conventions
- Use Tailwind CSS for styling
- Keep components modular and reusable

## License

MIT
