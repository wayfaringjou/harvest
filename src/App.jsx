import React, { useState } from 'react';
import AreasAPIService from './services/areas-api-service';
import ElementOverview from './ElementOverview';
import './App.css';

function App() {
  const [errorMsg, setErrorMsg] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [postData, setPostData] = useState(null);

  const url = postData && 'http://localhost:5000/api/garden/areas';

  const { status, data, error } = AreasAPIService.postArea(url, postData, setErrorMsg);
  console.log(error);

  console.log(data);

  return (
    <div className="App">
      {errorMsg && <aside>{errorMsg}</aside>}
      <ElementOverview />
      <main>
        <p>{status}</p>
      </main>
    </div>
  );
}

export default App;
