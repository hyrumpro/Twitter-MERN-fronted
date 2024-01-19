import { gql } from "@apollo/client";


export const NEW_USER = gql`
     mutation addUser($input: UserInput) {
         newUser(input: $input) {
             username
             email
         }
     }
`;


export const LOGIN = gql`
    mutation loggin($input: LoginInput) {
        authentication(input: $input) {
            token
        }
    }
`;
