import React, { useEffect, useState } from "react";
// Component
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context";
// GraphQL
import { useQuery } from "@apollo/client";
// Query
import { GET_ALL_ARTISTS } from "../GraphQL/queries";
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
  const { loading, data } = useQuery(GET_ALL_ARTISTS);
  const [artists, setArtists] = useState(null);
  const {
    setSearchTerm,
    setViewingArtwork,
    setViewingArtists,
    setViewingSearches,
  } = useCustomContext();

  useEffect(() => {
    if (loading) return;
    // Remove duplicate artists using a set
    let set = new Set();
    data.posts.nodes.forEach((node) => {
      set.add(node.details.artist);
    });
    // Sort the artists in alphabetical order
    let artists = [...set].sort();
    setArtists(artists);
  }, [loading]);

  const handleArtistClick = (e) => {
    if (e.target.className === "artist") {
      let artistName = e.target.innerText;
      setViewingArtwork(false);
      setViewingArtists(false);
      setViewingSearches(true);
      setSearchTerm(artistName);
    }
  };

  if (loading || !artists) return <Spinner />;

  return (
    <StyledContainer onClick={handleArtistClick}>
      {artists.map((artist, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{artist[0]}</b>}
          {idx > 0 && artist[0] !== artists[idx - 1][0] && <b>{artist[0]}</b>}
          <div className="artist">{artist}</div>
        </div>
      ))}
    </StyledContainer>
  );
}
