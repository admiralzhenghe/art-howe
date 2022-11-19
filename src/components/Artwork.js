import React, { useState, useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import ArtworkDetail from "./ArtworkDetail";
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context.js";
// GraphQL
import { GET_POST } from "../GraphQL/queries";
// ImageGallery
import ImageGallery from "react-image-gallery";
// Styled
import styled from "styled-components";

const StyledArtworkContainer = styled.div`
  display: flex;
  animation: animateArtwork var(--pageLoadAnimation);

  @keyframes animateArtwork {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media screen and (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;

const StyledImageGalleryContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
`;

const StyledBackButton = styled.div`
  cursor: pointer;
  margin-bottom: 1rem;

  &:hover {
    color: var(--orange);
  }
`;

export default function Artwork() {
  const { current, search, view } = useCustomContext();
  const [images, setImages] = useState();
  let { postId } = current.artwork;

  // GraphQL Query
  const { loading, data } = useQuery(GET_POST(postId));

  useEffect(() => {
    if (!loading) {
      setImages(
        data.mediaItems.edges.map((item) => ({
          original: item.node.mediaItemUrl,
        }))
      );
    }
  }, [loading]);

  if (loading || !images) return <Spinner />;
  const viewingSearch = search.query.length > 0;

  return (
    <>
      {/* If viewing a searched artwork, show option to return to search results */}
      {viewingSearch && (
        <StyledBackButton onClick={() => view.setViewing(view.type.MOSAIC)}>
          BACK TO SEARCH RESULTS
        </StyledBackButton>
      )}
      <StyledArtworkContainer>
        <StyledImageGalleryContainer>
          <ImageGallery
            items={images}
            showPlayButton={false}
            showThumbnails={false}
          />
        </StyledImageGalleryContainer>
        <ArtworkDetail data={data} />
      </StyledArtworkContainer>
    </>
  );
}
