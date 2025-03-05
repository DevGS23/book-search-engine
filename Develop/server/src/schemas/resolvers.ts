const resolvers = {
    Query: {
      me: (): { username: string; email: string } => ({
        username: "testuser",
        email: "test@example.com",
      }),
    },
    Mutation: {
      login: (_: unknown, { email }: { email: string }): { username: string; email: string } => ({
        username: "testuser",
        email,
      }),
      addUser: (_: unknown, { username, email }: { username: string; email: string }): { username: string; email: string } => ({
        username,
        email,
      }),
      saveBook: (_: unknown, args: Record<string, unknown>): Record<string, unknown> => args,
      removeBook: (_: unknown, { bookId }: { bookId: string }): { bookId: string } => ({ bookId }),
    },
  };
  
  export default resolvers;
  