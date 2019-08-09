import React, { useEffect } from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import config from 'config';
import Header from 'components/Header';
import ReactGA from 'react-ga';

export default function About() {
  useDocumentTitle('About this project');

  useEffect(() => {
    ReactGA.initialize(config.gaId);
    ReactGA.pageview('/');
  }, []);

  return (
    <div>
      <Header />
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, veritatis dicta
        non ea totam ullam aliquid eum ipsam vel recusandae asperiores, veniam culpa voluptatem
        perspiciatis repellat fugiat accusamus ut numquam!{' '}
      </p>
      <h2>Things to add</h2>
      <ul>
        <li>File import/export</li>
        <li>Self-destructing message queue</li>
        <li>Hooks demo page</li>
        <li>Make this list interactive and persistent</li>
      </ul>
    </div>
  );
}
