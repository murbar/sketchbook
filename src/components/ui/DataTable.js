import React from 'react';
import styled from 'styled-components';

const Styles = styled.div``;

export default function DataTable({ data = [{}], fields = null }) {
  const fieldLabels = fields ? fields : Object.keys(data[0]);
  return (
    <Styles>
      <table>
        <thead>
          <tr>
            {fieldLabels.map(l => (
              <th key={l}>{l}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((record, i) => (
            <tr key={i}>
              {fieldLabels.map(l => (
                <td key={l}>{record[l]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Styles>
  );
}
