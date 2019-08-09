import styled, { css } from 'styled-components';

const truncate = css`
  max-height: 30em;
  overflow: scroll;
`;

const CodeSnippet = styled.pre`
  font-size: 0.8em;
  background: #ddd;
  padding: 1em;
  border-radius: 1rem;
  width: 100%;
  ${p => p.truncate && truncate}
`;

export default CodeSnippet;
