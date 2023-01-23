import styled from "styled-components";

const StyledSkeleton = styled.div`
   {
    background-color: gainsboro;
    border-radius: 5px;
    display: flex;
    flex-basis: 60%;
    height: 80%;
    min-height: 200px;
    max-width: 600px;
    position: relative;
    animation: skeleton-loading 1s linear infinite alternate;

    &::before,
    &::after {
      content: "";
      border: solid gainsboro;
      border-width: 0 5px 5px 0;
      padding: 15px;
      position: absolute;
      top: 50%;
    }

    &::before {
      right: 105%;
      transform: translateY(-50%) rotate(135deg);
    }

    &::after {
      left: 105%;
      transform: translateY(-50%) rotate(-45deg);
    }

    @keyframes skeleton-loading {
      0% {
        background-color: hsl(200, 20%, 80%);
      }
      100% {
        background-color: hsl(200, 20%, 95%);
      }
    }
  }

  .fullscreen {
    border: 5px dotted gainsboro;
    height: 1.75rem;
    width: 1.75rem;
    position: absolute;
    top: 90%;
    left: 107.5%;

    @media screen and (max-width: 768px) {
      height: 1.25rem;
      width: 1.25rem;
      left: 110%;
    }
  }
`;

export default function Skeleton() {
  return (
    <StyledSkeleton>
      <div className="fullscreen"></div>
    </StyledSkeleton>
  );
}
