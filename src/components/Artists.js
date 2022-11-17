import React from "react";
// Component
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

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
    cursor: pointer;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }
`;

export default function Artists() {
  const { data, search, view } = useCustomContext();

  const handleArtistClick = (e) => {
    if (e.target.className === "artist") {
      let artistName = e.target.innerText;
      view.setViewing(view.type.MOSAIC);
      search.setQuery(artistName);
    }
  };

  if (!data.artists) return <Spinner />;

  return (
    <StyledContainer onClick={handleArtistClick}>
      {data.artists.map((artist, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{artist[0]}</b>}
          {idx > 0 && artist[0] !== data.artists[idx - 1][0] && (
            <b>{artist[0]}</b>
          )}
          <div className="artist">{artist}</div>
        </div>
      ))}
    </StyledContainer>
  );
}
