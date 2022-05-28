const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        _id: ID
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [{Book}]            
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        loginUser(email: String!, password: String!): Auth
        saveBook(book: Book): User
        removeBook(bookId: String!): User 
    }
`;

module.exports = typeDefs;