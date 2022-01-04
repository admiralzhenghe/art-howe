import React from "react";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

const StyledHeader = styled.div`
  grid-row: 1;

  .logo {
    text-align: center;
    position: relative;
  }

  .categories-container {
    display: inline-block;
    position: absolute;
    right: 0;
    height: 100%;

    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }

  .categories {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
  }

  .text {
    font-size: 30px;
  }

  span {
    cursor: pointer;
    font-size: 50px;
    letter-spacing: 0.1rem;
  }

  @media screen and (max-width: 768px) {
    .categories-container {
      display: block;
      position: relative;
    }

    .categories {
      justify-content: center;
      align-items: center;
    }

    .text {
      font-size: 25px;
    }
  }

  @media screen and (max-width: 480px) {
    span {
      font-size: 30px;
    }

    .text {
      font-size: 20px;
    }
  }
`;

export default function Header() {
  const {
    viewingCategories,
    setSearchTerm,
    setViewingArtwork,
    setViewingCategories,
    setViewingSearches,
  } = useCustomContext();

  const handleCategoriesToggle = (e) => {
    // Stop event bubbling to prevent triggering the Logo click
    e.stopPropagation();
    setViewingCategories(!viewingCategories);
  };

  return (
    <StyledHeader>
      <div
        className="logo"
        // Clicking on the logo resets the website to the main landing page
        onClick={() => {
          // Clear the viewing artwork state
          setViewingArtwork(false);
          // Clear the viewing categories state
          setViewingCategories(false);
          // Clear the searching state
          setViewingSearches(false);
          // Clear the search bar
          setSearchTerm("");
        }}
      >
        <span style={{ color: "var(--blue)" }}>A</span>
        <span style={{ color: "var(--orange)" }}>R</span>
        <span style={{ color: "var(--blue)" }}>T</span>
        <span> </span>
        <span style={{ color: "var(--orange)" }}>H</span>
        <span style={{ color: "var(--blue)" }}>O</span>
        <span style={{ color: "var(--orange)" }}>W</span>
        <span style={{ color: "var(--blue)" }}>E</span>
        <div className="categories-container">
          <div className="categories" onClick={handleCategoriesToggle}>
            <div className="text">Categories</div>
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}
