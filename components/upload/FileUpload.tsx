'use client';
import React, { useRef, useState } from 'react';
import './FileUpload.css';
import Upload from 'rc-upload';
const FileUpload = () => {
  const inputRef = useRef();

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('select');

  const handleFileChange = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const clearFileInput = () => {
    inputRef.current.value = '';
    setSelectedFile(null);
    setProgress(0);
    setUploadStatus('select');
  };

  const handleUpload = async () => {
    if (uploadStatus === 'done') {
      clearFileInput();
      return;
    }

    try {
      setUploadStatus('uploading');

      const formData = new FormData();
      let response: any = await fetch('/api/folder', {
        method: 'POST',
        body: formData,
      });
      response = await response.json();
      // const response = await axios.post(
      //   "http://localhost:8000/api/upload",
      //   formData,
      //   {
      //     onUploadProgress: (progressEvent) => {
      //       const percentCompleted = Math.round(
      //         (progressEvent.loaded * 100) / progressEvent.total
      //       );
      //       setProgress(percentCompleted);
      //     },
      //   }
      // );

      setUploadStatus('done');
    } catch (error) {
      setUploadStatus('select');
    }
  };

  return (
    <div>
      <Upload></Upload>
    </div>
  );
};

export default FileUpload;
