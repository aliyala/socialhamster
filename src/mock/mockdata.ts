import Post from "src/models/post";
import User from "src/models/user";
import Comment from "src/models/comment";

const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 9);
  };
  
  const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  const generateTestData = () => {
    const users = [];
    const posts = [];
    const comments = [];
  
    for (let i = 0; i < 30; i++) {
      const userId = generateRandomId();
      const user = {
        id: userId,
        name: `User ${i + 1}`,
        email: `user${i + 1}@example.com`,
        posts: [],
      };
  
      users.push(user);
  
      const numPosts = generateRandomNumber(3, 5);
      for (let j = 0; j < numPosts; j++) {
        const postId = generateRandomId();
        const post = {
          id: postId,
          title: `Post ${j + 1}`,
          content: `This is the content of Post ${j + 1} by User ${i + 1}`,
          author: userId,
          comments: [],
        };
  
        posts.push(post);
        user.posts.push(postId);
  
        const numComments = generateRandomNumber(5, 7);
        for (let k = 0; k < numComments; k++) {
          const commentId = generateRandomId();
          const randomUserIndex = generateRandomNumber(0, users.length - 1);
          const comment = {
            id: commentId,
            content: `Comment ${k + 1} on Post ${j + 1} by User ${i + 1}`,
            post: postId,
            author: users[randomUserIndex].id,
          };
  
          comments.push(comment);
          post.comments.push(commentId);
        }
      }
    }
  
    return { users, posts, comments };
  };
  
  
  const { users, posts, comments } = generateTestData();
  
  export { users, posts, comments };
  