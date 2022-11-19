import React, { useRef } from "react";
// Component
import Spinner from "./Spinner";
// Context
import { useCustomContext } from "../context/Context.js";
// Style
import styled from "styled-components";

const StyledMosaicContainer = styled.div`
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 50px;
  position: relative;
`;

export default function Mosaic() {
  const { current, data, search, view } = useCustomContext();

  // Mosaic element
  const mosaicEl = useRef(null);

  // Single event listener for event delegation
  // If a specific artwork is clicked, then show the artwork's detail
  const handleMosaicClick = (e) => {
    if (e.target.tagName === "IMG") {
      current.setArtwork({
        postId: e.target.dataset.id,
      });
      view.setViewing(view.type.ARTWORK);
    }
  };

  if (data.loading || search.loading) return <Spinner />;
  const viewingSearch = search.query.length;

  function handleMosaicHover(e) {
    const mosaicWidth = mosaicEl.current.offsetWidth;
    const scrollHeight = document.body.scrollHeight;

    if (e.target.dataset?.image === "regular") {
      e.target.classList = "";
      if (e.clientX <= mosaicWidth / 2) {
        e.target.classList.add("hover-right");
      } else {
        e.target.classList.add("hover-left");
      }
      if (e.pageY + 150 >= scrollHeight) {
        e.target.classList.add("up");
      }
    }
  }

  return (
    <>
      <div
        className="mosaic"
        onClick={handleMosaicClick}
        onMouseOver={handleMosaicHover}
        ref={mosaicEl}
      >
        {(viewingSearch ? search.data : data.mosaic).map((dataSet) => {
          return (
            <StyledMosaicContainer key={dataSet.post.postId}>
              <img
                src={dataSet.thumbnail}
                data-id={dataSet.post.postId}
                data-image="pixelated"
                alt={dataSet.post.title}
              />
              <img
                src={dataSet.medium}
                data-id={dataSet.post.postId}
                data-image="regular"
                alt={dataSet.post.title}
              />
            </StyledMosaicContainer>
          );
        })}
      </div>
    </>
  );
}
