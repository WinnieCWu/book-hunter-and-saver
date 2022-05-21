const {gql} = require('apollo-server-express');

const typeDefs = gql`
    type Book {
        author: String
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

    type User {
        username: String!
        email: String!
        password: String!
        savedBooks: [bookSchema]            
    }
`;

module.exports = typeDefs;