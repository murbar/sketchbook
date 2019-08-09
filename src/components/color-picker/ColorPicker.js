import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

const HSVPicker = styled.div`
  display: flex;
  > div:first-child {
    margin-right: 1.5rem;
  }
`;

const HSLPicker = styled.div`
  display: flex;
  > div:first-child {
    margin-right: 1.5rem;
  }
`;

const HueSelect = styled.div`
  width: 4rem;
  height: 30rem;
  border-radius: 0.5rem;
  ${'' /* border: 0.1rem solid black; */}
  background: linear-gradient(
    to bottom,
    hsl(0, 100%, 50%),
    hsl(15, 100%, 50%),
    hsl(30, 100%, 50%),
    hsl(45, 100%, 50%),
    hsl(60, 100%, 50%),
    hsl(75, 100%, 50%),
    hsl(90, 100%, 50%),
    hsl(105, 100%, 50%),
    hsl(120, 100%, 50%),
    hsl(135, 100%, 50%),
    hsl(150, 100%, 50%),
    hsl(165, 100%, 50%),
    hsl(180, 100%, 50%),
    hsl(195, 100%, 50%),
    hsl(210, 100%, 50%),
    hsl(225, 100%, 50%),
    hsl(240, 100%, 50%),
    hsl(255, 100%, 50%),
    hsl(270, 100%, 50%),
    hsl(285, 100%, 50%),
    hsl(300, 100%, 50%),
    hsl(315, 100%, 50%),
    hsl(330, 100%, 50%),
    hsl(345, 100%, 50%),
    hsl(360, 100%, 50%)
  );
`;

const SatValSelect = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 0.5rem;
  ${'' /* border: 0.1rem solid black; */}
  background: linear-gradient(to top, black, transparent),  linear-gradient(to right, white, transparent), hsl(113, 100%, 50%);
  position: relative;
  overflow: hidden;
`;

const HueSatSelect = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 100%;
  background: radial-gradient(
      circle at 50% 0,
      red,
      rgba(242, 13, 13, 0.8) 10%,
      rgba(230, 25, 25, 0.6) 20%,
      rgba(204, 51, 51, 0.4) 30%,
      rgba(166, 89, 89, 0.2) 40%,
      hsla(0, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 85.35533905932738% 14.644660940672622%,
      #ffbf00,
      rgba(242, 185, 13, 0.8) 10%,
      rgba(230, 179, 25, 0.6) 20%,
      rgba(204, 166, 51, 0.4) 30%,
      rgba(166, 147, 89, 0.2) 40%,
      hsla(45, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 100% 50%,
      #80ff00,
      rgba(128, 242, 13, 0.8) 10%,
      rgba(128, 230, 25, 0.6) 20%,
      rgba(128, 204, 51, 0.4) 30%,
      rgba(128, 166, 89, 0.2) 40%,
      hsla(90, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 85.35533905932738% 85.35533905932738%,
      #00ff40,
      rgba(13, 242, 70, 0.8) 10%,
      rgba(25, 230, 77, 0.6) 20%,
      rgba(51, 204, 89, 0.4) 30%,
      rgba(89, 166, 108, 0.2) 40%,
      hsla(135, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 50.00000000000001% 100%,
      #0ff,
      rgba(13, 242, 242, 0.8) 10%,
      rgba(25, 229, 230, 0.6) 20%,
      rgba(51, 204, 204, 0.4) 30%,
      rgba(89, 166, 166, 0.2) 40%,
      hsla(180, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 14.64466094067263% 85.35533905932738%,
      #0040ff,
      rgba(13, 70, 242, 0.8) 10%,
      rgba(25, 76, 230, 0.6) 20%,
      rgba(51, 89, 204, 0.4) 30%,
      rgba(89, 108, 166, 0.2) 40%,
      hsla(225, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 0 50.00000000000001%,
      #7f00ff,
      rgba(127, 13, 242, 0.8) 10%,
      rgba(127, 25, 230, 0.6) 20%,
      rgba(127, 51, 204, 0.4) 30%,
      rgba(127, 89, 166, 0.2) 40%,
      hsla(270, 0%, 50%, 0) 50%
    ),
    radial-gradient(
      circle at 14.644660940672615% 14.64466094067263%,
      #ff00bf,
      rgba(242, 13, 185, 0.8) 10%,
      rgba(230, 25, 178, 0.6) 20%,
      rgba(204, 51, 166, 0.4) 30%,
      rgba(166, 89, 147, 0.2) 40%,
      hsla(315, 0%, 50%, 0) 50%
    );
`;

const LumSelect = styled.div`
  width: 4rem;
  height: 30rem;
  border-radius: 0.5rem;
  background: linear-gradient(
    to bottom,
    hsl(210, 100%, 100%),
    hsl(210, 100%, 50%),
    hsl(210, 100%, 0%)
  );
`;

export default function ColorPicker() {
  return (
    <Styles>
      <h1>Color Picker</h1>
      <ul>
        <li>
          <a href="https://en.wikipedia.org/wiki/HSL_and_HSV">
            https://en.wikipedia.org/wiki/HSL_and_HSV
          </a>
        </li>
      </ul>
      <h2>HSV</h2>
      <p>
        The Hue element is implemented as a <code>div</code> and a linear gradient with 25 stops at
        hues around the color wheel - 24 increments of 15 degrees with another to take us back
        around to the beginning. That many stops isn't strictly necessary, but it makes for a very
        accurate spectrum display. A slider will be used to allow the user to select a value between
        0 and 360.
      </p>
      <p>
        The saturation and value selector is more tricky. We have to layer three gradients to get
        the desired effect. The base color is the selected Hue at 100% Saturation and 50% Luminance.
        We layed upon that a linear gradient from the right starting at white and approaching full
        transparency, and finally another from the bottom, black to transparent. The user's
        selection will be used to determine the S and V values with the <code>x</code> position of
        the selection as the Saturation, and the <code>y</code> as the Value. We can then convert
        this HSV value to HSL as needed.
      </p>
      <HSVPicker>
        <HueSelect />
        <SatValSelect />
      </HSVPicker>
      <h2>HSL</h2>
      <p>
        To build a HSL picker we need to depict the hue and saturation as a radial gradient on a
        circle, with the hues 100% saturated and at 50% luminance around the perimeter and
        approaching full desaturation towards the center of the circle. This is accomplished with
        eight partially transparent radial gradients positioned around the circle. The degree of the
        selection around the circle would give up the Hue and the distance from the center would be
        the Saturation level. The user then selects the Luminance value from a slider.
      </p>
      <HSLPicker>
        <HueSatSelect />
        <LumSelect />
      </HSLPicker>
    </Styles>
  );
}
