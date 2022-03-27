import { useState } from 'react'

import './App.css'
import DropFileInput from './components/drop-file-input/DropFileInput'
import { ImageConfig } from './config/ImageConfig';


function App() {

  const onFileChange = (files) => {
    // console.log(files)
  }

  return (
 
    <div className="box">
      <h2 className='header'>
        React drop files input
      </h2>
      <DropFileInput onFileChange={(files) => onFileChange(files)} />
    </div>
   
  )
}

export default App