import styled from "styled-components";
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

export default function Artists({ artistsData }) {
  return (
    <StyledContainer>
      {artistsData.map((artist, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{artist[0]}</b>}
          {idx > 0 && artist[0] !== artistsData[idx - 1][0] && (
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
