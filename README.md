# Project Test Coding Bratamedia

- Ghifar Rito Ikbar Firmansyah

## Login Credentials

To log in to the application, use the following credentials:

**Email**: admin@example.com\
**Password**: admin

## Description

- Buat Aplikasi yang memiliki fitur login dan logout
  Buat Fitur Manage Siswa (CRUD)
- Buat Fitur Manage Kelas (CRUD)
- Buat Fitur Manage Guru (CRUD)
- Munculkan List Siswa berdasarkan kelasnya
- Munculkan List Guru berdasarkan Kelasnya
- Munculkan List Siswa, Kelas dan Guru

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Next.js**: A React framework for server-rendered applications.
- **Shadcn UI**: A UI component library for building modern applications.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Prisma**: A modern database toolkit for TypeScript and Node.js.
- **[Neon (PostgreSQL)](https://neon.tech/)** - A serverless PostgreSQL database solution.

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v16 or later)
- npm or bun
- Access to a Neon PostgreSQL database

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yukka-learn/tes-coding-team-Bratamedia
   cd tes-coding-team-Bratamedia
   ```

2. Install dependencies:

   ```bash
   npm install
   or
   bun install
   ```

3. Set up your environment variables. Create a `.env`. file in the root directory and add your database connection string:

   ```bash
   DATABASE_URL="your_neon_postgresql_connection_string"
   ```

4. Run the Prisma migration to set up your database:

   ```bash
   npx prisma migrate dev --name init
   ```

5. Run Generate Prisma Type:

   ```bash
   npx prisma generate
   ```

### Running the Application

To start the development server, run:

```bash
npm run dev
# or
bun dev
```
