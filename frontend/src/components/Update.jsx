import React from 'react'
import axios from "axios"
import './Update.css'
const Update = ({id, setUpdateId}) => {
  const [data,setData] = React.useState(null);
  const [loading,setLoading] = React.useState(false);

  const fetch = () => {
    setLoading(true);
    axios.get(`https://ocr-backend-satp.onrender.com/api/card/cards/${id}`).then((res) => {setLoading(false);setData(res.data)})
}
React.useEffect(() => {
    fetch();
},[id])

const handleSubmit = () => {
  const config = {
    headers: { 'Content-Type': 'application/json' },
}
console.log("update",data)
  axios.post(`https://ocr-backend-satp.onrender.com/api/card/cards/${id}`,data,config).then(() => setUpdateId(null));
}

if(loading || !data)return <>Loading...</>
  return (
    <div>
        <button className='btl-btn' onClick={() => setUpdateId(null)}>Back to List</button>
                <div className='box'>
                <div>
                "identification_number": <input type="text" value={data.identification_number} onChange={(e) =>{let nd = {...data};
                nd.identification_number = e.target.value; setData(nd)}}/> </div>
                <div>    "name": <input type="text" value={data.name} onChange={(e) =>{let nd = {...data};
                nd.name = e.target.value; setData(nd)}}/></div>
                <div> "last_name": <input type="text" value={data.last_name} onChange={(e) =>{let nd = {...data};
                nd.last_name = e.target.value; setData(nd)}}/></div>
                <div>  "date-of-birth": <input type="text" value={data.date_of_birth} onChange={(e) =>{let nd = {...data};
                nd.date_of_birth = e.target.value; setData(nd)}}/></div>
                <div>  "date-of-issue": <input type="text" value={data.date_of_issue} onChange={(e) =>{let nd = {...data};
                nd.date_of_issue = e.target.value; setData(nd)}}/></div>
                <div>  "date-of-expiry": <input type="text" value={data.date_of_expiry} onChange={(e) =>{let nd = {...data};
                nd.date_of_expiry = e.target.value; setData(nd)}}/></div>
                
        <button style={{
          cursor: 'pointer',
          borderRadius: '10px',
          padding: '10px',
          margin: '20px'
        }} onClick={handleSubmit}>Submit</button>
        </div>
        </div>
  )
}

export default Update