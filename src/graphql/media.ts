import { gql } from "@apollo/client";

export const ADD_ARTWORK_MEDIA = gql`
  mutation AddArtworkMedia(
    $file: Upload!,
    $artworkId: Int!,
    $type: MediaType!
  ) {
    addArtworkMedia(addMediaInput: {
      file: $file,
      artworkId: $artworkId,
      type: $type
    }) {
      url
    }
  }
`;

export const GET_ARTWORK_MEDIA = gql`
  query GetArtworkMedia($artworkId: Int!) {
    artworkMedia(artworkId: $artworkId) {
      id
      url
      type
    }
  }
`;