import React, { useState } from 'react';
import styled from 'styled-components';
import useDocumentTitle from 'shared-hooks/useDocumentTitle';

const sumArray = arr => arr.reduce((a, b) => a + b, 0);
const avgArray = arr => sumArray(arr) / arr.length;

const bigArray = Array(1000000)
  .fill(null)
  .map(() => Math.random());

const inRangeUppercase = n => n * (90 - 65) + 65;
const floor = n => Math.floor(n);
const convert = charCode => String.fromCharCode(charCode);
const onlyVowels = char => 'AEIOU'.includes(char);

const mapper = () => {
  return bigArray
    .map(inRangeUppercase)
    .map(floor)
    .map(convert)
    .filter(onlyVowels)
    .join('');
};

const reducer = () => {
  return bigArray.reduce((result, randomNum) => {
    const char = convert(floor(inRangeUppercase(randomNum)));
    return onlyVowels(char) ? result + char : result;
  }, '');
};

const timeFunc = func => {
  const t0 = performance.now();
  func();
  const t1 = performance.now();
  console.log(`Timed ${func.name}, took ${(t1 - t0).toFixed(2)}ms`);
  return t1 - t0;
};

const timeFuncRepeat = (func, rounds = 3) => {
  const results = Array(rounds)
    .fill(null)
    .map(() => timeFunc(func));
  return {
    results,
    avg: avgArray(results).toFixed(1),
    rounds
  };
};

const Styles = styled.div`
  p {
    font-size: 1.25em;
  }
  button {
    margin-right: 1rem;
  }
`;

export default function ChainVsReduce() {
  const [messages, setMessages] = useState([]);

  const run = (func, rounds) => {
    const results = timeFuncRepeat(func, rounds);
    setMessages(prev => [
      ...prev,
      `Ran ${func.name} ${rounds}x - avg time ${results.avg}ms`
    ]);
  };

  useDocumentTitle('Exploring JS Performance');

  return (
    <Styles>
      <h1>Function chaining Vs reduce</h1>
      <p>
        We're transforming an array of 1,000,000 items. Reduce is up to 5-7x faster than
        chaining function calls.
      </p>
      <button onClick={() => run(mapper, 3)}>Run /w chaining</button>
      <button onClick={() => run(reducer, 3)}>Run /w reduce</button>
      {messages.length > 0 &&
        messages.map((m, i) => {
          return (
            <p key={i}>
              <strong>{m}</strong>
            </p>
          );
        })}
    </Styles>
  );
}
