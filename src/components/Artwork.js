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
  const { currentArtwork, viewingSearches, setViewingArtwork } =
    useCustomContext();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  let { id, postTitle } = currentArtwork;

  // Error prevention because WordPress auto converts hyphens to en dashes
  postTitle = postTitle.replace('–', '-');
  // Error prevention because WordPress auto converts charCode 39 to charCode 8217
  postTitle = postTitle.replace("’", "'");

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
          <ImageGallery
            items={images}
            showPlayButton={false}
            showThumbnails={false}
          />
        </StyledImageGalleryContainer>
        <ArtworkDetail data={postData} />
      </StyledArtworkContainer>
    </>
  );
}
