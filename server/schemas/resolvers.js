const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      me: async (parent, args, context) => {
        if (context.user) {
      
        const token = signToken(user);
            return {token, user};
        }
        throw new AuthenticationError('Not logged in');
      }      
    },
    Mutation: {
        loginUser: async (parent, {email,password}) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, {user, body}, context) => {
           if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
      
                  { _id: user._id },
                  { $addToSet: { savedBooks: body } },
                  { new: true, runValidators: true }
                );
                return updatedUser; 
              } 
            throw new AuthenticationError('You need to be logged in!');
            },
        removeBook: async (parent, {user, params}) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookId: params.bookId } } },
                { new: true }
              );
              
              return updatedUser;
        }
    }
};

module.exports = resolvers;
