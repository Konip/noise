import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { Body } from './components/Body/Body'
import { useState } from 'react';

let body = document.querySelector('body')

function getRandomColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgba(${red},${green},${blue})`
}
function changeBodyColor() {
  const color = getRandomColor()
  body.style.backgroundColor = color
}

function App() {

  const [generalSound, setGeneralSound] = useState(true)

  const changeToggle = (e) => {
    setGeneralSound(!generalSound)
    console.log(generalSound);
  }

  changeBodyColor()
  setInterval(changeBodyColor, 10000)
  return (
    <div className="App">
      {/* {console.log('App')} */}
      <NavBar changeToggle={changeToggle} sound={generalSound}/>
      <Body sound={generalSound} />
    </div>
  );
}

export default App;