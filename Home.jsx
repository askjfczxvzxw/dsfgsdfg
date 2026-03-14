import { useState, useEffect } from 'react'
import { Routes, Route, Link } from "react-router-dom"
import '../index.css'
import PageButton from '../components/PageButton'
import { useLocation } from "react-router-dom";

function App() {

  const [logoHover, setLogoHover] = useState(false)
  const [logoSpin, setLogoSpin] = useState(0)
  const [gifSrc, setGifSrc] = useState(null)
  const [intro, setIntro] = useState(true)
  const [visible, setVisible] = useState("front")

  const location = useLocation();

  useEffect(() => {
    document.querySelector("div").className = location.pathname.replace("/", "") + "page"
  }, [location]);

  const secret = Math.floor(Math.random() * 100)
  useEffect(() => {
  if (secret >= 95) {
    const rand = Math.floor(Math.random() * 3)
    console.log(rand);
    if (rand == 0) {
      setGifSrc("parrot-party")
      return
    } else if (rand == 1) {
      setGifSrc("pig-car-ride")
      return
    } else {
      setGifSrc("slav-dance")
      return
    }
   }
  }, [])

  useEffect(() => {
    if (screen.width < 600) return
    const intervalId = setInterval(() => {
      if (logoHover) {
        setLogoSpin(s => s = s + 2)
      } else {
        setLogoSpin(0)
      }
    }, 20)

    return () => clearInterval(intervalId)
  }, [logoHover, screen.width])

  return (
    <>
      {gifSrc !== null ? <img src={`./src/assets/${gifSrc}.gif`} className='secret-gif'></img> : ""}
      <header>
        <div className='header-img'>
          <div className='logo-holder' onMouseEnter={() => setLogoHover(true)} onMouseLeave={() => setLogoHover(false)}>
            <img 
            src="./src/assets/uchwyt.png" 
            alt="janusiek" className={`logo ${intro ? " animate__animated animate__jackInTheBox": ""}`} 
            style={{transform: `rotateY(${logoSpin}deg)`}}
            onAnimationEnd={() => setIntro(false)}
            ></img>
          </div>
        </div>
        <h1 style={{whiteSpace: "nowrap"}}>Codzienna dawka janowości!</h1>
      </header>
      <main className='main-main'>
        <div className='mobile-btns' style={{display: screen.width >= 600 ? "block" : "flex"}}>
          <PageButton title="filmy" img="1" startX={0} startY={150} 
          angle={4.5} link={"/filmy"} state={visible} visible="front" icon="film"/>

          <PageButton title="sklep" img="2" startX={0} startY={150} 
          angle={6} link={"/sklep"} state={visible} visible="front" icon="WOZEK"/>

          <PageButton title="newsy" img="3" startX={0} startY={150} 
          angle={7.5} link={"/newsy"} state={visible} visible="front" icon="megafon"/>

          <PageButton title="faq" img="4" startX={0} startY={150} 
          angle={3} link={"/faq"} state={visible} visible="front" icon="co"/>

          <PageButton title="dźwięki" img="5" startX={0} startY={150} 
          angle={3} link={"/dzwieki"} state={visible} visible="back" icon="spiker"/>

          <PageButton title="kill the janek" img="6" startX={0} startY={150} 
          angle={4.5} link={"/ktj"} state={visible} visible="back"/>

          <PageButton title="cytaty" img="7" startX={0} startY={150} 
          angle={6} link={"/cytaty"} state={visible} visible="back" icon="dymek"/>

          <PageButton title="Kliker" img="8" startX={0} startY={150} 
          angle={7.5} link={"/jajo"} state={visible} visible="back" icon="jajo2"/>
        </div>
          <button className='switch-btns-btn' onClick={() => visible == "front" ? setVisible("back") : setVisible("front")}>
          <img src='./src/assets/guzik.png' alt='zamien przyciski'></img>
        </button>

      </main>
    </>
  )
}

export default App
