import {gql} from '@apollo/client';

export const GET_BRANDS = gql`
    query getAllBrands{
        findAllBrands{
            id
            name 
            origin
            categories
            image
        }
    }
`
