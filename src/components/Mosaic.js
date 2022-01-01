import React, { useState, useEffect } from "react";
import "./style/Mosaic.css";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import Artwork from "./Artwork";
import Spinner from "./Spinner";
// Queries
import { GET_THUMBNAILS, GET_MEDIUM_THUMBNAILS } from "../GraphQL/queries";
// Styled
import styled from "styled-components";

const StyledContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 50px;
  margin: 5px;
  position: relative;
`;

export default function Mosaic({ viewing, setViewing }) {
  const { loading: thumbnailLoading, data: thumbnailData } =
    useQuery(GET_THUMBNAILS);

  const { loading: mediumLoading, data: mediumData } = useQuery(
    GET_MEDIUM_THUMBNAILS
  );

  const [loading, setLoading] = useState(true);
  let [urls, setUrls] = useState([]);
  const [artwork, setArtwork] = useState(null);

  const handleMouseClick = (e) => {
    let currentImage = e.target;
    if (currentImage.localName === "img") {
      setArtwork(currentImage.id);
      setViewing(true);
    }
  };

  useEffect(() => {
    if (!thumbnailLoading && !mediumLoading) {
      let t = thumbnailData.posts.nodes.map(
        (post) => post.featuredImage.node.sourceUrl
      );
      let m = mediumData.posts.nodes.map(
        (post) => post.featuredImage.node.sourceUrl
      );
      setUrls([t, m]);
      setLoading(false);
    }
  }, [thumbnailLoading, mediumLoading]);

  if (loading) return <Spinner />;
  if (viewing) return <Artwork artwork={artwork} />;

  if (!viewing) {
    return (
      <div className="mosaic" onClick={handleMouseClick}>
        {thumbnailData.posts.nodes.map((post, idx) => {
          return (
            <StyledContainer key={post.id}>
              <img
                src={urls[0][idx]}
                alt=""
                className="pixelated"
                id={post.id}
                key={post.id + "pixelated"}
              />
              <img
                src={urls[1][idx]}
                alt=""
                className="regular"
                id={post.id}
                key={post.id + "regular"}
              />
            </StyledContainer>
          );
        })}
      </div>
    );
  }
}
