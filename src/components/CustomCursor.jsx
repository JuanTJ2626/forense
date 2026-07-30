import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const followerRef = useRef(null)

  useEffect(() => {
    // Esconder cursor del body está en App.css
    
    let mouseX = 0
    let mouseY = 0
    let followerX = 0
    let followerY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      
      gsap.to(cursorRef.current, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    let rAfId;

    const followLoop = () => {
      // Lerp for smooth following
      followerX += (mouseX - followerX) * 0.15
      followerY += (mouseY - followerY) * 0.15

      if (followerRef.current) {
        gsap.set(followerRef.current, {
          x: followerX,
          y: followerY
        })
      }

      rAfId = requestAnimationFrame(followLoop)
    }

    // Hover effects on interactives
    const interactives = document.querySelectorAll('button, a, input, .nav-link')
    
    const onMouseEnter = () => {
      gsap.to(cursorRef.current, { scale: 0, opacity: 0, duration: 0.2 })
      gsap.to(followerRef.current, { 
        scale: 1.5, 
        backgroundColor: 'rgba(229, 57, 53, 0.2)',
        borderColor: 'rgba(229, 57, 53, 0.8)',
        backdropFilter: 'blur(4px)',
        duration: 0.3 
      })
    }
    
    const onMouseLeave = () => {
      gsap.to(cursorRef.current, { scale: 1, opacity: 1, duration: 0.2 })
      gsap.to(followerRef.current, { 
        scale: 1, 
        backgroundColor: 'transparent',
        borderColor: 'var(--text-muted)',
        backdropFilter: 'blur(0px)',
        duration: 0.3 
      })
    }

    interactives.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter)
      el.addEventListener('mouseleave', onMouseLeave)
    })

    window.addEventListener('mousemove', onMouseMove)
    followLoop()

    return () => {
      cancelAnimationFrame(rAfId)
      window.removeEventListener('mousemove', onMouseMove)
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter)
        el.removeEventListener('mouseleave', onMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor-dot" />
      <div ref={followerRef} className="custom-cursor-follower" />
    </>
  )
}
