# Quotes Backend

This backend application powers a social media platform by serving database queries to the frontend. It includes features such as:

- **Caching**: Enhances performance by speeding up GET requests using Redis or similar technology.
- **Authentication and Authorization**: Secures user data and resources with robust authentication mechanisms (e.g., JWT, sessions).
- **Validation**: Ensures data integrity by validating inputs and protecting the database from malicious entries.

## Key Features

- **RESTful API**: Exposes a set of API endpoints for handling social interactions like posting quotes, adding comments, liking, etc.
- **Database Management**: Uses Prisma ORM with PostgreSQL for efficient and scalable data handling.
- **Security**: Implements input validation and session-based authentication to secure user data.

## Technologies Used

- **Node.js**: Server-side runtime environment.
- **Express.js**: Fast and minimalistic web framework.
- **Prisma ORM**: Database management and queries.
- **PostgreSQL**: Relational database for storing quotes, users, comments, etc.
- **Redis**: In-memory caching to improve request performance.
- **JWT**: For user authentication.

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/skno27/Quotes_Backend.git
   ```
2. Install Dependencies
   ```
   npm install
   ```
3. Set up Environment Variables
   ```
   DATABASE_URL=your_postgresql_url
   REDIS_URL=your_redis_url
   JWT_SECRET=your_jwt_secret
   ```
4. Set up the Database
   ```
   npx prisma migrate dev
   ```
5. Start the Development Server
   ```
   npm run dev
   ```
