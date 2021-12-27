import React from "react";
// Apollo
import { useQuery, gql } from "@apollo/client";
// Component
import Spinner from "./Spinner";
// Router
import { Link } from "react-router-dom";
// Styled
import styled from "styled-components";

const StyledMosaic = styled.div`
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

  if (loading) return <Spinner />;

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
