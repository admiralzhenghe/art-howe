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
  const { current, search, view } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  let { id, postTitle } = current.artwork;

  // Error prevention because WordPress auto converts hyphens to en dashes
  postTitle = postTitle.replace("–", "-");
  // Error prevention because WordPress auto converts charCode 39 to charCode 8217
  postTitle = postTitle.replace("’", "'");
  // Error prevention because quotation marks return query error
  postTitle = postTitle.replace(/[“”]+/g, "");

  // GraphQL Query
  const { loading: postLoading, data: postData } = useQuery(
    GET_POST_DETAIL(id)
  );
  const { loading: imagesLoading, data: imagesData } = useQuery(
    GET_POST_IMAGES(`${postTitle}`)
  );

  useEffect(() => {
    if (!postLoading && !imagesLoading) {
      console.log(postTitle, current, postData, imagesData);
      // Filter out images with similar titles but do not belong to the same post
      const filtered = imagesData.mediaItems.edges.filter(
        (image) => image.node.parentId === id
      );
      // Extract image URLs only
      const extracted = filtered.map((image) => ({
        original: image.node.sourceUrl,
      }));
      setImages(extracted);
      setLoading(false);
    }
  }, [postLoading, imagesLoading]);

  if (loading) return <Spinner />;
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
        <ArtworkDetail data={postData} />
      </StyledArtworkContainer>
    </>
  );
}
