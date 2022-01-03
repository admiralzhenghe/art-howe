import React, { useState, useEffect } from "react";
import "./style/Mosaic.css";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import Artwork from "./Artwork";
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context.js";
// GraphQL
import { GET_THUMBNAILS, GET_SEARCH_THUMBNAILS } from "../GraphQL/queries";
// Styled
import styled from "styled-components";

const StyledMosaicContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 50px;
  margin: 5px;
  position: relative;
`;

export default function Mosaic() {
  const [loading, setLoading] = useState(true);
  const [filteredThumbnailData, setFilteredThumbnailData] = useState([]);
  const [urls, setUrls] = useState([]);
  const [postInfo, setPostInfo] = useState({
    id: null,
    postTitle: null,
  });

  const { searchTerm, viewingArtwork, setViewingArtwork, viewingSearches } =
    useCustomContext();

  const { loading: thumbnailLoading, data: thumbnailData } = useQuery(
    !viewingSearches
      ? GET_THUMBNAILS("THUMBNAIL")
      : GET_SEARCH_THUMBNAILS("THUMBNAIL", searchTerm)
  );
  const { loading: mediumLoading, data: mediumData } = useQuery(
    !viewingSearches
      ? GET_THUMBNAILS("MEDIUM")
      : GET_SEARCH_THUMBNAILS("MEDIUM", searchTerm)
  );

  // Single event listener for event delegation
  // If an individual artwork is clicked, then show the artwork's detail
  const handleMouseClick = (e) => {
    let currentImage = e.target;
    if (currentImage.localName === "img") {
      setPostInfo({
        id: currentImage.id,
        postTitle: currentImage.dataset.title,
      });
      setViewingArtwork(true);
    }
  };

  // Create the data and URL needed to generate the mosaic of images
  useEffect(() => {
    if (!thumbnailLoading && !mediumLoading) {
      // Skip search results that are not "Posts"
      let tData = [];
      let tUrl = thumbnailData.posts.nodes.reduce((arr, post) => {
        if (post.featuredImage?.node.sourceUrl) {
          tData.push(post);
          arr.push(post.featuredImage?.node.sourceUrl);
        }
        return arr;
      }, []);
      let mUrl = mediumData.posts.nodes.reduce((arr, post) => {
        if (post.featuredImage?.node.sourceUrl)
          arr.push(post.featuredImage?.node.sourceUrl);
        return arr;
      }, []);
      // Populate both the data and URL arrays with the filtered data
      setFilteredThumbnailData(tData);
      setUrls([tUrl, mUrl]);
      setLoading(false);
    }
  }, [thumbnailLoading, mediumLoading]);

  if (loading || !thumbnailData) return <Spinner />;

  if (viewingArtwork) return <Artwork postInfo={postInfo} />;

  return (
    <>
      <div className="mosaic" onClick={handleMouseClick}>
        {filteredThumbnailData.map((post, idx) => {
          return (
            <StyledMosaicContainer key={post.id}>
              <img
                src={urls[0][idx]}
                alt={post.title}
                className="pixelated"
                id={post.id}
                data-title={post.title}
                key={post.id + "pixelated"}
              />
              <img
                src={urls[1][idx]}
                alt={post.title}
                className="regular"
                id={post.id}
                data-title={post.title}
                key={post.id + "regular"}
              />
            </StyledMosaicContainer>
          );
        })}
      </div>
    </>
  );
}
