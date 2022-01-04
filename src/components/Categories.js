import React from "react";
// Component
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context";
// GraphQL
import { useQuery } from "@apollo/client";
// Query
import { GET_ALL_TAGS } from "../GraphQL/queries";
// Styled
import styled from "styled-components";

const StyledContainer = styled.div`
  font-size: 1.25rem;
  animation: animateCategories var(--pageLoadAnimation);

  @keyframes animateCategories {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tag {
    cursor: pointer;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }
`;

export default function Categories() {
  const { loading, data } = useQuery(GET_ALL_TAGS);

  const {
    setSearchTerm,
    setViewingArtwork,
    setViewingCategories,
    setViewingSearches,
  } = useCustomContext();

  const handleTagClick = (e) => {
    if (e.target.className === "tag") {
      let tagName = e.target.innerText;
      setViewingArtwork(false);
      setViewingCategories(false);
      setViewingSearches(true);
      setSearchTerm(tagName);
    }
  };

  if (loading) return <Spinner />;
  return (
    <StyledContainer onClick={handleTagClick}>
      {data.tags.nodes.map((tag, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{tag.name[0]}</b>}
          {idx > 0 && tag.name[0] !== data.tags.nodes[idx - 1].name[0] && (
            <b>{tag.name[0]}</b>
          )}
          <div className="tag">{tag.name}</div>
        </div>
      ))}
    </StyledContainer>
  );
}
