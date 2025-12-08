// JavaScript version for Docker production (TypeScript not available)
module.exports = {
  schema: 'prisma/schema.prisma',
  datasource: {
    url: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/cryptocoin',
  },
}

