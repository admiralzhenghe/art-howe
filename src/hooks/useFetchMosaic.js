import React, { useEffect, useRef, useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// GraphQL
import { GET_THUMBNAILS } from "../GraphQL/queries";
// Utils
import generateMosaicData from "../utils/generateMosaicData";

export function useFetchMosaic() {
  // Toggle mosaic shuffle
  const shuffleMosaic = useRef(true);

  const [data, setData] = useState([]);
  const { loading: thumbnailLoading, data: thumbnailData } = useQuery(
    GET_THUMBNAILS("THUMBNAIL")
  );
  const { loading: mediumLoading, data: mediumData } = useQuery(
    GET_THUMBNAILS("MEDIUM")
  );

  // Create the data and URL needed to generate the images mosaic
  useEffect(() => {
    if (!thumbnailLoading && !mediumLoading) {
      const filteredData = generateMosaicData(thumbnailData, mediumData);

      if (shuffleMosaic.current) {
        const getRandomInt = (max) => {
          return Math.floor(Math.random() * max);
        };
        const swap = (array, idx1, idx2) => {
          [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
        };
        // Fisher-Yates algorithm to generate a randomly ordered mosaic
        for (let i = filteredData.length - 1; i >= 0; i--) {
          let randomIdx = getRandomInt(i);
          swap(filteredData, i, randomIdx);
        }
      }
      setData(filteredData);
    }
  }, [thumbnailLoading, mediumLoading]);

  // return [loading, data]
  return [data.length ? false : true, data];
}
