import React from "react";
// Router
import { Link } from "react-router-dom";
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

  @media screen and (max-height: 900px) {
    justify-content: flex-start;
  }

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

export default function ArtworkDetail({ data }) {
  return (
    <StyledArtworkDetail>
      <b>{data.post.title}</b>
      <div>
        {data.post.details.artist ? data.post.details.artist : "Unknown Artist"}
      </div>
      <br />
      <b>Exhibition</b>
      <div>{data.post.details.exhibition}</div>
      <br />
      <b>Venue</b>
      <div>{data.post.details.venue}</div>
      <br />
      <b>Date Seen</b>
      <div>{data.post.details.dateSeen}</div>
      <br />
      <b>Tags</b>

      {data.post.tags.edges.map((node) => (
        <>
          <Link key={node.node.tagId} to="/">
            {node.node.name}
          </Link>
        </>
      ))}
      <br />
      <b>Hi-res Link</b>
      <a href={data.post.details.link}>{data.post.details.link}</a>
    </StyledArtworkDetail>
  );
}
