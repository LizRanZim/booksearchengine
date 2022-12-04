// Using lesson 21-26 as base code for this

const { AuthenticationError } = require('apollo-server-express');
const { User, bookSchema } = require('../models');
const { signToken } = require('../utils/auth');



const resolvers = {
    Query: {
        users: async () => {
            return User.find().populate('savedBooks');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username }).populate('savedBooks');
        },
        books: async (parent, { username }) => {
            const params = username ? { username } : {};
            return bookSchema.find(params).sort({ createdAt: -1 });
        },
        book: async (parent, { bookId }) => {
            return bookSchema.findOne({ _id: bookId });
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('savedBooks');
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        // ** Not required in Acceptance Criteria, removed for now
        // addBook: async (parent, { bookText }, context) => {
        //     if (context.user) {
        //         const book = await Book.create({
        //             bookText,
        //             bookAuthor: context.user.username,
        //         });

        //         await User.findOneAndUpdate(
        //             { _id: context.user._id },
        //             { $addToSet: { books: book._id } }
        //         );

        //         return book;
        //     }
        //     throw new AuthenticationError('You need to be logged in!');
        // },

  
        saveBook: async (parent, { savedBooks }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id }, //userId?
                    { $addToSet: { savedBooks: body } },
                    { new: true, runValidators: true }
                );

             return updatedUser;

            }
            throw new AuthenticationError('You need to be logged in!');
        },

        // ***Liz comment - this might work? not sure if something else needed here besides bookId
        removeBook: async (parent, { savedBooks }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: user._id },
                    { $pull: { savedBooks: params.bookId } },
                    { new: true }
                );

                return updatedUser;    

        // ***Liz comment -  $pull operator removes from an existing array all instances of a value or values that match a specified condition. 
                
            }
            throw new AuthenticationError("Couldn't find user with this id");
        },
    },
};

module.exports = resolvers;
