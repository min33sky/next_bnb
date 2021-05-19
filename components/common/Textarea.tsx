import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';
import palette from 'styles/palette';

const StyledTextarea = styled(TextareaAutosize)`
  position: relative;
  width: 100%;
  min-height: 216px;
  padding: 11px;
  border: 1px solid ${palette.gray_eb};
  border-radius: 4px;
  font-size: 16px;
  outline: none;
  resize: none;
  font: inherit;
  & ::placeholder {
    color: ${palette.gray_76};
  }
  & :focus {
    border-color: ${palette.dark_cyan};
  }
`;

/**
 * Textarea
 * @returns Autosize Textarea Component
 */
const Textarea = ({ ...props }) => {
  return <StyledTextarea {...props} />;
};

export default React.memo(Textarea);
