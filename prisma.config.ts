import { defineConfig } from 'prisma/config'

// In Docker, environment variables are already available, no need for dotenv
export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/cryptocoin',
  },
})

