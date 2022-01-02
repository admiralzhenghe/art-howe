import React from "react";
// Styled
import styled from "styled-components";

const StyledArtworkDetail = styled.div`
  display: flex;
  flex: 20%;
  flex-direction: column;
  justify-content: center;
  padding: 1rem;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-word;

  #artist,
  #exhibition,
  #venue,
  #tag {
    cursor: pointer;
  }

  @media screen and (max-height: 900px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export default function ArtworkDetail({
  data,
  setSearching,
  setSearchTerm,
  setViewing,
}) {
  let categories = ["artist", "exhibition", "venue", "tag"];
  const handleDetailClick = (e) => {
    let detailText = e.target.innerText;
    if (categories.includes(e.target.id)) {
      setSearching(true);
      setSearchTerm(detailText);
      setViewing(false);
    }
  };

  return (
    <StyledArtworkDetail onClick={handleDetailClick}>
      <b>{data.post.title}</b>
      <div id="artist">
        {data.post.details.artist ? data.post.details.artist : "Unknown Artist"}
      </div>
      <br />
      <b>Exhibition</b>
      <div id="exhibition">{data.post.details.exhibition}</div>
      <br />
      <b>Venue</b>
      <div id="venue">{data.post.details.venue}</div>
      <br />
      <b>Date Seen</b>
      <div>{data.post.details.dateSeen}</div>
      <br />
      <b>Tags</b>

      {data.post.tags.edges.map((node) => (
        <li id="tag" key={node.node.tagId}>
          {node.node.name}
        </li>
      ))}
      <br />
      <b>Hi-res Link</b>
      <a href={data.post.details.link}>{data.post.details.link}</a>
    </StyledArtworkDetail>
  );
}
