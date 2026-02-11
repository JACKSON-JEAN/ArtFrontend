import { gql } from "@apollo/client";

export const ADD_ARTWORK = gql`
  mutation AddArtwork($addArtworkInput: AddArtworkInput!) {
    addArtwork(addArtworkInput: $addArtworkInput) {
      id
      title
      description
      price
    }
  }
`;

// changes

export const GET_ARTWORK = gql`
  query GetArtwork($searchInput: SearchArtworkInput!) {
    getArtwork(searchInput: $searchInput) {
      artworks {
        id
        title
        description
        material
        category
        imageHash
        yearCreated
        culturalOrigin
        isUnique
        isAvailable
        isFeatured
        heightCm
        widthCm
        price
        currency
        media {
          id
          url
          type
        }
        artisan {
          fullName
          country
          biography
        }
        reviews {
          rating
        }
      }
      nextCursor
    }
  }
`;
export const GET_ADMIN_ARTWORK = gql`
  query GetArtwork($searchInput: SearchArtworkInput!) {
    getAdminArtwork(searchInput: $searchInput) {
      artworks {
        id
        title
        description
        material
        category
        imageHash
        yearCreated
        culturalOrigin
        isUnique
        isAvailable
        isFeatured
        heightCm
        widthCm
        price
        currency
        media {
          id
          url
          type
        }
        artisan {
          fullName
          country
          biography
        }
        reviews {
          rating
        }
      }
      nextCursor
    }
  }
`;

export const GET_ARTWORK_BYID = gql`
  query GetArtworkById($artworkId: Float!) {
    getArtworkById(artworkId: $artworkId) {
      id
      title
      description
      culturalOrigin
      material
      imageHash
      category
      yearCreated
      weightKg
      widthCm
      heightCm
      isAvailable
      isFeatured
      price
      currency
      media {
        id
        url
      }
    }
  }
`;

export const GET_NEW_ARRIVALS = gql`
  query {
    getNewArrivals {
      id
      title
      description
      category
      yearCreated
      culturalOrigin
      isUnique
      isAvailable
      isFeatured
      price
      currency
      media {
        url
      }
      artisan {
        fullName
        country
        biography
      }
      reviews {
        rating
      }
    }
  }
`;

export const EDIT_ARTWORK_MUTATION = gql`
  mutation UpdateArtwork(
    $artworkId: Float!
    $updateArtworkInput: UpdateArtworkInput!
  ) {
    updateArtwork(
      artworkId: $artworkId
      updateArtworkInput: $updateArtworkInput
    ) {
      title
      description
      category
      material
      widthCm
    }
  }
`;

export const DELETE_ARTWORK_MUTATION = gql`
  mutation DeleteArtwork($artworkId: Float!) {
    deleteArtwork(artworkId: $artworkId)
  }
`;
