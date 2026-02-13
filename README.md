### Frontend

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios

### Backend

- NestJS
- TypeScript
- TypeORM
- Class Validator

### Database

- Microsoft SQL Server 2022

### DevOps

- Docker
- Docker Compose

## Project Structure

```
fullstack-project/
├── backend/                # NestJS backend
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── entities/      # TypeORM entities
│   │   ├── modules/       # Feature modules
│   │   │   └── users/     # Users module
│   │   ├── app.module.ts
│   │   └── main.ts
│   ├── Dockerfile
│   └── package.json
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   ├── types/         # TypeScript types
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── Dockerfile
│   └── package.json
└── docker-compose.yml     # Docker orchestration
```

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd fullstack-project
```

### 2. Start the application with Docker

```bash
docker-compose up --build
```

This will start:

- MSSQL Database on port 1433
- Backend API on port 3000
- Frontend on port 5173

### 3. Access the application

- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
