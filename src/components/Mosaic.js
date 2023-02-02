import styled from "styled-components";
import { useRef } from "react";
// Router
import { Link } from "react-router-dom";
// Utils
import throttleWrapper from "../utils/throttleWrapper";

const StyledMosaicContainer = styled.div`
  background-color: gainsboro;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 50px;
  position: relative;
`;

export default function Mosaic({ data }) {
  const mosaicElement = useRef(null);

  function handleClick(e) {
    // On mobile screens, clicking a pixelated image will show its regular image
    if (e.target.dataset?.image === "pixelated") {
      e.target.style.display = "none";
    }
  }

  function handleMosaicHover(e) {
    // Turn off mosaic hover logic for mobile screens
    if (window.screen.width <= 768) return;
    const mosaicWidth = mosaicElement.current.offsetWidth;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;

    if (e.target.dataset?.image === "regular") {
      e.target.classList = "";
      if (e.clientX <= mosaicWidth / 2) e.target.classList.add("hover-right");
      else e.target.classList.add("hover-left");
      if (e.pageY + 150 >= Math.max(windowHeight, scrollHeight)) {
        e.target.classList.add("up");
      }
    }
  }

  const throttledHover = throttleWrapper(handleMosaicHover, 5);

  return (
    <>
      <div
        className="mosaic"
        onMouseDown={handleClick}
        onMouseOver={throttledHover}
        ref={mosaicElement}
      >
        {data.map((dataSet) => {
          return (
            <StyledMosaicContainer key={dataSet.post.postId}>
              <img
                src={dataSet.thumbnail}
                data-id={dataSet.post.postId}
                data-image="pixelated"
                alt={dataSet.post.title}
              />
              <Link to={`/artwork/${dataSet.post.postId}`}>
                <img
                  src={dataSet.medium}
                  data-id={dataSet.post.postId}
                  data-image="regular"
                  alt={dataSet.post.title}
                />
              </Link>
            </StyledMosaicContainer>
          );
        })}
      </div>
    </>
  );
}
