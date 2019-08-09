import React, { useState } from 'react';
import styled from 'styled-components';
import CodeSnippet from 'components/ui/CodeSnippet';
import dummyData from './dummyData.json';

const Styles = styled.div``;

const Status = styled.div`
  font-style: italic;
`;

const stringifyPretty = obj => {
  return JSON.stringify(obj, null, 2);
};

const parseUploadedFileData = jsonDataString => {
  // do other things
  return JSON.parse(jsonDataString);
};

export default function DataImportExport() {
  const [statusMessage, setStatusMessage] = useState('');
  const [uploadedData, setUploadedData] = useState(dummyData);

  const handleDataDownload = () => {
    const a = document.createElement('a');
    a.href = 'data:application/octet-stream,' + encodeURIComponent(stringifyPretty(uploadedData));
    a.download = 'dataExport.json';
    a.click();
  };

  const handleDataUpload = e => {
    setStatusMessage('');
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onload = e => {
      try {
        const data = parseUploadedFileData(e.target.result);
        setUploadedData(data);
        setStatusMessage('Your data was successfully uploaded!');
      } catch (error) {
        setUploadedData(null);
        setStatusMessage('Sorry, there was an error uploading the data. Invalid JSON?');
      }
    };
    reader.readAsText(file);
  };

  return (
    <Styles>
      <h1>Data import/export</h1>

      <h2>Data</h2>
      {statusMessage && <Status>{statusMessage}</Status>}
      {uploadedData && (
        <div>
          <CodeSnippet truncate>{stringifyPretty(uploadedData)}</CodeSnippet>
        </div>
      )}
      <h2>Download</h2>
      <p>
        Save data in JSON format{' '}
        <button onClick={handleDataDownload} disabled={uploadedData === null}>
          Export
        </button>
      </p>

      <h2>Upload</h2>
      <p>Upload JSON data</p>
      <input type="file" id="map-data-file" onChange={handleDataUpload} />
    </Styles>
  );
}
