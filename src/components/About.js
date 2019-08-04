import React, { useEffect } from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';
import config from 'config';
import ReactGA from 'react-ga';

export default function About() {
  useDocumentTitle('About this project');

  useEffect(() => {
    ReactGA.initialize(config.gaId);
    ReactGA.pageview('/');
  }, []);

  return (
    <div>
      <h2>About</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus, veritatis dicta
        non ea totam ullam aliquid eum ipsam vel recusandae asperiores, veniam culpa voluptatem
        perspiciatis repellat fugiat accusamus ut numquam!{' '}
      </p>
    </div>
  );
}
