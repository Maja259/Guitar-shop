import { gql } from '@apollo/client'

export const FIND_UNIQUE_MODELS = gql`
    query FindUniqueModel($brandId: ID!, $modelId: ID!){
        findUniqueModel (brandId: $brandId, modelId: $modelId){
            name 
            id
            description
            image
            price
            type 
            specs {
                bodyWood
                bridge
                fingerboardWood
                neckWood
                pickups
                scaleLength
                tuners
            }
            musicians{
                bands
                musicianImage
                name
            }
        }
    }
`