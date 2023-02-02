// Components
import Mosaic from "./Mosaic";
import Spinner from "./Spinner";
// Apollo
import { useQuery } from "@apollo/client";
// GraphQL
import { GET_SEARCH_THUMBNAILS } from "../GraphQL/queries";
// Router
import { useParams } from "react-router-dom";
// Utils
import generateMosaicData from "../utils/generateMosaicData";

export default function SearchHandler() {
  const { query } = useParams();

  const { loading: searchThumbnailLoading, data: searchThumbnailData } =
    useQuery(GET_SEARCH_THUMBNAILS("THUMBNAIL", query));
  const { loading: searchMediumLoading, data: searchMediumData } = useQuery(
    GET_SEARCH_THUMBNAILS("MEDIUM", query)
  );

  if (searchThumbnailLoading || searchMediumLoading) return <Spinner />;
  if (!searchThumbnailLoading && !searchMediumLoading) {
    const data = generateMosaicData(searchThumbnailData, searchMediumData);
    if (!data.length) return <div className="not-found">No results found</div>;
    return <Mosaic data={data} />;
  }
}
