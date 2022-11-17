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

  .logo-container {
    justify-content: center;
    font-size: 3.5rem;
    grid-area: logo;
    letter-spacing: 0.1rem;
    text-align: center;
    width: 100%;
  }

  .categories-container {
    grid-area: categories;
    justify-content: flex-end;
  }

  .artists-container,
  .logo-container,
  .categories-container {
    display: flex;
  }

  .logo:hover {
    cursor: pointer;
  }

  .artists,
  .categories {
    cursor: pointer;
    display: flex;
    align-items: center;
    height: 100%;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
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
  const { search, view } = useCustomContext();

  const handleHeaderClick = (e) => {
    // Clicking on the logo resets to the landing page
    if (e.target.hasAttribute(["data-logo"]) || e.target.tagName === "SPAN") {
      view.setViewing(view.type.MOSAIC);
    } else if (e.target.hasAttribute(["data-artists"])) {
      view.setViewing(view.type.ARTISTS);
    } else if (e.target.hasAttribute(["data-categories"])) {
      view.setViewing(view.type.CATEGORIES);
    }
    search.setQuery("");
  };

  return (
    <StyledHeader>
      <div className="container" onClick={handleHeaderClick}>
        <div className="artists-container" data-artists>
          <div className="artists" data-artists>
            Artists
          </div>
        </div>
        <div className="logo-container">
          <div className="logo" data-logo>
            <span style={{ color: "var(--blue)" }}>A</span>
            <span style={{ color: "var(--orange)" }}>R</span>
            <span style={{ color: "var(--blue)" }}>T</span>
            <span> </span>
            <span style={{ color: "var(--orange)" }}>H</span>
            <span style={{ color: "var(--blue)" }}>O</span>
            <span style={{ color: "var(--orange)" }}>W</span>
            <span style={{ color: "var(--blue)" }}>E</span>
          </div>
        </div>
        <div className="categories-container" data-categories>
          <div className="categories" data-categories>
            Categories
          </div>
        </div>
      </div>
    </StyledHeader>
  );
}
