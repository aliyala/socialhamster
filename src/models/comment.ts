import User from './user';

class Comment {
    id: string;
    content: string;
    post: string;
    author: string | User;
}

export default Comment;
