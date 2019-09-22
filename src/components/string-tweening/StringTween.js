import React from 'react';
import PropTypes from 'prop-types';
import { animated, useSpring } from 'react-spring';

const charArrays = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
  lower: 'abcdefghijklmnopqrstuvwxyz'.split(''),
  numbers: '0123456789'.split('')
};

const randomChoice = array => {
  return array[Math.floor(Math.random() * array.length)];
};

const scrambleString = string => {
  const chars = string.split('');
  const { upper, lower, numbers } = charArrays;
  return chars
    .map(c => {
      if (upper.includes(c)) return randomChoice(upper);
      if (lower.includes(c)) return randomChoice(lower);
      if (numbers.includes(c)) return randomChoice(numbers);
      return c;
    })
    .join('');
};

const normalizeCharCode = code => {
  // return a letter or number when when spring bounces beyond char code range
  // if (code === 64) return 66;
  // if (code === 91) return 89;
  // if (code === 96) return 98;
  // if (code === 123) return 121;
  // if (code === 47) return 49;
  // if (code === 58) return 56;
  return code;
};

const convertToCharCodeArray = string => {
  return string.split('').map(ch => ch.charCodeAt(0));
};

const convertToString = charCodeArray => {
  // return charCodeArray
  //   .map(c => Math.floor(c))
  //   .map(c => normalizeCharCode(c))
  //   .map(c => String.fromCharCode(c))
  //   .join('');

  // 5-20x performance improvement
  return charCodeArray.reduce((result, code) => {
    return result + String.fromCharCode(normalizeCharCode(Math.floor(code)));
  }, '');
};

// does not perform well with lengths > 100
export default function StringTween({
  children,
  duration = null,
  scrambleOnClick = false
}) {
  const from = convertToCharCodeArray(scrambleString(children));
  const to = convertToCharCodeArray(children);
  const tween = {
    // more granular precision since our targets are integers
    config: { precision: 1 },
    from: {
      chars: from
    },
    chars: to
  };
  if (duration) tween.config = { duration };
  const [spring, setSpring] = useSpring(() => tween);

  const scramble = () => {
    if (scrambleOnClick) {
      setSpring({
        config: { duration: 100 },
        to: { chars: convertToCharCodeArray(scrambleString(children)) },
        onRest: () => {
          setSpring({
            config: { duration: undefined },
            to: { chars: convertToCharCodeArray(children) }
          });
        }
      });
    }
  };

  return (
    <animated.span onClick={scramble}>
      {spring.chars.interpolate((...charCodes) => convertToString(charCodes))}
    </animated.span>
  );
}

StringTween.propTypes = {
  children: PropTypes.string.isRequired
};
