import {gql} from '@apollo/client'

export const FIND_UNIQUE_BRAND = gql`
    query findUniqueBrand($id: ID!){
        findUniqueBrand(id: $id){
#            id
#            categories
#            image
            name 
#            origin
        }
    }
`