# CreativeSP

CreativeSP is a production-ready starter monorepo for an enterprise competition management and voting platform.

## Included
- Responsive web app scaffold with Next.js and Tailwind CSS
- NestJS API scaffold with Swagger docs
- Flutter mobile app scaffold for Android/iOS
- Prisma schema for competitions, contestants, and votes
- Docker Compose setup for API, web, and PostgreSQL

## Getting started
1. Install dependencies:
   - npm install
2. Start the web app:
   - npm run dev:web
3. Start the API:
   - npm run dev:api
4. Start everything with Docker:
   - docker compose up --build

## Architecture highlights
- Multi-tenant SaaS foundation
- Unified voting engine for online and SMS votes
- Role-based access control and audit trail design
- Real-time leaderboard and analytics-ready services
- Mobile, web, and API layers aligned around shared domain models
