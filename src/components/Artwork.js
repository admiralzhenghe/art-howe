import React from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import Spinner from "./Spinner";
// Router
import { Link } from "react-router-dom";
// Styled
import styled from "styled-components";

const StyledArtwork = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 100%;

  animation: animateArtwork 1s;
  @keyframes animateArtwork {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledImageContainer = styled.div`
  display: flex;
  flex: 1 1 1028px;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const StyledImage = styled.img`
  box-shadow: rgba(0, 0, 0, 0.4) 0px 5px 15px;
  max-width: 75%;

  animation: animateImage 1s;
  @keyframes animateImage {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    object-fit: contain;
  }
`;

const StyledDetail = styled.div`
  padding: 1rem;
  flex: 1 1 25rem;
`;

export default function Artwork({ artwork }) {
  const GET_POST_DETAIL = gql`
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

  const { error, loading, data } = useQuery(GET_POST_DETAIL);
  if (loading) return <Spinner />;

  return (
    <StyledArtwork>
      <StyledImageContainer>
        <StyledImage src={data.post.featuredImage.node.sourceUrl} />
      </StyledImageContainer>
      <StyledDetail>
        <div>{data.post.title}</div>
        <div>
          by{" "}
          {data.post.details.artist
            ? data.post.details.artist
            : "Unknown Artist"}
        </div>
        <h3>Exhibition</h3>
        <p>{data.post.details.exhibition}</p>
        <h3>Venue</h3>
        <p>{data.post.details.venue}</p>
        <h3>Date Seen</h3>
        <p>{data.post.details.dateSeen}</p>
        <h3>Tags</h3>

        {data.post.tags.edges.map((node) => (
          <Link key={node.node.tagId} style={{ padding: "0 5px" }} to="/">
            {node.node.name}
          </Link>
        ))}

        <h3>Link</h3>
        <a href={data.post.details.link}>{data.post.details.link}</a>
      </StyledDetail>
    </StyledArtwork>
  );
}
