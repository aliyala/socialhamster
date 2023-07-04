class Post {
    id: string;
    title: string;
    content: string;
    author: string;
    comments: string[];

    constructor(id: string, title: string, content: string, author: string, comments: string[])
    {
        this.id = id;
        this.title = title;
        this.content = content;
        this.author = author;
        this.comments = comments;
    }
}

export default Post;