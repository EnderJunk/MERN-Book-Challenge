import express from 'express';
import path from 'path';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
// import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
// import http from 'http';
// import cors from 'cors';
import { typeDefs, resolvers } from './schemas/index.js';
import db from './config/connection.js';
import { authenticateToken } from './utils/auth.js';

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const PORT = process.env.PORT || 3001;
const app = express();
// const httpServer = http.createServer(app);

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

// Start Apollo Server
const startApolloServer = async () => {
  await server.start();
  await db;
  
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  
  app.use('/graphql', expressMiddleware(server as any,
    {
      context: authenticateToken as any
    }
  ));
  
  
  // app.use(
    //   '/graphql',
    //   // cors(),
    //   express.json(),
    //   expressMiddleware(server, {
      //     context: authMiddleware,
      //   }),
      // );
      
      // Serve static assets in production
      if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../../client/dist')));
        
        app.get('*', (_, res) => {
          res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
        });
      }
      
      // Connect to DB and start server
   
        app.listen(PORT, () => {
          console.log(`API server running on port ${PORT}!`);
          console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
        });
    };
    
    console.log ("am i running?");
    startApolloServer();
    