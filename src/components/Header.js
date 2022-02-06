import React from "react";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

const StyledHeader = styled.div`
  .container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-areas: "artists logo categories";
    font-size: 1.5rem;
  }

  .artists-container {
    grid-area: artists;
    justify-content: flex-start;
  }

  .logo {
    grid-area: logo;
    cursor: pointer;
    font-size: 3.5rem;
    letter-spacing: 0.1rem;
    text-align: center;
  }

  .categories-container {
    grid-area: categories;
    justify-content: flex-end;
  }

  .artists-container,
  .categories-container {
    display: flex;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }

  .artists,
  .categories {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
  }

  @media screen and (max-width: 768px) {
    .container {
      font-size: 1.25rem;
      grid-template-columns: 1fr 1fr;
      grid-template-areas:
        "logo logo"
        "artists categories";
    }

    .logo {
      font-size: 2.5rem;
    }
  }
`;

export default function Header() {
  const {
    viewingArtists,
    viewingCategories,
    setSearchTerm,
    setViewingArtwork,
    setViewingArtists,
    setViewingCategories,
    setViewingSearches,
  } = useCustomContext();

  const handleArtistsToggle = (e) => {
    // Stop event bubbling to prevent triggering the Logo click
    e.stopPropagation();
    setViewingCategories(false);
    setViewingArtists(!viewingArtists);
  };

  const handleCategoriesToggle = (e) => {
    e.stopPropagation();
    setViewingArtists(false);
    setViewingCategories(!viewingCategories);
  };

  // Clicking on the logo resets to the landing page
  const handleHomeToggle = (e) => {
    // Clear the viewing artwork state
    setViewingArtwork(false);
    // Clear the viewing artists state
    setViewingArtists(false);
    // Clear the viewing categories state
    setViewingCategories(false);
    // Clear the searching state
    setViewingSearches(false);
    // Clear the search bar
    setSearchTerm("");
  };

  return (
    <StyledHeader>
      <div className="container" onClick={handleHomeToggle}>
        <div className="artists-container">
          <div className="artists" onClick={handleArtistsToggle}>
            Artists
          </div>
        </div>
        <div className="logo">
          <span style={{ color: "var(--blue)" }}>A</span>
          <span style={{ color: "var(--orange)" }}>R</span>
          <span style={{ color: "var(--blue)" }}>T</span>
          <span> </span>
          <span style={{ color: "var(--orange)" }}>H</span>
          <span style={{ color: "var(--blue)" }}>O</span>
          <span style={{ color: "var(--orange)" }}>W</span>
          <span style={{ color: "var(--blue)" }}>E</span>
        </div>
        <div className="categories-container">
          <div className="categories" onClick={handleCategoriesToggle}>
            Categories
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}
