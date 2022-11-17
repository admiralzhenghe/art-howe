import React from "react";
// Context
import { useCustomContext } from "../context/Context";
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
  const { data, search, view } = useCustomContext();

  const handleTagClick = (e) => {
    if (e.target.className === "tag") {
      let tagName = e.target.innerText;
      search.setQuery(tagName);
      view.setViewing(view.type.MOSAIC);
    }
  };

  return (
    <StyledContainer onClick={handleTagClick}>
      {data.categories.tags.nodes.map((tag, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{tag.name[0]}</b>}
          {idx > 0 &&
            tag.name[0] !== data.categories.tags.nodes[idx - 1].name[0] && (
              <b>{tag.name[0]}</b>
            )}
          <div className="tag">{tag.name}</div>
        </div>
      ))}
    </StyledContainer>
  );
}
