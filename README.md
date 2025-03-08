# MERN Book Search Engine

## Description

This application is a Google Books API search engine built with a MERN stack that allows users to search for books and save them to their profile. The original version used a RESTful API, but it has been refactored to use GraphQL with Apollo Server to improve performance and flexibility.

## Technologies Used

- **M**ongoDB and Mongoose ODM
- **E**xpress.js
- **R**eact
- **N**ode.js
- GraphQL with Apollo Server
- JWT for authentication
- TypeScript
- Vite

## Features

- Search for books using the Google Books API
- User authentication (signup/login)
- Save books to your profile
- View all your saved books
- Remove books from your saved collection

## Installation

1. Clone the repository
2. Install dependencies
3. Create a `.env` file in the server directory with the following variables:
4. Run the development server

## Usage

- Visit the homepage to search for books
- Click "Login/Sign Up" to create an account or login
- When logged in, you can save books from search results
- View your saved books by clicking "See Your Books" in the navigation
- Remove books from your saved collection with the "Delete" button

## Deployment

This application is deployed on Render and uses MongoDB Atlas for database management. 

Visit the deployed application: [MERN Book Search Engine](https://mern-book-challenge.onrender.com/)

## Technical Implementation

This application uses:

- Apollo Server for GraphQL implementation on the server-side
- Apollo Client for GraphQL queries and mutations on the client-side
- JWT token-based authentication that works with the GraphQL API
- React components with Apollo hooks for data fetching
- TypeScript for type safety throughout the application

## License

This project is licensed under the MIT License.

## Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the issues page if you want to contribute.

## Contact

If you have questions about this project, please contact [Christian Walters](github.com/EnderJunk).