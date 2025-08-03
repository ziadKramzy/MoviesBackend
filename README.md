# Movies App Backend

A robust backend service for a movie streaming platform, built with modern web technologies to provide a seamless API for movie data management and user interactions.

## Live Demo

API Base URL: [https://movies-app-backend.fly.dev](https://movies-app-backend.fly.dev)

## Features

- RESTful API for movie data management
- User authentication and authorization
- Movie catalog with search and filtering
- User watchlist and favorites
- Rating and review system
- Secure API endpoints
- CORS enabled for frontend integration
- Rate limiting for API protection

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Fly.io
- **Environment Management**: dotenv
- **API Documentation**: Swagger/OpenAPI (if implemented)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/movies-app-backend.git
   cd movies-app-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your environment variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user profile (protected)

### Movies
- `GET /api/movies` - Get all movies (with pagination)
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Add a new movie (admin only)
- `PUT /api/movies/:id` - Update a movie (admin only)
- `DELETE /api/movies/:id` - Delete a movie (admin only)

### User Actions
- `GET /api/users/me/watchlist` - Get user's watchlist
- `POST /api/movies/:id/watchlist` - Add to watchlist
- `DELETE /api/movies/:id/watchlist` - Remove from watchlist
- `POST /api/movies/:id/rate` - Rate a movie
- `POST /api/movies/:id/review` - Add a review

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Port to run the server | 3000 |
| MONGODB_URI | MongoDB connection string | - |
| JWT_SECRET | Secret key for JWT | - |
| NODE_ENV | Application environment | development |

## Deployment

This application is deployed on Fly.io. To deploy your own instance:

1. Install the [Fly.io CLI](https://fly.io/docs/hands-on/install-flyctl/)
2. Run `flyctl launch`
3. Set your environment variables in the Fly.io dashboard
4. Deploy with `flyctl deploy`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Built with ❤️ for movie enthusiasts
- Thanks to all contributors who have participated in this project
