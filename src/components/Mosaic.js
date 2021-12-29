import React, { useState } from "react";
import "./style/Mosaic.css";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import Artwork from "./Artwork";
import Spinner from "./Spinner";
// Queries
import { GET_THUMBNAILS } from "../GraphQL/queries";
// Styled
import styled from "styled-components";

const StyledMosaic = styled.div`
  @media screen and (max-width: 480px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
`;

const StyledImage = styled.img`
  box-shadow: rgba(0, 0, 0, 0.5) 0px 3px 8px;
  cursor: pointer;
  flex-wrap: wrap;
  height: 50px;
  width: 50px;
  margin: 10px;
`;

export default function Mosaic({ viewing, setViewing }) {
  const { error, loading, data } = useQuery(GET_THUMBNAILS);
  const [artwork, setArtwork] = useState(null);

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
      <StyledMosaic onClick={handleMouseClick}>
        {data.posts.nodes.map((post) => {
          return (
            <StyledImage
              className="mosaic"
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
