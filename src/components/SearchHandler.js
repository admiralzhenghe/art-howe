import React, { useEffect } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// Context
import { useCustomContext } from "../context/Context.js";
// GraphQL
import { GET_SEARCH_THUMBNAILS } from "../GraphQL/queries";
// Utils
import generateMosaicData from "../utils/generateMosaicData";

export default function SearchHandler() {
  const { search } = useCustomContext();

  const { loading: searchThumbnailLoading, data: searchThumbnailData } =
    useQuery(GET_SEARCH_THUMBNAILS("THUMBNAIL", search.query));
  const { loading: searchMediumLoading, data: searchMediumData } = useQuery(
    GET_SEARCH_THUMBNAILS("MEDIUM", search.query)
  );

  useEffect(() => {
    search.setLoading(true);
  }, [search.query]);

  useEffect(() => {
    if (!searchThumbnailLoading && !searchMediumLoading) {
      const filteredData = generateMosaicData(
        searchThumbnailData,
        searchMediumData
      );
      search.setData(filteredData);
      search.setLoading(false);
    }
  }, [searchThumbnailLoading, searchMediumLoading]);

  return null;
}
