import React from 'react';
import styled from 'styled-components';

const Styles = styled.textarea``;

export default function TextArea({
  callback,
  cols = 20,
  rows = 2,
  disabled = false,
  readOnly = false,
  placeholder = ''
}) {
  return (
    <Styles
      cols={cols}
      rows={rows}
      disabled={disabled}
      readOnly={readOnly}
      placeholder={placeholder}
      onChange={({ target: { value } }) => callback(value)}
    />
  );
}
