export const typeDefs = `
type Task {
    id: ID!
    name: String
}

type Query {
    tasks: [Task]
}
`;
