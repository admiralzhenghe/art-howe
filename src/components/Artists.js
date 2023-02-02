import styled from "styled-components";
// Apollo
import { useQuery } from "@apollo/client";
import { GET_ALL_ARTISTS } from "../GraphQL/queries";
// Router
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  font-size: 1.25rem;
  animation: animateArtists var(--pageLoadAnimation);

  @keyframes animateArtists {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .artist {
    display: block;
    cursor: pointer;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }
`;

export default function Artists() {
  const { loading, data } = useQuery(GET_ALL_ARTISTS);
  if (loading) return <></>;

  // Remove duplicate artists using a set
  const set = new Set();
  data.posts.nodes.forEach((node) => {
    set.add(node.details.artist);
  });
  // Sort the artists in alphabetical order
  const cleanedData = [...set].sort();

  return (
    <StyledContainer>
      {cleanedData.map((artist, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{artist[0]}</b>}
          {idx > 0 && artist[0] !== cleanedData[idx - 1][0] && (
            <b>{artist[0]}</b>
          )}
          <Link to={"/search/" + encodeURIComponent(artist)} className="artist">
            {artist}
          </Link>
        </div>
      ))}
    </StyledContainer>
  );
}
