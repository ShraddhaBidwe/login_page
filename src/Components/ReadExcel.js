import React from 'react';
import './ReadExcel.css';
import { useState } from 'react';
import axios from 'axios'; //  This library is imported to handle the HTTP request to upload the file
import * as XLSX from 'xlsx'; //reading data from excel file

const ReadExcel = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e, file) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    axios.post('http://localhost:8083/users/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((response) => {
        if (response.status === 200) {
          alert("File uploaded successfully");
        } else {
          alert("Failed to upload file");
        }
      })
      .catch((errorMsg) => {
        console.log(errorMsg);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      setErrorMsg('Please upload a file in .xlsx format.');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      handleSubmit(e, file);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className='container'>
      <div className='file-upload'>
        <h1>Connecticus Technologies</h1>
        <form onSubmit={(e) => handleSubmit(e, e.target.file)} className='upload-section'>
          <h3>Upload Excel File Here</h3>
          <input type='file' className='form-control' name='file' onChange={handleFileUpload} />
          {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
          <button type='submit' className='upload-btn'>Upload</button>
        </form>
      </div>
    </div>
  );
};

export default ReadExcel;
