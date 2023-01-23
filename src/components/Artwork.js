import React, { useState, useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import ArtworkDetail from "./ArtworkDetail";
import Skeleton from "./Skeleton";
// Context
import { useCustomContext } from "../context/Context.js";
// GraphQL
import { GET_POST } from "../GraphQL/queries";
// React-Image_Gallery
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

  .gallery-container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1 1 100%;
  }

  @media screen and (max-width: 768px) {
    display: block;
    text-align: center;
  }
`;

const StyledBackButton = styled.div`
  cursor: pointer;
  display: inline-block;
  margin-bottom: 1rem;

  &:hover {
    color: var(--orange);
  }
`;

export default function Artwork() {
  const { current, search, view } = useCustomContext();
  const [images, setImages] = useState(null);
  const [imagesLoading, setImagesLoading] = useState(true);

  // GraphQL Query
  const { loading, data } = useQuery(GET_POST(current.artwork.postId));

  useEffect(() => {
    if (!loading) {
      setImages(
        data.mediaItems.edges.map((item) => ({
          original: item.node.mediaItemUrl,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (images && imagesLoading) {
      let toLoad = images.length;
      images.forEach((image) => {
        const img = new Image();
        img.src = image.original;
        img.onload = () => {
          toLoad--;
          if (!toLoad) setImagesLoading(false);
        };
      });
    }
  }, [images]);

  if (loading) return <div></div>;
  const viewingSearch = search.query.length > 0;

  return (
    <>
      {/* If viewing a searched artwork, show option to return to search results */}
      {viewingSearch && (
        <StyledBackButton onClick={() => view.setViewing(view.type.MOSAIC)}>
          <i class="fa-solid fa-arrow-left-long"></i>
        </StyledBackButton>
      )}
      <StyledArtworkContainer>
        <div className="gallery-container">
          {imagesLoading ? (
            <Skeleton />
          ) : (
            <ImageGallery
              items={images}
              showPlayButton={false}
              showThumbnails={false}
            />
          )}
        </div>
        <ArtworkDetail data={data} />
      </StyledArtworkContainer>
    </>
  );
}
