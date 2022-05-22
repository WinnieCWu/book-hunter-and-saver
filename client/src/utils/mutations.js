import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation loginUser($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
            }
        }
    }
`;

export const ADD_USER = gql `
 mutation addUser($username:String!, $email: String!, $password: String!) {
     addUser(username: $username, email: $email, password: $password) {
         token
         user {
             _id
         }
     }
 }
`;

export const SAVE_BOOK = gql `
 mutation saveBook ($book: book {$author:[String], $description:String!, $bookId: String!, $image: String, link: String, title:String!) {
   saveBook(book: $book) {
      user {
        _id
        username
        email
        bookCount
        savedBooks 
      } 
   }
 }
`;

export const REMOVE_BOOK = gql `
  mutation removeBook (bookId: String!) {
      removeBook (bookId: $bookId) {
        user {
            _id
            username
            email
            bookCount
            savedBooks 
          } 
      }
  }
`;
