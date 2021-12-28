import React, { useState } from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Components
import Artwork from "./Artwork";
import Spinner from "./Spinner";
// Router
// import { Link } from "react-router-dom";
// Styled
import styled from "styled-components";

const StyledMosaic = styled.div``;

const StyledImage = styled.img`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  cursor: pointer;
  flex-wrap: wrap;
  height: 50px;
  width: 50px;
  margin: 10px;
`;

const GET_THUMBNAILS = gql`
  {
    posts {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        id
        title
      }
    }
  }
`;

export default function Mosaic({ viewing, setViewing }) {
  const { error, loading, data } = useQuery(GET_THUMBNAILS);
  const [artwork, setArtwork] = useState(null);

  const handleMouseOver = (e) => {
    let currentImage = e.target;
    if (currentImage.localName === "img") {
      // console.log(currentImage.id);
    }
  };

  const handleMouseClick = (e) => {
    let currentImage = e.target;
    if (currentImage.localName === "img") {
      setArtwork(currentImage.id);
      setViewing(true);
    }
  };

  if (loading) return <Spinner />;
  if (viewing) return <Artwork artwork={artwork} />;

  if (!viewing) {
    return (
      <StyledMosaic onMouseOver={handleMouseOver} onClick={handleMouseClick}>
        {data.posts.nodes.map((post) => {
          return (
            <StyledImage
              key={post.id}
              id={post.id}
              src={post.featuredImage.node.sourceUrl}
              alt=""
            />
          );
        })}
      </StyledMosaic>
    );
  }
}
