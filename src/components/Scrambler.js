import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useInterval from 'shared-hooks/useInterval';

const scrambleChars =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ~!@#$%&*_+?/1234567890';
const skipChars = ' ,.?!';

const firstScramble = input => {
  let result = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    if (skipChars.includes(char)) {
      result += char;
    } else {
      const randomIndex = Math.floor(Math.random() * Math.floor(scrambleChars.length));
      result += scrambleChars[randomIndex];
    }
  }

  return result;
};

const scramble = (input, output) => {
  let result = '';

  for (let i = 0; i < input.length; i++) {
    const [outChar, inChar] = [output[i], input[i]];
    if (skipChars.includes(inChar)) {
      result += inChar;
    } else if (outChar === inChar) {
      result += outChar;
    } else {
      const randomIndex = Math.floor(Math.random() * Math.floor(scrambleChars.length));
      result += scrambleChars[randomIndex];
    }
  }
  return result;
};

function Scrambler({ string = '', element = 'p', interval = 5 }) {
  const [output, setOutput] = useState(firstScramble(string));
  const done = output === string;

  useInterval(
    () => {
      setOutput(prev => scramble(string, prev));
    },
    !done ? interval : null
  );

  const Tag = element;

  return <Tag>{output}</Tag>;
}

Scrambler.propTypes = {};

export default Scrambler;
