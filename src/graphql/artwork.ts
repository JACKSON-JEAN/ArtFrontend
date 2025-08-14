import { gql } from "@apollo/client";

export const ADD_ARTWORK = gql`
mutation AddArtwork($addArtworkInput: AddArtworkInput!) {
  addArtwork(addArtworkInput: $addArtworkInput){
    id
    title
    description
    price
  }
}
`

export const GET_ARTWORK = gql`
query GetArtwork($searchInput: SearchArtworkInput!){
  getArtwork(searchInput: $searchInput){
    id
    title
    description,
    material,
    category,
    yearCreated,
    culturalOrigin,
    isUnique,
    isAvailable,
    isFeatured,
    heightCm,
    widthCm,
    price,
    currency,
    media{
      id,
      url,
      type
    }
    artisan{
      fullName
      country
      biography
    }
    reviews{
      rating
    }
  }
}
`

export const GET_ARTWORK_BYID = gql`
query GetArtworkById($artworkId: Float!){
  getArtworkById(artworkId: $artworkId){
    id
    title
    description
    culturalOrigin
    material
    category
    yearCreated
    weightKg
    widthCm
    heightCm
    isAvailable
    price
    media{
      id
      url
    }
  }
}
`

export const GET_NEW_ARRIVALS = gql`
query {
  getNewArrivals {
    id
    title
    description,
    category,
    yearCreated,
    culturalOrigin,
    isUnique,
    isAvailable,
    isFeatured,
    price,
    currency,
    media{
      url
    }
    artisan{
      fullName
      country
      biography
    }
    reviews{
      rating
    }
  }
}
`