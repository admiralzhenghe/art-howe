import styled from "styled-components";
// Apollo
import { useQuery } from "@apollo/client";
import { GET_ALL_CATEGORIES } from "../GraphQL/queries";
// Router
import { Link } from "react-router-dom";

const StyledContainer = styled.div`
  font-size: 1.25rem;
  animation: animateCategories var(--pageLoadAnimation);

  @keyframes animateCategories {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  .tag {
    display: block;
    cursor: pointer;
    &:hover {
      color: var(--orange);
      transition: var(--hoverTransition);
    }
  }
`;

export default function Categories({ categoriesData }) {
  const { loading, data } = useQuery(GET_ALL_CATEGORIES);
  if (loading) return <></>;

  return (
    <StyledContainer>
      {data.tags.nodes.map((tag, idx) => (
        <div key={idx}>
          {idx === 0 && <b>{tag.name[0]}</b>}
          {idx > 0 && tag.name[0] !== data.tags.nodes[idx - 1].name[0] && (
            <b>{tag.name[0]}</b>
          )}
          <Link to={"/search/" + encodeURIComponent(tag.name)} className="tag">
            {tag.name}
          </Link>
        </div>
      ))}
    </StyledContainer>
  );
}
