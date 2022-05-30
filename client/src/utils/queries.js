import { gql } from '@apollo/client';

export const GET_ME = gql `
    {
        me {
            _id
            username
            email
            bookCount
            SavedBookInput {
                authors
                description
                bookId
                image
                link
                title
                forSale
            }
        }
    }
`;