import styled from 'styled-components';

interface IProps {
  collapse: boolean;
}

const CollapseButton = styled.button<IProps>`
  background: transparent;
  border: none;
  width: 26px;
  height: 26px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: white;
  margin-left: 10px;
  cursor: pointer;
  ${({ collapse }) =>
    collapse &&
    `
    & i {
      transform: none;
    }
  `};
`;

export default CollapseButton;
