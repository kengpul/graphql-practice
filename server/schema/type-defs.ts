import { gql } from "apollo-server";

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User]
        favoriteMovies: [Movie]
    }

    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: UsersResponse
        user(id: ID!): User!
        movies: [Movie!]!
        movie(name: String!): Movie
    }

    input CreateUser {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = Irish
    }

    input UpdateUser {
        id: ID!
        newUsername: String!
    }

    type Mutation {
        createUser(input: CreateUser!): User!
        updateUser(input: UpdateUser!): User
        deleteUser(id: ID!): User
    }

    enum Nationality {
        American
        Canadian
        Mexican
        Japanese
        Irish
    }

    type UsersResult {
        users: [User!]!
    }
    type UsersError {
        message: String!
    }

    union UsersResponse = UsersResult | UsersError
`;

export default typeDefs;