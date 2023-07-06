import { startServer } from '../server';
import User from 'src/models/user';
import Post from 'src/models/post';
import Comment from 'src/models/comment';
import { ValidationError } from 'apollo-server-express';

describe('Queries', () => {
    let testServer;
    beforeAll(() => {
        startServer().then((v) => (testServer = v));
    });

    it('returns first 10 users', async () => {
        const query = `
    query GetUsers($page: Int, $pageSize: Int) {
      users(page: $page, pageSize: $pageSize) {
        id
        name
        email
      }
    }
    `;

        const response = await testServer.executeOperation({
            query,
            variables: { page: 1, pageSize: 10 },
        });

        expect(response.errors).toBeUndefined();
        expect(response.data).toBeDefined();
        expect(response.data.users).toBeDefined();
        expect(response.data.users.length).toBe(10);
        const user: User = response.data.users[0];
        expect(user.name).toBeDefined();
        expect(user.name).not.toBe('');
        expect(user.id).toBeDefined();
        expect(user.id).not.toBe('');
        expect(user.email).toBeDefined();
        expect(user.email).not.toBe('');
        expect(user.posts).toBeUndefined();
    });

    it('returns first 3 users with their posts', async () => {
        const query = `
    query GetUsers($page: Int, $pageSize: Int) {
      users(page: $page, pageSize: $pageSize) {
        id
        name
        posts {
          id
          title
          content
        }
      }
    }
    `;

        const response = await testServer.executeOperation({
            query,
            variables: { page: 1, pageSize: 3 },
        });

        expect(response.errors).toBeUndefined();
        expect(response.data).toBeDefined();
        expect(response.data.users).toBeDefined();
        expect(response.data.users.length).toBe(3);
        const user: User = response.data.users[0];
        expect(user.posts).toBeDefined();
        expect(user.posts.length).toBeGreaterThan(0);
        const post: Post = user.posts[0];
        expect(post.title).toBeDefined();
        expect(post.title).not.toBe('');
    });

    it('returns first 3 users with their posts and comments', async () => {
        const query = `
      query GetUsers($page: Int, $pageSize: Int) {
        users(page: $page, pageSize: $pageSize) {
          id
          name
          posts {
            id
            title
            content
            comments {
              id
              content
            }
          }
        }
      }
      `;

        const response = await testServer.executeOperation({
            query,
            variables: { page: 1, pageSize: 3 },
        });

        expect(response.errors).toBeUndefined();
        expect(response.data).toBeDefined();
        expect(response.data.users).toBeDefined();
        expect(response.data.users.length).toBe(3);
        const user: User = response.data.users[0];
        expect(user.posts).toBeDefined();
        expect(user.posts.length).toBeGreaterThan(0);
        const post: Post = user.posts[0];
        expect(post.comments).toBeDefined();
        expect(post.comments.length).toBeGreaterThan(0);
        const comment: Comment = post.comments[0];
        expect(comment.content).toBeDefined();
        expect(comment.author).toBeUndefined();
    });

    it('returns first 3 users with their posts, comments and authors', async () => {
        const query = `
      query GetUsers($page: Int, $pageSize: Int) {
        users(page: $page, pageSize: $pageSize) {
          id
          name
          posts {
            id
            title
            content
            comments {
              id
              content
              author {
                id
                name
              }
            }
          }
        }
      }
      `;

        const response = await testServer.executeOperation({
            query,
            variables: { page: 1, pageSize: 3 },
        });

        expect(response.errors).toBeUndefined();
        expect(response.data).toBeDefined();
        expect(response.data.users).toBeDefined();
        expect(response.data.users.length).toBe(3);
        const user: User = response.data.users[0];
        expect(user.posts).toBeDefined();
        expect(user.posts.length).toBeGreaterThan(0);
        const post: Post = user.posts[0];
        expect(post.comments).toBeDefined();
        expect(post.comments.length).toBeGreaterThan(0);
        const comment: Comment = post.comments[0];
        expect(comment.content).toBeDefined();
        expect(comment.author).toBeDefined();
        const author: User = comment.author as User;
        expect(author.name).toBeDefined();
    });

    it('returns error when query depth exceeds limit', async () => {
        const query = `
      query GetUsers($page: Int, $pageSize: Int) {
        users(page: $page, pageSize: $pageSize) {
          id
          posts {
            id
            title
            comments {
              id
              content
              author {
                id
                posts {
                  id
                }
              }
            }
          }
        }
      }
      `;

        const response = await testServer.executeOperation({
            query,
            variables: { page: 1, pageSize: 3 },
        });

        expect(response.errors).toBeDefined();
        const error: ValidationError = response.errors[0];
        expect(error.message).toBe(
            "'GetUsers' exceeds maximum operation depth of 4",
        );
        expect(response.data).toBeUndefined();
    });
});
