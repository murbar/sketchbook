import React, { useState } from 'react';
import styled from 'styled-components';
import { animated, useSpring } from 'react-spring';

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

const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

const convertToString = charCodeArray => {
  return charCodeArray.map(code => String.fromCharCode(Math.floor(code))).join('');
};

const padArray = (array, value, newLength) => {
  const length = array.length;
  const filler = Array(newLength - length).fill(value);
  return array.concat(filler);
};

const convertToStringAndFilterType = (charCodeArray, type) => {
  return convertToString(charCodeArray.filter(code => typeof code === type));
};

const longestInput = roadNotTakenLines.reduce((acc, cur) => {
  return cur.length > acc ? cur.length : acc;
}, 0);

const inputLinesCharCodes = roadNotTakenLines.map(l =>
  padArray(convertToCharCodeArray(l), '', longestInput)
);

const Styles = styled.div``;

export default function StringTweening() {
  const [charsArray, setCharsArray] = useState(inputLinesCharCodes[0]);
  const [lineNo, setLineNo] = useState(0);

  const incrementLine = () => {
    setLineNo(prev => {
      let next = (prev + 1) % roadNotTakenLines.length;
      setCharsArray(inputLinesCharCodes[next]);
      return next;
    });
  };

  const tween = useSpring({
    config: {
      duration: 500
    },
    chars: charsArray
  });

  return (
    <Styles>
      <h1>String tweening</h1>
      <p>
        I converted the characters to char codes and tweened between the codes, converting back to a
        string along the way using React Spring's interpolation helper. We could set the{' '}
        <code>from</code> param on the spring object to a random string the same length as the input
        to tween on load and tween between values that are the same in the currently string and the
        next string.
      </p>
      <p>
        <strong>Edit:</strong> For an unknown reason, the chars array being tweened shrinks to match
        new props but will not expand again. E.g. if we start with string length 10 and increase it
        to 15, only the first 10 chars will render. If we then set it to length 8, only 8 chars will
        ever render, etc. My solution pads the string's char code array with a sentinel value of
        empty string then filters those values out again before the chars are interpolated into the
        view. We pad to the length of the longest input string, so the chars array length will
        always less than or equal to that. And <code>config: true</code> resolves an issue where
        additional chars don't animate if the string is longer than the perviously rendered string.
      </p>
      <h2>
        Demo: <em>The Road Not Taken</em> by Robert Frost
      </h2>
      <button onClick={incrementLine}>Next line!</button>
      <p>Line {lineNo + 1}</p>
      <animated.h3>
        {tween.chars.interpolate((...charCodes) =>
          convertToStringAndFilterType(charCodes, 'number')
        )}
      </animated.h3>
    </Styles>
  );
}
