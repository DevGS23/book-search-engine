const resolvers = {
    Query: {
        me: () => ({
            username: "testuser",
            email: "test@example.com",
        }),
    },
    Mutation: {
        login: (_, { email }) => ({
            username: "testuser",
            email,
        }),
        addUser: (_, { username, email }) => ({
            username,
            email,
        }),
        saveBook: (_, args) => args,
        removeBook: (_, { bookId }) => ({ bookId }),
    },
};
export default resolvers;
