import { gql } from "@apollo/client";

export const GET_THUMBNAILS = (size) => gql`
  {
    posts(first: 999999) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: ${size})
          }
        }
        postId
        title
      }
    }
  }
`;

export const GET_POST = (id) => gql`
  {
  post(id: "${id}", idType: DATABASE_ID) {
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
      year
    }
  }
  mediaItems(where: {parent: "${id}", orderby: {field: TITLE, order: ASC}}) {
    edges {
      node {
        id
        mediaItemUrl
      }
    }
  }
}`;

// Search queries
export const GET_SEARCH_THUMBNAILS = (size, searchTerm) => gql`
  {
    posts(first: 999999, where: {search: "${searchTerm}"}) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: ${size})
          }
        }
        postId
        title
      }
    }
  }
`;

// Artist queries
export const GET_ALL_ARTISTS = gql`
  {
    posts(first: 999999) {
      nodes {
        details {
          artist
        }
      }
    }
  }
`;

// Category queries
export const GET_ALL_CATEGORIES = gql`
  {
    tags(first: 9999999) {
      nodes {
        name
      }
    }
  }
`;
