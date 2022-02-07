import React, { useState, useEffect, useRef } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Components
import Artwork from "./Artwork";
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context.js";
// GraphQL
import { GET_THUMBNAILS, GET_SEARCH_THUMBNAILS } from "../GraphQL/queries";
// Style
import styled from "styled-components";
import "./style/Mosaic.css";

const StyledMosaicContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 50px;
  margin: 5px;
  position: relative;
`;

export default function Mosaic() {
  const {
    searchTerm,
    viewingArtwork,
    viewingSearches,
    setViewingArtwork,
    setCurrentArtwork,
  } = useCustomContext();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  // Toggle mosaic shuffle
  const shuffleMosaic = useRef(true);

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
  // If a specific artwork is clicked, then show the artwork's detail
  const handleMosaicClick = (e) => {
    let currentImage = e.target;
    if (currentImage.localName === "img") {
      setCurrentArtwork({
        id: currentImage.id,
        postTitle: currentImage.dataset.title,
      });
      setViewingArtwork(true);
    }
  };

  // Create the data and URL needed to generate the images mosaic
  useEffect(() => {
    if (!thumbnailLoading && !mediumLoading) {
      // Place post data, thumbnail URL and medium image URL into a single object
      // Skip search results that are not "Posts"
      let data = thumbnailData.posts.nodes.reduce((arr, post, idx) => {
        if (post.featuredImage?.node.sourceUrl) {
          arr.push({
            post,
            thumbnail: post.featuredImage.node.sourceUrl,
            medium: mediumData.posts.nodes[idx].featuredImage.node.sourceUrl,
          });
        }
        return arr;
      }, []);

      if (shuffleMosaic.current) {
        const getRandomInt = (max) => {
          return Math.floor(Math.random() * max);
        };
        const swap = (array, idx1, idx2) => {
          [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        };
        // Fisher-Yates algorithm to generate a randomly ordered mosaic
        for (let i = data.length - 1; i >= 0; i--) {
          let randomIdx = getRandomInt(i);
          swap(data, i, randomIdx);
        }
      }
      setData(data);
      setLoading(false);
    }
  }, [thumbnailLoading, mediumLoading]);

  if (loading || !thumbnailData || !mediumData) return <Spinner />;

  if (viewingArtwork) return <Artwork />;

  return (
    <>
      <div className="mosaic" onClick={handleMosaicClick}>
        {data.map((dataSet) => {
          return (
            <StyledMosaicContainer key={dataSet.post.id}>
              <img
                src={dataSet.thumbnail}
                alt={dataSet.post.title}
                className="pixelated"
                id={dataSet.post.id}
                data-title={dataSet.post.title}
              />
              <img
                src={dataSet.medium}
                alt={dataSet.post.title}
                className="regular"
                id={dataSet.post.id}
                data-title={dataSet.post.title}
              />
            </StyledMosaicContainer>
          );
        })}
      </div>
    </>
  );
}
