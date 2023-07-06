export const postsResolver = {
    Query: {
        posts: (_, { page, pageSize }, { dataSources }) => {
            const allPosts = dataSources.postDataSource.getAllPosts();

            // Apply pagination logic (better to move pagination logic to the data source, but ok to have it here for mock data).
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            const posts = allPosts.slice(startIndex, endIndex);

            return posts;
        },
    },
    Post: {
        author: async (parent, _, { dataSources }) => {
            return await dataSources.userDataSource.getUser(parent.author);
        },
        comments: async (parent, _, { dataSources }) => {
            return await dataSources.commentDataSource.getComments(
                parent.comments,
            );
        },
    },
};
