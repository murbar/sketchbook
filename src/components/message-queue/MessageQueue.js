import React, { useState } from 'react';
import styled from 'styled-components';
import useExpiresArray from 'hooks/useExpiresArray';

const Styles = styled.div``;

export default function MessageQueue() {
  const { items, add, count } = useExpiresArray();
  const [inputs, setInputs] = useState({ delay: 1000 });

  const addMessage = e => {
    e.preventDefault();
    add(inputs.message, inputs.delay);
    setInputs(prev => ({ ...prev, message: '' }));
  };

  const handleOnChange = e => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Styles>
      <h1>Message Queue</h1>
      <p>Messages are removed from the queue after an interval.</p>
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
        {items.map((item, i) => {
          return <li key={i}>{item.data}</li>;
        })}
      </ul>
    </Styles>
  );
}
