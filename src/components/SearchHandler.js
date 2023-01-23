import Mosaic from "./Mosaic";
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

  if (!searchThumbnailLoading && !searchMediumLoading) {
    const mosaicData = generateMosaicData(
      searchThumbnailData,
      searchMediumData
    );
    if (!mosaicData.length) {
      return <div className="not-found">No results found</div>;
    } else return <Mosaic mosaicData={mosaicData} />;
  } else return <></>;
}
