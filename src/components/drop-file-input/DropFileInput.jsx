import React, { useRef, useState } from "react";

import "./drop-file-input.css";
import { ImageConfig } from "../../config/ImageConfig";
import uploadImg from "../../assets/upload.png";

const DropFileInput = (props) => {
    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);
    const [message, setMessage] = useState("Anexe seus arquivos")
    const onDragEnter = (e) => {
        setMessage('Solte seus arquivos aqui :)')
        wrapperRef.current.classList.add("dragover")
    };
    const onDragLeave = () => {
        wrapperRef.current.classList.remove("dragover")
        setMessage('Anexe seus arquivos');
    };
    const onDrop = () => wrapperRef.current.classList.remove("dragover");
  
    const onFileDrop = (e) => {
   
      const newFile = [...e.target.files];
        
      if (newFile) {
        setFileList([...fileList, ...newFile]);
        props.onFileChange(fileList);
      }
    };
  
    const fileRemove = (file) => {
      const updatedList = [...fileList];
      updatedList.splice(fileList.indexOf(file), 1);
      setFileList(updatedList);
    //   props.onFileChange(updatedList);
    }

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
     
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" />
          <p>{message}</p>
          <span>Mereço um aumento ;)</span>
        </div>
        <input type="file" value="" onChange={onFileDrop} multiple  />
      </div>
      {fileList.length > 0 ? (
          <div className="drop-file-preview">
              <p className="drop-file-preview__title">
                  Ready to upload
              </p>
              {
                  fileList.map((item, index) => (
                      <div key={index} className="drop-file-preview__item">
                          <img src={ImageConfig[item.type.split('/')[1]] || ImageConfig['default']} alt="" />
                          
                          <div className="drop-file-preview__item__info">
                              <p>{item.name}</p>
                              <p>{item.size}</p>
                          </div>
                          <span className="drop-file-preview__item__del" onClick={()=> fileRemove(item)}>X</span>  
                      </div>

                  ))
              }
          </div>
      ) : null
    }
    </>
  );
};

export default DropFileInput;