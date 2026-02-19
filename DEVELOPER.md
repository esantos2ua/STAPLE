# Developer Guide

## Prerequisites

-   [Node.js](https://nodejs.org/) (Version 16 or later recommended)
-   [PostgreSQL](https://www.postgresql.org/) (Database)
-   [Git](https://git-scm.com/)

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/STAPLE-verse/STAPLE.git
    cd STAPLE
    ```

2.  Install dependencies:

    ```bash
    npm install
    ```

## Database Setup

1.  Make sure your PostgreSQL server is running.
2.  Copy `.env.example` to `.env.local` (or `.env`) and update the `DATABASE_URL` if necessary.

    ```bash
    cp .env.example .env.local
    ```

    *Note: If `.env.example` does not exist, check `.env` or create a new one with your database credentials.*

3.  Initialize the database:

    ```bash
    npx blitz prisma migrate dev
    ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Running Tests

To run the test suite:

```bash
npm test
```

To run tests in watch mode:

```bash
npm run test:watch
```

## Linting

To check for linting errors:

```bash
npm run lint
```

## Project Structure

-   `src/`: Source code
    -   `projects/`, `tasks/`, `users/`, etc.: Feature-based directories containing components, queries, mutations, and hooks.
    -   `core/`: Shared components, layouts, and utilities.
    -   `pages/`: Next.js pages.
-   `db/`: Database schema and migrations.
-   `test/`: Test setup and utilities.
