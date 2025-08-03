import {gql} from '@apollo/client'

export const SEARCH_MODEL = gql`
    query searchModels($brandId: ID!, $name: name!){
        searchModels(brandId: $brandId, name: $name){
            id
            description
            image
            name 
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
        }
    }
`