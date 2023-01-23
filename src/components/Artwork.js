import styled from "styled-components";
import { useState, useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import ArtworkDetail from "./ArtworkDetail";
import Skeleton from "./Skeleton";
// GraphQL
import { GET_POST } from "../GraphQL/queries";
// Image Gallery
import ImageGallery from "react-image-gallery";
// Router
import { useParams } from "react-router-dom";

const StyledArtwork = styled.div`
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

export default function Artwork() {
  const { id } = useParams();
  const [images, setImages] = useState(null);

  // GraphQL Query
  const { loading, data } = useQuery(GET_POST(id));

  useEffect(() => {
    if (!loading && !images) {
      const imagesArray = data.mediaItems.edges.map((item) => ({
        original: item.node.mediaItemUrl,
      }));

      // Preload the images
      let toLoad = imagesArray.length;
      imagesArray.forEach((image) => {
        const img = new Image();
        img.src = image.original;
        img.onload = () => {
          toLoad--;
          if (!toLoad) setImages(imagesArray);
        };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, images]);

  if (loading) return <></>;
  return (
    <>
      <StyledArtwork>
        <div className="gallery-container">
          {!images || !images.length ? (
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
      </StyledArtwork>
    </>
  );
}
