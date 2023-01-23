import React from "react";
// Context
import { useCustomContext } from "../context/Context";
// Styled
import styled from "styled-components";

const StyledArtworkDetail = styled.div`
  display: flex;
  flex: 25%;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-word;

  #title {
    font-style: italic;
  }

  #artist,
  #year,
  #exhibition,
  #venue,
  #tag {
    cursor: pointer;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }

  @media screen and (max-height: 900px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

export default function ArtworkDetail({ data }) {
  const { search, view } = useCustomContext();

  const handleDetailClick = (e) => {
    if (!e.target.id) return;
    let filter = e.target.innerText.replace("; ", "");
    view.setViewing(view.type.MOSAIC);
    search.setQuery(filter);
  };

  return (
    <StyledArtworkDetail
      onClick={handleDetailClick}
      className="custom-scrollbar"
    >
      <div id="artist">{data.post.details.artist?.toUpperCase()}</div>
      <br />
      <div id="title">{data.post.title}</div>
      <div id="year">{data.post.details.year}</div>
      <br />
      <b>Exhibition</b>
      <div id="exhibition">{data.post.details.exhibition}</div>
      <br />
      <b>Venue</b>
      <div id="venue">{data.post.details.venue}</div>
      <br />
      <b>Date Seen</b>
      <div>{data.post.details.dateSeen?.replace(/[/]/g, ".")}</div>
      <br />
      <b>Tags</b>
      <div>
        {data.post.tags.edges.map((tag, idx) => {
          if (idx === data.post.tags.edges.length - 1) {
            return <span id="tag" key={idx}>{`${tag.node.name}`}</span>;
          }
          return <span id="tag" key={idx}>{`${tag.node.name}; `}</span>;
        })}
      </div>
      <br />
      <b>Hi-res Link</b>
      <a href={data.post.details.link}>{data.post.details.link}</a>
    </StyledArtworkDetail>
  );
}
