import { useEffect, useState } from "react";
// Apollo
import { useQuery } from "@apollo/client";
// GraphQL
import { GET_ALL_ARTISTS, GET_ALL_CATEGORIES } from "../graphql/queries";

export function useFetchFilters() {
  const [data, setData] = useState([]);

  const { loading: artistsLoading, data: artistsData } =
    useQuery(GET_ALL_ARTISTS);

  const { loading: categoriesLoading, data: categoriesData } =
    useQuery(GET_ALL_CATEGORIES);

  useEffect(() => {
    if (!artistsLoading && !categoriesLoading) {
      // Remove duplicate artists using a set
      const set = new Set();
      artistsData.posts.nodes.forEach((node) => {
        set.add(node.details.artist);
      });
      // Sort the artists in alphabetical order
      const filteredArtistsData = [...set].sort();
      setData([filteredArtistsData, categoriesData]);
    }
  }, [artistsLoading, categoriesLoading]);

  // return [loading, data]
  return [data.length ? false : true, data];
}
