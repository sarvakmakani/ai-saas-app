import React from 'react'
import Spline from '@splinetool/react-spline';
import TypingEffect from './ui/typingEffect';

const Robot = () => {
  return (
    <div className="flex justify-center items-center mt-10 flex-row">
     <TypingEffect />
    <div className="rounded-2xl  shadow-lg">
     <Spline
        scene="https://prod.spline.design/9vrxvm7fDwLq4QF3/scene.splinecode" 
        style={{
        width:600,
        height:700}}
      />
    </div>
    
  </div>
  )
}

export default Robot