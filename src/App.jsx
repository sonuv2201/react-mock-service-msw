import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  useEffect(()=>{
    stringBuffer();
  },[count])

  const stringBuffer = async () =>{
    let res = await fetch('/api/text-stream');
    let arrayBuffer = await res.arrayBuffer();
    
    // Usage example
    // const stringBuffers = 'column1,column2,column3\nvalue1,value2,value3';
    const fileName = 'data.csv';
    downloadAsCSV(arrayBuffer, fileName);
  }


  const fetchImage = async () =>{
    let res = await fetch('/images');
    let blob = await res.blob()
    const objectURL = URL.createObjectURL(blob);

    // Use the object URL as the source of an image element
    const image = document.createElement('img');
    image.src = objectURL;

    // Append the image element to the DOM
    document.body.appendChild(image);

  }


  const fetchData = async () =>{
    let res = await fetch('/products?id=1&id=2&id=3');
    let status = res.status;
    console.log(status)
  }

  const loginData = async () =>{
    let res = await fetch('/login',{
      method:"POST",
      body:JSON.stringify({
        username:'admin',
        password:'1234'
      })
    });
    let status = res.status;
    console.log(status)
  }




  const downloadAsCSV = (content, fileName) => {
    const csvData = new Blob([content], { type: 'text/csv' });
  
    // Create a download link
    const downloadLink = document.createElement('a');
    downloadLink.href = URL.createObjectURL(csvData);
    downloadLink.download = fileName;
  
    // Append the link to the DOM and trigger the download
    document.body.appendChild(downloadLink);
    downloadLink.click();
  
    // Clean up
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(downloadLink.href);
  };
  

  
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
