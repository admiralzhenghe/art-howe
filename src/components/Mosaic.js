import styled from "styled-components";
import { useRef } from "react";
import { Link } from "react-router-dom";

const StyledMosaicContainer = styled.div`
  background-color: gainsboro;
  cursor: pointer;
  display: inline-block;
  height: 50px;
  width: 50px;
  position: relative;
`;

export default function Mosaic({ mosaicData: data }) {
  const mosaicElement = useRef(null);

  function handleMosaicHover(e) {
    if (window.screen.width < 768) return;
    const mosaicWidth = mosaicElement.current.offsetWidth;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.body.scrollHeight;

    if (e.target.dataset?.image === "regular") {
      e.target.classList = "";
      if (e.clientX <= mosaicWidth / 2) {
        e.target.classList.add("hover-right");
      } else {
        e.target.classList.add("hover-left");
      }
      if (e.pageY + 150 >= Math.max(windowHeight, scrollHeight)) {
        e.target.classList.add("up");
      }
    }
  }

  return (
    <>
      <div
        className="mosaic"
        onMouseOver={handleMosaicHover}
        ref={mosaicElement}
      >
        {data.map((dataSet) => {
          return (
            <StyledMosaicContainer key={dataSet.post.postId}>
              <Link to={`/artwork/${dataSet.post.postId}`}>
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
              </Link>
            </StyledMosaicContainer>
          );
        })}
      </div>
    </>
  );
}
