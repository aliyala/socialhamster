export const commentsResolver = {
    Query: {
        comments: (_, __, { dataSources }) => {
            return dataSources.commentDataSource.getAllComments();
        },
    },
    Comment: {
        post: async (parent, _, { dataSources }) => {
            return await dataSources.postDataSource.getPost(parent.post);
        },
        author: async (parent, _, { dataSources }) => {
            return await dataSources.userDataSource.getUser(parent.author);
        },
    },
};
