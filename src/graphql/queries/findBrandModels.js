import { gql } from '@apollo/client';

export const FIND_BRAND_MODELS = gql`
    query findBrandModels($id: ID!, $sortBy: sortBy!){
        findBrandModels(id: $id, sortBy: $sortBy) {
            id
            name
            type 
            image
            price
        }
    }
`;
