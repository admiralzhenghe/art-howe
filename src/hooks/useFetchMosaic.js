import { useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// GraphQL
import { GET_THUMBNAILS } from "../GraphQL/queries";
// Utils
import generateMosaicData from "../utils/generateMosaicData";

const shuffleMosaic = true;

export function useFetchMosaic() {
  const [data, setData] = useState(null);
  const { loading: thumbnailLoading, data: thumbnailData } = useQuery(
    GET_THUMBNAILS("THUMBNAIL")
  );
  const { loading: mediumLoading, data: mediumData } = useQuery(
    GET_THUMBNAILS("MEDIUM")
  );

  if (!thumbnailLoading && !mediumLoading && !data) {
    // Create the data and URL needed to generate the images mosaic
    const filteredData = generateMosaicData(thumbnailData, mediumData);

    if (shuffleMosaic) {
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

  // return [loading, data]
  return data === null ? [true, []] : [false, data];
}
