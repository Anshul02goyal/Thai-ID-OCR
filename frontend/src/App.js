import './App.css';
import Ocr from "./pages/Ocr.jsx"
import List from "./pages/List.jsx"
import {useState}from "react"
function App() {
  const [show,setShow] = useState(false);
  return (
    <>
    {!show && <button style={{fontSize: 'xx-large',
    color: 'whitesmoke', 
    backgroundColor: 'black',
    cursor: 'pointer',  
    marginBottom: '8%',
    padding: '15px',
    borderRadius: '10px', 
    marginLeft:'42%',
    position: 'absolute', 
    bottom: '0'}} onClick={() => setShow(true)}>List all entries</button>}

   {show && <button className="ocr-btn"   onClick={() => setShow(false)}>Back to OCR</button>}
     {!show && <Ocr />}
    {show && <List />}
    </>
  );
}

export default App;
