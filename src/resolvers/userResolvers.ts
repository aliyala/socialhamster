export const usersResolver = {
    Query: {
        users: (_, { page, pageSize }, { dataSources }) => {
            const allUsers = dataSources.userDataSource.getAllUsers();

            // Apply pagination logic (better to move pagination logic to the data source, but ok to have it here for mock data).
            const startIndex = (page - 1) * pageSize;
            const endIndex = page * pageSize;
            const users = allUsers.slice(startIndex, endIndex);

            return users;
        },
    },
    User: {
        posts: async (parent, _, { dataSources }) => {
            return await dataSources.postDataSource.getPosts(parent.posts);
        },
    },
};
