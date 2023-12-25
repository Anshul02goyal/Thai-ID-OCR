import React , {useState}from 'react'
import axios from "axios"
const Ocr = () => {
  const [file,setFile] = useState(null);
  const [response,setResponse] = useState(null);

  const handleSubmit = async() => {
    let formData = new FormData();
    formData.append("files", file);
    console.log(formData)
    const res = await axios.post("https://ocr-backend-satp.onrender.com/api/upload", formData);
    console.log("axios",res)
    setResponse(res.data);
  }
  return (
    <div>
    <div>
      <h1>Optical Character Recognition Application</h1>
    </div>
    <div id="uploader">
      <div
        id="frmUploader"
       
      >
        <input type="file" name="image" id="image"  onChange={(e) => setFile(e.target.files[0])}/>
        <button  id="btnSubmit" onClick={handleSubmit}>Upload </button>
      </div>
    </div>
{response && <div style={{
  color: 'white',
  margin: '20px',
  textAlign: 'center'
}}>{`{`}
                "identification_number": "{response.identification_number}",
                "name": "{response.name}",
                "last_name": "{response.last_name}",
                "date-of-birth": "{response.date_of_birth}",
                "date-of-issue": "{response.date_of_issue}",
                "date-of-expiry": "{response.date_of_expiry}"
                {`}`}
        </div>}
  </div>
  )
}

export default Ocr