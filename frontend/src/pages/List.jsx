import React, { useState, useEffect } from "react";
import axios from "axios";
import Update from "../components/Update.jsx";
import './List.css';
const List = () => {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [text, setText] = useState("");
  const [updateId, setUpdateId] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetch = () => {
    setLoading(true);
    axios.get("https://ocr-backend-satp.onrender.com/api/card/cards").then((res) => {
      setLoading(false);
      setData(res.data);
    });
  };
  useEffect(() => {
    fetch();
  }, [updateId]);

  useEffect(() => {
    if (text) {
      let newArr = data.filter(
        (d) =>
          d.name.toLowerCase().includes(text.toLowerCase()) ||
          d.last_name.toLowerCase().includes(text.toLowerCase()) ||
          d.identification_number.toLowerCase().includes(text.toLowerCase())
      );
      setFiltered(newArr);
    } else {
      setFiltered(data);
    }
  }, [data, text]);

  const handleDelete = (id) => {
    console.log(id);
    axios.delete(`https://ocr-backend-satp.onrender.com/api/card/cards/${id}`).then(() => fetch());
  };

  console.log(data);
  if (loading) return <>Loading...</>;

  if (updateId) {
    return <Update id={updateId} setUpdateId={setUpdateId} />;
  }
  return (
      <div>
        <h2>Entries</h2>
      <div className="filter">
        <label
          className="filter-text"
        >
          Filter: 
        </label>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          size="30"
        />
      </div>
        <div className="all-list">
        {filtered.map((d) => (
          <div>
            <div className="text-of-list"
            >
              {`=> {`}
              "identification_number": "{d.identification_number}", "name": "
              {d.name}", "last_name": "{d.last_name}", "date-of-birth": "
              {d.date_of_birth}", "date-of-issue": "{d.date_of_issue}",
              "date-of-expiry": "{d.date_of_expiry}"{`}`}
            </div>
            <div className="btn-div">
              <button
                className="del-upd-btn1"
                onClick={() => handleDelete(d._id)}
              >
                Delete
              </button>
              <button
                className="del-upd-btn2"
                onClick={() => setUpdateId(d._id)}
              >
                Update
              </button>
            </div>
          </div>
        ))}
        </div>
      </div>
  );
};

export default List;
