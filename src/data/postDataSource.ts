import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';
import Post from '../models/post';

export class PostDataSource extends DataSource {
  private posts: Post[];
  private postLoader: DataLoader<string, Post>;

  constructor(posts: Post[]) {
    super();
    this.posts = posts;
    this.postLoader = new DataLoader<string, Post>(this.batchLoadPosts.bind(this));
  }

  initialize() {
    // Optional: Add any initialization logic here
  }

  async batchLoadPosts(postIds: string[]): Promise<Post[]> {
    const filteredPosts = this.posts.filter((post) => postIds.includes(post.id));

    const postMap = filteredPosts.reduce((map, post) => {
      map[post.id] = post;
      return map;
    }, {});

    return postIds.map((postId) => postMap[postId]);
  }

  async getPosts(postIds: string[]): Promise<Post[]> {
   const posts = await this.postLoader.loadMany(postIds);

   const filteredPosts = posts.filter((post): post is Post => post !== undefined);
    return filteredPosts;
  }

  async getPost(postId: string): Promise<Post> {
    return await this.postLoader.load(postId);
   }
  
  getAllPosts(): Post[] {
    return this.posts;
  }
}
