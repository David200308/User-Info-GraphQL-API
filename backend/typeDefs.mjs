import { gql } from 'apollo-server';

export const typeDefs = gql`

    type User {
        id: ID
        name: String
        email: String
        password: String
    }

    input UserInput {
        name: String
        email: String
        password: String
    }

    type Query {
        getAllUsers: [User]
        getUserByEmail(email: String): User
        getUserByName(name: String): User
        getUserById(id: ID): User
        checkName(name: String): Boolean
        checkEmail(email: String): Boolean
    }

    type Mutation {
        createUser(user: UserInput): User
        deleteUser(id: ID): String
    }
`;
