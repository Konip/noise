import './App.css';
import { NavBar } from './components/NavBar/NavBar'
import { Body } from './components/Body/Body'

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
  // body.style.transition = '5s'
}


function App() {
  changeBodyColor()
  setInterval(changeBodyColor, 10000)
  return (
    <div className="App">
      {/* {console.log('renader')} */}
      <NavBar />
      <Body />
    </div>
  );
}

export default App;
