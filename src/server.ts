import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { UserDataSource } from './data/userDataSource';
import { CommentDataSource } from './data/commentDataSource';
import { PostDataSource } from './data/postDataSource';
import depthLimit from 'graphql-depth-limit';
import { typeDefs } from './schema';
import { usersResolver } from './resolvers/userResolvers';
import { postsResolver } from './resolvers/postResolvers';
import { commentsResolver } from './resolvers/commentResolvers';
import { comments, users, posts } from './mock/mockdata';

const resolvers = {
    Query: {
        ...usersResolver.Query,
        ...postsResolver.Query,
        ...commentsResolver.Query,
    },
    User: usersResolver.User,
    Post: postsResolver.Post,
    Comment: commentsResolver.Comment,
  };

export async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      userDataSource: new UserDataSource(users),
      commentDataSource: new CommentDataSource(comments),
      postDataSource: new PostDataSource(posts),
    }),
    validationRules: [depthLimit(3)],
  });

  await server.start();

  const app = express();

  server.applyMiddleware({ app });

  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/graphql`);
  });
}
