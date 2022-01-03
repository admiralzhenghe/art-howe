import React, { useState, useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import ArtworkDetail from "./ArtworkDetail";
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context.js";
// GraphQL
import { GET_POST_DETAIL, GET_POST_IMAGES } from "../GraphQL/queries";
// ImageGallery
import ImageGallery from "react-image-gallery";
// Styled
import styled from "styled-components";

const StyledArtworkContainer = styled.div`
  display: flex;
  grid-row: auto;
  overflow: hidden;
  animation: animateImage 0.25s;

  @keyframes animateImage {
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

export default function Artwork({ postInfo }) {
  const { id, postTitle } = postInfo;
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [galleryLoading, setGalleryLoading] = useState(true);

  const { setViewingArtwork, viewingSearches } = useCustomContext();

  // Query API
  const { loading: postLoading, data: postData } = useQuery(
    GET_POST_DETAIL(id)
  );
  const { loading: imagesLoading, data: imagesData } = useQuery(
    GET_POST_IMAGES(postTitle)
  );

  useEffect(() => {
    if (!imagesLoading) {
      // Filter out images with similar titles but do not belong to the same post
      let filtered = imagesData.mediaItems.edges.filter((image) => {
        if (image.node.parentId === id) return image.node.sourceUrl;
      });
      // Extract image URLs only
      let extracted = filtered.map((image) => ({
        original: image.node.sourceUrl,
      }));
      setImages(extracted);
    }
  }, [imagesLoading]);

  // Once the images array is created set loading to false
  useEffect(() => {
    if (!postLoading && images.length) {
      setLoading(false);
    }
  }, [postLoading, images]);

  // Show a loading spinner until the gallery has loaded
  const handleImageLoad = () => {
    setGalleryLoading(false);
  };

  if (loading) return <Spinner />;

  return (
    <>
      {/* If viewing a searched artwork, show an option to return to the search results */}
      {viewingSearches && (
        <StyledBackButton onClick={() => setViewingArtwork(false)}>
          BACK TO SEARCH RESULTS
        </StyledBackButton>
      )}
      <StyledArtworkContainer>
        <StyledImageGalleryContainer>
          {galleryLoading && <Spinner />}
          <ImageGallery
            items={images}
            onImageLoad={handleImageLoad}
            showPlayButton={false}
            showThumbnails={false}
          />
        </StyledImageGalleryContainer>
        <ArtworkDetail data={postData} />
      </StyledArtworkContainer>
    </>
  );
}
