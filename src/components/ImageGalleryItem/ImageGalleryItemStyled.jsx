import styled from 'styled-components';

export const ItemStyled = styled.li`
  width: calc((100% / 3) - 10px);
  height: 300px;
  overflow: hidden;
`;

export const ImgItemStyled = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border: teal 3px solid;
  border-radius: 15px;
`;
