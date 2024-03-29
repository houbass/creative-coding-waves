import { useRef, useState } from 'react';
import './App.css';

//components
import Ui from './components/Ui';
import Canvas from './components/Canvas';
import CanvasRecorder from './components/Recording';

function App() {

  
  // REFS
  const canvasRef = useRef(null);   
  const images = useRef([]);

  // STATES
  // canvas settings
  const [canvasSize, setCanvasSize] = useState(0);
  const [recHandler, setRecHandler] = useState(false);
  // annimation settings states
  const [animateHandler, setAnimateHandler] = useState(true);
  const [drawHandler, setDrawHandler] = useState(false);
  const [reset, setReset] = useState(true);
  
  return (
    <div className="App">

      <Ui 
        setCanvasSize={setCanvasSize} 
        recHandler={recHandler}
        setRecHandler={setRecHandler} 
        images={images} 
        animateHandler={animateHandler}
        setAnimateHandler={setAnimateHandler}
        drawHandler={drawHandler}
        setDrawHandler={setDrawHandler} 
        reset={reset}
        setReset={setReset}
      />
      
      <Canvas 
      canvasRef={canvasRef}
      canvasSize={canvasSize} 
      recHandler={recHandler} 
      images={images}
      animateHandler={animateHandler}
      drawHandler={drawHandler}
      reset={reset}
      />

      <CanvasRecorder 
      canvasRef={canvasRef} 
      canvasSize={canvasSize} 
      />

    </div>
  );
}

export default App;
