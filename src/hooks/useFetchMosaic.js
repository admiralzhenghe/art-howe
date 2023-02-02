import { useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// GraphQL
import { GET_THUMBNAILS } from "../GraphQL/queries";
// Utils
import generateMosaicData from "../utils/generateMosaicData";

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
    // Shuffle the data
    filteredData.sort(() => 0.5 - Math.random());
    setData(filteredData);
  }

  // return [loading, data]
  return data === null ? [true, []] : [false, data];
}
