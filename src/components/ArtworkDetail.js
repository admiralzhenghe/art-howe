import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledArtworkDetail = styled.div`
  display: flex;
  flex: 25%;
  flex-direction: column;
  justify-content: center;
  padding: 0.2rem;
  overflow-y: scroll;
  overflow-x: hidden;
  word-break: break-word;

  .title {
    font-style: italic;
  }

  .artist,
  .year,
  .exhibition,
  .venue,
  .tag {
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
  return (
    <StyledArtworkDetail className="custom-scrollbar">
      <Link
        to={"/search/" + encodeURIComponent(data.post.details.artist)}
        className="artist"
      >
        {data.post.details.artist?.toUpperCase()}
      </Link>
      <br />
      <div className="title">{data.post.title}</div>
      <Link
        to={"/search/" + encodeURIComponent(data.post.details.year)}
        className="year"
      >
        {data.post.details.year}
      </Link>
      <br />
      <b>Exhibition</b>
      <Link
        to={"/search/" + encodeURIComponent(data.post.details.exhibition)}
        className="exhibition"
      >
        {data.post.details.exhibition}
      </Link>
      <br />
      <b>Venue</b>
      <Link
        to={"/search/" + encodeURIComponent(data.post.details.venue)}
        className="venue"
      >
        {data.post.details.venue}
      </Link>
      <br />
      <b>Date Seen</b>
      <div>{data.post.details.dateSeen?.replace(/[/]/g, ".")}</div>
      <br />
      <b>Tags</b>
      <div>
        {data.post.tags.edges.map((tag, idx) => {
          if (idx === data.post.tags.edges.length - 1) {
            return (
              <Link
                to={"/search/" + encodeURIComponent(tag.node.name)}
                className="tag"
                key={idx}
              >{`${tag.node.name}`}</Link>
            );
          }
          return (
            <Link
              to={"/search/" + encodeURIComponent(tag.node.name)}
              className="tag"
              key={idx}
            >{`${tag.node.name}; `}</Link>
          );
        })}
      </div>
      <br />
      {data.post.details.link && (
        <>
          <b>Hi-res Link</b>
          <a className="link" href={data.post.details.link}>
            {data.post.details.link}
          </a>
        </>
      )}
    </StyledArtworkDetail>
  );
}
