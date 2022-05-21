const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        books: async () = {
            return await Book.find();
        }, 
      book: async (parent, { title, author, description}) = {
        const params = {};
        if (title) {
           params.title = title;
        } 
        if (author) {
            params.author = author;
        }
        if (description) {
            params.description = description;
        }
        return await Book.find(params).populate('book');
      },
      user: async () = {

      }      
    },
    Mutation: {

    }
};

module.exports = resolvers;
