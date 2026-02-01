import { useLayoutEffect, useRef, useState, useEffect } from 'react'
import gsap from 'gsap'
import './App.css'
import { motion } from "motion/react"

function App() {
  const comp = useRef(null)

  // hooks at top level
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const [cursorVariant, setCursorVariant] = useState("default")

  // mouse tracking
  useEffect(() => {
    const mouseMove = (e) => {
      const pos = { x: e.clientX, y: e.clientY }
      console.log(pos)
      setMousePosition(pos)
    }

    window.addEventListener("mousemove", mouseMove)
    return () => window.removeEventListener("mousemove", mouseMove)
  }, [])

  // GSAP animations
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.from("#intro-slider", {
        xPercent: "-100",
        duration: 1.3,
        delay: 0.3,
      })
        .from(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: 80,
          stagger: 0.5,
        })
        .to(["#title-1", "#title-2", "#title-3"], {
          opacity: 0,
          y: -80,
          delay: 0.3,
          stagger: 0.5,
        })
        .to("#intro-slider", {
          xPercent: "-100",
          duration: 1.3,
        })
        .from("#welcome", {
          opacity: 0,
          duration: 0.5,
        })
        .from("#scroll", {
          opacity: 0,
          duration: 0.5,
        })
    }, comp)

    return () => ctx.revert()
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "white",
      mixBlendMode: 'difference'
    }
  }

  const textEnter = () => setCursorVariant("text")
  const textLeave = () => setCursorVariant("default")

  return (
    <div className="relative" ref={comp}>
      <motion.div
        className='cursor'
        variants={variants}
        animate={cursorVariant}
      />
      <div
        id="intro-slider"
        className="h-screen bg-gray-50 absolute w-full flex justify-center items-center tracking-tight"
      >
        <h1 className="p-10 text-3xl" id="title-1">Web Developer</h1>
        <h1 className="p-10 text-3xl" id="title-2">Web Designer</h1>
        <h1 className="p-10 text-3xl" id="title-3">Graphic Designer</h1>
      </div>

      <div className="h-screen bg-gray-950 flex justify-center items-center">
        <h1 onMouseEnter={textEnter} onMouseLeave={textLeave} id="welcome" className="text-9xl font-bold text-gray-100">
          Welcome.
        </h1>
        <div className='fixed text-gray-100 bottom-0 right-0'>
          <div
            id="scroll"
            className="flex flex-col items-center gap-2 p-5 text-xs"
          >
            <span className="leading-none">S</span>
            <span className="leading-none">C</span>
            <span className="leading-none">R</span>
            <span className="leading-none">O</span>
            <span className="leading-none">L</span>

            <span className="flex justify-center items-center w-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

    </div>
  )
}

export default App
