import { DataSource } from 'apollo-datasource';
import DataLoader from 'dataloader';
import Comment from '../models/comment';

export class CommentDataSource extends DataSource {
    private comments: Comment[];
    private commentLoader: DataLoader<string, Comment>;

    constructor(comments: Comment[]) {
        super();
        this.comments = comments;
        this.commentLoader = new DataLoader<string, Comment>(
            this.batchLoadComments.bind(this),
        );
    }

    initialize() {
        // Optional: Add any initialization logic here
    }

    async batchLoadComments(commentIds: string[]): Promise<Comment[]> {
        const filteredComments = this.comments.filter((comment) =>
            commentIds.includes(comment.id),
        );

        const commentMap = filteredComments.reduce((map, comment) => {
            map[comment.id] = comment;
            return map;
        }, {});

        return commentIds.map((commentId) => commentMap[commentId]);
    }

    async getComments(commentIds: string[]): Promise<Comment[]> {
        const comments = await this.commentLoader.loadMany(commentIds);

        const filteredComments = comments.filter(
            (comment): comment is Comment => comment !== undefined,
        );
        return filteredComments;
    }

    async getAllComments(): Promise<Comment[]> {
        return this.comments;
    }
}
