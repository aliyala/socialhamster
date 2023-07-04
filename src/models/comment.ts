class Comment {
    id: string;
    content: string;
    post: string;
    author: string;

    constructor(id: string, content: string, post: string, author: string)
    {
        this.id = id;
        this.content = content;
        this.post = post;
        this.author = author;
    }
}

export default Comment;