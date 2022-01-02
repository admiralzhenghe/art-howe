import { gql } from "@apollo/client";

export const GET_THUMBNAILS = gql`
  {
    posts(first: 100000) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        id
        title
      }
    }
  }
`;

export const GET_MEDIUM_THUMBNAILS = gql`
  {
    posts(first: 100000) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: MEDIUM)
          }
        }
        id
        title
      }
    }
  }
`;

export const GET_POST_DETAIL = (id) => gql`
  {
  post(id: "${id}") {
    title
    tags {
      edges {
        node {
          name
          tagId
        }
      }
    }
    details {
      artist
      dateSeen
      exhibition
      link
      venue
    }
  }
}`;

export const GET_POST_IMAGES = (title) => gql`
  {
    mediaItems(
      where: { orderby: { field: TITLE, order: ASC }, search: "${title}" }
      first: 100000
    ) {
      edges {
        node {
          parentId
          sourceUrl(size: _2048X2048)
          title
        }
      }
    }
  }
`;
