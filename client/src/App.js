import React, { useContext, useState } from 'react';
import { observer } from "mobx-react-lite";
import { NavBar } from './components/NavBar/NavBar';
import { Body } from './components/Body/Body';
import './App.css';

let app
let prem
document.addEventListener('DOMContentLoaded', () => {
  app = document.querySelector('.app')
  prem = document.querySelector('.prem')
  console.log(app);
})


function getRandomColor() {
  const red = Math.floor(Math.random() * 256)
  const green = Math.floor(Math.random() * 256)
  const blue = Math.floor(Math.random() * 256)
  return `rgba(${red},${green},${blue})`
}
function changeBodyColor() {
  const color = getRandomColor()
  let gradient = `linear-gradient(0deg, ${color} 0%, ${color} 30%,${color} 100%)`
  let root = document.documentElement;
  // addEventListener.
  // root.style.setProperty('--gradient', gradient);
  if(app.style.backgroundColor){
    app.style.backgroundColor = color
  }

  let mask = document.querySelector('div.mask')
  console.log(mask);
  // mask.style.backgroundColor = gradient
  // linear-gradient(0deg, rgb(rgba(114,128,38)) 0%, rgb(rgba(114,128,38)) 30%,rgba(rgba(114,128,38),0) 100%);
  // `linear-gradient(0deg, rgb(${color}) 0%, rgb(${color}) 30%,rgba(${color},0) 100%)`
  // linear-gradient(0deg, rgb(114, 193, 176) 0%, rgb(114, 193, 176) 30%, rgba(114, 193, 176, 0) 100%);

}

function App() {

  const [generalSound, setGeneralSound] = useState(true);

  const changeToggle = (e) => {
    setGeneralSound(!generalSound)
    // console.log(generalSound);
  }

  changeBodyColor()
  setInterval(changeBodyColor, 1000)
  return (
    <div className="App">
      {console.log('App')}
      <NavBar changeToggle={changeToggle} sound={generalSound} />
      <Body sound={generalSound} />
    </div>
  );
}

export default App;
