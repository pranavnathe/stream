import React, { useRef, useState, useImperativeHandle } from 'react';
import { toast } from 'react-toastify';

const Uploader = ({ 
  className = "", 
  fileFormat = "image/*", 
  name, 
  onChange, 
  imageUrl,
  maxImageSize = 1, // Default maximum size for images: 1MB
  maxVideoSize = 3 // Default maximum size for videos: 3MB
}, ref) => {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file selected");
  const icon = <span className='text-4xl z-10'>📂</span>;
  const iconVideo = <span className='text-4xl'>🎬</span>;

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      if (fileFormat.startsWith("image") && selectedFile.size > (maxImageSize * 1024 * 1024)) {
        toast.error(`Image should be less than ${maxImageSize} MB`);
        return;
      }
      if (fileFormat.startsWith("video") && selectedFile.size > (maxVideoSize * 1024 * 1024)) {
        toast.error(`Video should be less than ${maxVideoSize} MB`);
        return;
      }
      setFile(URL.createObjectURL(selectedFile));
      setFileName(selectedFile.name);
      if (onChange) {
        // onChange(URL.createObjectURL(selectedFile)); // Call the onChange callback with the selected file
        onChange(selectedFile);
      }
    }
  };

  const handleClear = () => {
    setFile(null);
    setFileName("No file selected");
    inputRef.current.value = null;
  };

  useImperativeHandle(ref, () => ({
    clearFile: handleClear
  }));

  return (
    <>
      {name && <p className='-mb-2 sm:-mb-0 sm:pl-2 sm:text-lg place-self-start font-semibold'>{name}</p>}
      <div 
        className={`relative flex flex-col justify-center items-center border-2 border-dashed h-52 w-full max-w-60 sm:max-w-96 cursor-pointer dark:border-white ${className}`}
        onClick={handleClick}
      >
        <input 
          ref={inputRef}
          type='file' 
          accept={fileFormat}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        
        {fileFormat.startsWith("video") && file ? (
          <>
            {file ? <video src={file} className='w-full h-full object-cover' controls /> : iconVideo}
          </>
        ) : (
          <>
            {
              imageUrl && !file ? 
              <>
                <div className='absolute w-full h-full bg-grey1 flex flex-col justify-center items-center'>
                  {icon}
                  <span className='text-xs pt-1 font-bold z-10'>Browse files</span>
                </div>
                <img src={imageUrl} className='absolute w-full h-full object-cover opacity-50' alt={imageUrl}/>
              </>
              :
                (
                  file 
                  ? 
                  <img src={file} className='w-full h-full object-cover' alt={fileName}/> 
                  : 
                  <div className='absolute w-full h-full bg-slate-400 dark:bg-grey1 flex flex-col justify-center items-center'>
                    {icon}
                    <span className='text-xs pt-1 font-bold z-10'>Browse files</span>
                  </div>
                )
            }
          </>
        )}
      </div>
      <div className='flex w-full sm:w-96 justify-between sm:p-2'>
        <p className='max-w-60 sm:max-w-80 max-h-7 overflow-hidden overflow-ellipsis dark:text-white'>{fileName}</p>
        {file && <button className='font-bold text-lg' onClick={handleClear}>❌</button>}
      </div>
    </>
  );
};

export default React.forwardRef(Uploader);
