import React, { useState } from 'react';
import styled from 'styled-components';
import useExpiresArray from 'hooks/useExpiresArray';
import { useTransition, animated } from 'react-spring';
import useDocumentTitle from 'hooks/useDocumentTitle';

const Styles = styled.div`
li`;

export default function MessageQueue() {
  const { items, add, remove, count } = useExpiresArray();
  const [inputs, setInputs] = useState({ delay: 3000 });
  const itemsTransition = useTransition(items, m => m.id, {
    from: {
      opacity: 0,
      height: '0em'
    },
    enter: {
      opacity: 1,
      height: '2em'
    },
    leave: {
      opacity: 0,
      height: '0em'
    }
  });

  const addMessage = e => {
    e.preventDefault();
    add(inputs.message, inputs.delay);
    setInputs(prev => ({ ...prev, message: '' }));
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  useDocumentTitle('Message Queue');

  return (
    <Styles>
      <h1>Message Queue</h1>
      <p>
        Messages are removed from the queue after an interval. Added transitions with{' '}
        <code>react-spring</code>.
      </p>
      <h2>Add message</h2>
      <form onSubmit={addMessage}>
        <input
          type="text"
          name="message"
          value={inputs.message || ''}
          onChange={handleOnChange}
          placeholder="Message text"
        />
        <input
          type="number"
          name="delay"
          value={inputs.delay || 1000}
          onChange={handleOnChange}
          placeholder="Delay ms"
        />
        <button onClick={addMessage}>Add</button>
      </form>
      <h2>Queue - {count} items</h2>
      <ul>
        {itemsTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.li key={key} style={props}>
                {item.data} <button onClick={() => remove(item.id)}>X</button>
              </animated.li>
            )
        )}
      </ul>
    </Styles>
  );
}
