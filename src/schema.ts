import { gql } from 'apollo-server-express';

export const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        posts: [Post!]!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        content: String!
        post: Post!
        author: User!
    }

    type Query {
        users(page: Int, pageSize: Int): [User!]!
        posts(page: Int, pageSize: Int): [Post!]!
        comments(page: Int, pageSize: Int): [Comment!]!
    }
`;
