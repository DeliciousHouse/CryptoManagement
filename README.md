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
NEXT_PUBLIC_APP_URL=http://localhost:3000
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
docker-compose up -d
```

2. **Run database migrations** (first time only)

```bash
docker-compose exec web npx prisma migrate deploy
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
