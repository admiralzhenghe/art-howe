import { gql } from "@apollo/client";

export const GET_THUMBNAILS = gql`
  {
    posts(first: 10000) {
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

export const GET_POST_DETAIL = (artwork) => gql`
  {
  post(id: "${artwork}") {
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
    featuredImage {
      node {
        sourceUrl(size: _2048X2048)
      }
    }
  }
}`;
