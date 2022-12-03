// Using lesson 21-25 and 21-26 as base code for this

const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Book]!
    }


type Auth {
    token: ID!
    profile: User
    }

type Author {
    name: String
    }

type Book {
    id: ID!
    bookID: String!
    title: String!
    authors: [Author]
    description: String!
    image: String #probably shouldn't be a string
    link: String #probably shouldn't be a string
    }

# For type defs See this resource > https://stackoverflow.com/questions/51517363/graphql-how-to-design-input-type-when-there-are-add-and-update-mutation

# Also this > https://stackoverflow.com/questions/66750047/how-do-i-accept-an-array-of-strings-using-apollo-server-and-gql


 # ***start not required 
# input AddBookInput {
#     title: String! #just the title is required
#     author: String
#     description: String
#     bookId: String
#     image: String #probably shouldn't be a string
#     link: String #probably shouldn't be a string
#   }

# input UpdateBookInput {
#     id: String #just the id is required because its the selector
#     title: String 
#     author: String
#     description: String
#     bookId: String
#     image: String #probably shouldn't be a string
#     link: String #probably shouldn't be a string

# }
# ***end not required

input SaveBookInput {
    id: String 
    title: String 
    author: String
    description: String
    bookId: String! #just the bookId is required because its the selector
    image: String #probably shouldn't be a string
    link: String #probably shouldn't be a string
    }



# ***start not required 
#   type AddBookPayload {
#     book: Book!
#   }

#   type UpdateBookPayload {
#     book: Book!
#   }
 # ***end not required 

type SaveBookPayload {
    book: Book!
    # somehow need to update the SavedBooks for a user here
    }


# Because we have the context functionality in place to check a JWT and decode its data, we can use a query that will always find and return the logged in user's data

# Do we need to pass any book data in below?
type Query {
    users: [User]
    user(username: String!): User
    me: User
    books: [Book!]!
  }


type Mutation {
    login(email: String!, password: String!): Auth
    
    addUser(username: String!, email: String!, password: String!): Auth
    
    saveBook(input: SaveBookInput): SaveBookPayload!

    # start not required 
    # addBook(input: AddBookInput!): AddBookPayload!
    # updateBook(input: UpdateBookInput!): UpdateBookPayload!
    # end not required

    removeBook(bookId: ID!): User
    }





`;

module.exports = typeDefs;
