import React, { useContext, useState } from 'react';
import './App.css';
import { Body } from './components/Body/Body';
import Modal from './components/Modal/Modal';
import { NavBarVertical } from './components/NavBar/NavBarVertical';
import { Context } from "./Context";

let increment = [];
let distance = [];
let targetColor = generateRGB();
let mask = document.body.getElementsByClassName('mask')
let isAuth = false

function getElementBG(elm) {
  var bg = getComputedStyle(elm).backgroundColor;
  bg = bg.match(/\((.*)\)/)[1];
  bg = bg.split(',');
  for (var i = 0; i < bg.length; i++) {
    bg[i] = parseInt(bg[i], 10);
  }
  if (bg.length > 3) {
    bg.pop();
  }
  return bg;
}

// A function to generate random numbers.
// Will be needed to generate random RGB value between 0-255.
function random() {
  if (arguments.length > 2) {
    return 0;
  }
  switch (arguments.length) {
    case 0:
      return Math.random();
    case 1:
      return Math.round(Math.random() * arguments[0]);
    case 2:
      var min = arguments[0];
      var max = arguments[1];
      return Math.round(Math.random() * (max - min) + min);
  }
}

// Generates a random RGB value.
function generateRGB(min, max) {
  var min = min || 0;
  var max = min || 255;
  var color = [];
  for (var i = 0; i < 3; i++) {
    var num = random(min, max);
    color.push(num);
  }
  return color;
}

// Calculates the distance between the RGB values.
// We need to know the distance between two colors
// so that we can calculate the increment values for R, G, and B.
function calculateDistance(colorArray1, colorArray2) {
  distance = [];
  for (var i = 0; i < colorArray1.length; i++) {
    distance.push(Math.abs(colorArray1[i] - colorArray2[i]));
  }
  return distance;
}

// Calculates the increment values for R, G, and B using distance, fps, and duration.
// This calculation can be made in many different ways.
function calculateIncrement(distanceArray, fps, duration) {
  var fps = fps || 30;
  var duration = duration || 1;
  increment = [];
  for (var i = 0; i < distanceArray.length; i++) {
    var incr = Math.abs(Math.floor(distanceArray[i] / (fps * duration)));
    if (incr == 0) {
      incr = 1;
    }
    increment.push(incr);
  }
  return increment;
}

// Converts RGB array [32,64,128] to HEX string #204080
// It's easier to apply HEX color than RGB color.
function rgb(colorArray) {
  let red = colorArray[0];
  let green = colorArray[1];
  let blue = colorArray[2];
  return `${red},${green},${blue}`
}

/* ==================== Setup ==================== */
// Duration is not what it says. It's a multiplier in the calculateIncrement() function.
// duration = 1-4, fast-to-slow
var fps = 30;
var duration = 4;
var transElement = document.body;
transElement.style.backgroundColor = "rgb(67, 148, 121)"
// transElement.style.backgroundColor = "rgb(92, 229, 180)" // initial color
var currentColor = getElementBG(transElement);
var transHandler = null;

/* ==================== Transition Initiator ==================== */
function startTransition() {
  clearInterval(transHandler);

  targetColor = generateRGB();
  distance = calculateDistance(currentColor, targetColor);
  increment = calculateIncrement(distance, fps, duration);
  transHandler = setInterval(function () {
    transition();
  }, 10000 / fps);
  // }, 20000 / fps);
}

/* ==================== Transition Calculator ==================== */
function transition() {
  // checking R
  if (currentColor[0] > targetColor[0]) {
    currentColor[0] -= increment[0];
    if (currentColor[0] <= targetColor[0]) {
      increment[0] = 0;
    }
  } else {
    currentColor[0] += increment[0];
    if (currentColor[0] >= targetColor[0]) {
      increment[0] = 0;
    }
  }

  // checking G
  if (currentColor[1] > targetColor[1]) {
    currentColor[1] -= increment[1];
    if (currentColor[1] <= targetColor[1]) {
      increment[1] = 0;
    }
  } else {
    currentColor[1] += increment[1];
    if (currentColor[1] >= targetColor[1]) {
      increment[1] = 0;
    }
  }

  // checking B
  if (currentColor[2] > targetColor[2]) {
    currentColor[2] -= increment[2];
    if (currentColor[2] <= targetColor[2]) {
      increment[2] = 0;
    }
  } else {
    currentColor[2] += increment[2];
    if (currentColor[2] >= targetColor[2]) {
      increment[2] = 0;
    }
  }

  let color = rgb(currentColor)
  transElement.style.backgroundColor = `rgb(${color})`
  let gradient = `linear-gradient(0deg, rgb(${color}) 0%, rgb(${color}) 30%, rgba(${color.slice(0, color.length - 1) + ', 0)'} 100%)`

  if (!isAuth) {
    for (let el of mask) {
      el.style.backgroundImage = gradient
    }
  }

  if (increment[0] == 0 && increment[1] == 0 && increment[2] == 0) {
    startTransition();
  }
}

function App() {

  const [modalActive, setModalActive] = useState(false);
  const [typeModal, setTypeModal] = useState();

  const ctx = useContext(Context)
  isAuth = ctx.isAuth

  const aCtx = new AudioContext();
  let constantNode = aCtx.createGain()
  
  // startTransition();

  const setIsAuth = (payload) => {
    console.log('setIsAuth',isAuth);
    isAuth = payload

    for (let el of mask) {
      el.style.backgroundImage = 'none'
      el.style.visibility = 'hidden'
    }
  }
  const openModal = (activeModal, typeModal) => {
    console.log(activeModal, typeModal);
    setModalActive(activeModal)
    setTypeModal(typeModal)
  }

  return (
    <div className="App">
      {console.log('App')}
      {/* <NavBar  isAuth={ctx.isAuth} checkAuth={ctx.checkAuth}
        login={ctx.login} registration={ctx.registration} logout={ctx.logout} setIsAuth={setIsAuth}
      
      /> */}
      {/* <NavBarVertical openModal={openModal} /> */}
       <NavBarVertical isAuth={ctx.isAuth}  checkAuth={ctx.checkAuth}
        login={ctx.login} registration={ctx.registration} logout={ctx.logout} setIsAuth={setIsAuth}
        openModal={openModal} 
      />
      <Body openModal={openModal}  type={typeModal} constantNode={constantNode}
      />
      <Modal openModal={openModal} active={modalActive} setActive={setModalActive} type={typeModal} registration={ctx.registration} login={ctx.login} />
     
    </div>
  );
}

export default App;
