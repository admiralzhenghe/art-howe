import { useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// GraphQL
import { GET_ALL_ARTISTS, GET_ALL_CATEGORIES } from "../GraphQL/queries";

export function useFetchFilters() {
  const [data, setData] = useState(null);

  const { loading: artistsLoading, data: artistsData } =
    useQuery(GET_ALL_ARTISTS);

  const { loading: categoriesLoading, data: categoriesData } =
    useQuery(GET_ALL_CATEGORIES);

  if (!artistsLoading && !categoriesLoading && !data) {
    // Remove duplicate artists using a set
    const set = new Set();
    artistsData.posts.nodes.forEach((node) => {
      set.add(node.details.artist);
    });
    // Sort the artists in alphabetical order
    const filteredArtistsData = [...set].sort();
    setData([filteredArtistsData, categoriesData]);
  }
  // return [loading, data]
  return data === null ? [true, []] : [false, data];
}
