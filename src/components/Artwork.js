import React from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import ArtworkDetail from "./ArtworkDetail";
import ImageGallery from "./ImageGallery";
import Spinner from "./Spinner";
// Queries
import { GET_POST_DETAIL } from "../GraphQL/queries";
// Styled
import styled from "styled-components";

const StyledArtworkContainer = styled.div`
  display: flex;
  grid-row: 3;
  overflow: hidden;
  animation: animateContainer 0.25s;

  @keyframes animateContainer {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;
    overflow: scroll;
  }
`;

const StyledImageGalleryContainer = styled.div`
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
`;

export default function Artwork({ artwork }) {
  const { error, loading, data } = useQuery(GET_POST_DETAIL(artwork));

  if (loading) return <Spinner />;

  return (
    <StyledArtworkContainer>
      <StyledImageGalleryContainer>
        <ImageGallery imageUrl={data.post.featuredImage.node.sourceUrl} />
      </StyledImageGalleryContainer>
      <ArtworkDetail data={data} />
    </StyledArtworkContainer>
  );
}
