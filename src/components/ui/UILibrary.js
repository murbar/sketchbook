import React from 'react';
import styled from 'styled-components';
import CodeSnippet from './CodeSnippet';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Styles = styled.div``;

const Props = ({ items }) => {
  return (
    <>
      <h3>Props</h3>
      <dl>
        {items.map((p, i) => {
          return (
            <React.Fragment key={i}>
              <dt>{p.prop}</dt>{' '}
              <dd>
                <em>{p.type}</em>, {p.desc}
              </dd>
            </React.Fragment>
          );
        })}
      </dl>
    </>
  );
};

export default function UILibrary() {
  useDocumentTitle('MurrayUI Component Library');
  return (
    <Styles>
      <h1>UI Library</h1>
      <h2>Inputs</h2>
      <h3>Button</h3>
      <button>Button</button>
      <h2>Code</h2>
      <h3>CodeSnippet</h3>
      <Props
        items={[
          {
            prop: 'truncate',
            type: 'bool',
            desc: 'gives the element a max-width and scrolls overflow'
          }
        ]}
      />
      <CodeSnippet>
        {`{
  "0": {
    "coordinates": "(60,60)",
    "exits": {
      "n": 10,
      "s": 2,
      "e": 4,
      "w": 1
    }
  }
}`}
      </CodeSnippet>
    </Styles>
  );
}
