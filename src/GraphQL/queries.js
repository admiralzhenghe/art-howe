import { gql } from "@apollo/client";

export const GET_THUMBNAILS = (size) => gql`
  {
    posts(first: 100000) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: ${size})
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

// Search queries

export const GET_SEARCH_THUMBNAILS = (size, searchTerm) => gql`
  {
    posts(first: 100000, where: {search: "${searchTerm}"}) {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: ${size})
          }
        }
        id
        title
      }
    }
  }
`;

// Tag queries

export const GET_ALL_TAGS = gql`
  {
    tags(first: 9999999) {
      nodes {
        name
      }
    }
  }
`;
