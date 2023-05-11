import './App.scss';
import { Input } from './components/Input/Input';
import { Output } from './components/Output/Output';
import { MouseParallaxContainer, MouseParallaxChild } from "react-parallax-mouse";


function App() {
  return (
    <MouseParallaxContainer 
      className="App app__container parallax-container"
      globalFactorX={0.4}
      globalFactorY={0.4}
      resetOnLeave>
        <MouseParallaxChild 
          className="parallax-bkg"
          factorX={0.6}
          factorY={0.1}>
            <img src='../bkg/3.jpg'/>
        </MouseParallaxChild>
        <MouseParallaxChild
          className="parallax"
          factorX={0.1}
          factorY={0.1}>
          <Input/>
        </MouseParallaxChild>
        <MouseParallaxChild
          className="parallax"
          factorX={0.1}
          factorY={0.1}>
          <Output/>
        </MouseParallaxChild>
    </MouseParallaxContainer>
  );
}

export default App;
