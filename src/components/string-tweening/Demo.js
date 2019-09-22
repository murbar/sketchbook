import React, { useState } from 'react';
import styled from 'styled-components';
import StringTween from './StringTween';

const roadNotTakenLines = [
  'Two roads diverged in a yellow wood,',
  'And sorry I could not travel both',
  'And be one traveler, long I stood',
  'And looked down one as far as I could',
  'To where it bent in the undergrowth;',

  'Then took the other, as just as fair,',
  'And having perhaps the better claim,',
  'Because it was grassy and wanted wear;',
  'Though as for that the passing there',
  'Had worn them really about the same,',

  'And both that morning equally lay',
  'In leaves no step had trodden black.',
  'Oh, I kept the first for another day!',
  'Yet knowing how way leads on to way,',
  'I doubted if I should ever come back.',

  'I shall be telling this with a sigh',
  'Somewhere ages and ages hence:',
  'Two roads diverged in a wood, and I—',
  'I took the one less traveled by,',
  'And that has made all the difference.'
];

const Styles = styled.div`
  h3 {
    margin: 0;
  }
`;

export default function Demo() {
  const [lineNo, setLineNo] = useState(0);

  const incrementLine = () => {
    setLineNo(prev => {
      return (prev + 1) % roadNotTakenLines.length;
    });
  };

  return (
    <Styles>
      <h1>{/* <StringTween>String tweening</StringTween> */}</h1>
      <p>
        I converted the characters to char codes and tweened between the codes, converting
        back to a string along the way using React Spring's interpolation helper.
      </p>
      <p>
        The chars array shrinks when the props change but never expands. E.g. if we start
        with string length 10 and increase it to 15, only the first 10 chars will render.
        If we then set it to length 8, only 8 chars will ever render. I'm not sure what
        causes this but it's acceptable since the library wasn't meant to be used like
        this anyway.
      </p>
      <p>
        My solution is to render a new whole new component when the child string changes.
        I did this with this poem by filtering the array of lines to return one line whose
        index matches the current line number and insuring the rendered element has a
        unique key. If the keys aren't unique, the element (and it's useSpring hook) will
        be reused and will only ever render as many characters as the smallest string it
        is given.
      </p>

      <p>Note this technique won't work so well with really long string. </p>
      <h3>
        Demo: <em>The Road Not Taken</em> by Robert Frost
      </h3>
      <button onClick={incrementLine}>Next line!</button>
      <p>
        Line {lineNo + 1}:{' '}
        {roadNotTakenLines
          .filter((l, n) => n === lineNo)
          // items must have unique key so tween element is not reused
          .map(line => {
            return <StringTween key={line}>{line}</StringTween>;
          })}
      </p>
      <h3>Demo: click paragraph to scramble</h3>
      <p>
        <StringTween scrambleOnClick>
          Dreamcatcher lyft before they sold out literally vegan tumeric pabst pitchfork
          tilde hoodie raw denim heirloom art party paleo edison bulb. Glossier kinfolk
          DIY chicharrones. IPhone roof party succulents, master cleanse fashion axe migas
          neutra live-edge listicle food truck leggings. Literally pork belly fam, pug
          quinoa mumblecore flexitarian knausgaard cray tousled meggings. Banjo
          intelligentsia williamsburg offal.
        </StringTween>
      </p>
    </Styles>
  );
}
