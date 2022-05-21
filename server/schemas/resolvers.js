const { AuthenticationError } = require('apollo-server-express');
const { Book, User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        books: async () => {
            return await Book.find();
        }, 
    //   book: async (parent, { title, author, description}) = {
    //     const params = {};
    //     if (title) {
    //        params.title = title;
    //     } 
    //     if (author) {
    //         params.author = author;
    //     }
    //     if (description) {
    //         params.description = description;
    //     }
    //     return await Book.find(params).populate('book');
    //   },
      user: async (parent, args, context) => {
          if(context.user) {
            const user = await User.findById(context.user._id).populate({
                populate: 'book'
            })
            return user;
        }
        throw new AuthenticationError('Not logged in')
      }      
    },
    Mutation: {
        addUser: async (parent, args) => {
            // const user = 
        }
    }
};

module.exports = resolvers;
