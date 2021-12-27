import React from "react";
import { useQuery, gql } from "@apollo/client";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledMosaic = styled.div`
  /* display: flex; */
  background-color: yellow;
`;

const StyledImage = styled.img`
  flex-wrap: wrap;
  height: 50px;
  width: 50px;
  margin: 10px;
`;

const GET_POSTS = gql`
  {
    posts {
      nodes {
        featuredImage {
          node {
            sourceUrl(size: THUMBNAIL)
          }
        }
        id
        title
      }
    }
  }
`;

const handleMouseOver = (e) => {
  let currentImage = e.target;
  if (currentImage.localName === "img") {
    console.log(currentImage);
  }
};

export default function Mosaic() {
  const { error, loading, data } = useQuery(GET_POSTS);
  if (loading) return <div>Loading...</div>;

  console.log({ error, loading, data });
  return (
    <StyledMosaic onMouseOver={handleMouseOver}>
      {data.posts.nodes.map((post) => {
        return (
          <>
            <StyledImage
              key={post.id}
              id={post.id}
              src={post.featuredImage.node.sourceUrl}
              alt=""
            />
          </>
        );
      })}
    </StyledMosaic>
  );
}
