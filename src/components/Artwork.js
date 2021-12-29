import React, { useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import ImageGallery from "./ImageGallery";
import Spinner from "./Spinner";
// Router
import { Link } from "react-router-dom";
// Queries
import { GET_POST_DETAIL } from "../GraphQL/queries";
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

const StyledImageGalleryContainer = styled.div`
  display: flex;
  flex: 1 1 1028px;
  justify-content: center;

  @media screen and (max-width: 768px) {
    flex-basis: 100%;
  }
`;

const StyledDetail = styled.div`
  padding: 1rem;
  flex: 1 1 25rem;
  animation: animateDetail 0.2s;

  @keyframes animateDetail {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 480px) {
    font-size: 6px;
  }
`;

export default function Artwork({ artwork }) {
  const { error, loading, data } = useQuery(GET_POST_DETAIL(artwork));
  const [imageGalleryLoaded, setimageGalleryLoaded] = useState(false);

  if (loading) return <Spinner />;

  return (
    <StyledArtwork>
      <StyledImageGalleryContainer>
        <ImageGallery
          imageUrl={data.post.featuredImage.node.sourceUrl}
          setimageGalleryLoaded={setimageGalleryLoaded}
        />
      </StyledImageGalleryContainer>
      {imageGalleryLoaded && (
        <StyledDetail>
          <b>{data.post.title}</b>
          <div>
            by{" "}
            {data.post.details.artist
              ? data.post.details.artist
              : "Unknown Artist"}
          </div>
          <br />
          <b>Exhibition</b>
          <div>{data.post.details.exhibition}</div>
          <br />
          <b>Venue</b>
          <div>{data.post.details.venue}</div>
          <br />
          <b>Date Seen</b>
          <div>{data.post.details.dateSeen}</div>
          <br />
          <b>Tags</b>
          <br />
          {data.post.tags.edges.map((node) => (
            <Link key={node.node.tagId} style={{ padding: "0 5px" }} to="/">
              {node.node.name}
            </Link>
          ))}
          <br />
          <br />
          <b>Link</b>
          <br />
          <a href={data.post.details.link}>{data.post.details.link}</a>
        </StyledDetail>
      )}
    </StyledArtwork>
  );
}
