import React, { useRef } from 'react';
import { IconButton } from '@mui/material';
import FileUploadIcon from '@mui/icons-material/UploadFile';

const FileUploadButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click event
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the file
    if (file) {
      // Handle the file upload
      console.log('Uploading file: ', file);
      // Here you can implement the file upload logic.
    }
  };

  return (
    <>
      <IconButton color="primary" aria-label="upload file" onClick={handleClick}>
        <FileUploadIcon />
      </IconButton>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </>
  );
};

export default FileUploadButton;
