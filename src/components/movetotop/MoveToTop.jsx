import React, { useEffect, useState } from 'react'
import { MoveUp } from 'lucide-react'

const MoveToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    const scrollUp = () => {
        let hiddenHeight=200
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop
        if(windowScroll > hiddenHeight){
            setIsVisible(true)
        }else{
            setIsVisible(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll",scrollUp)
      }, [])
      
      const handleMove= () =>{
          window.scrollTo({
              top: 0,
              behavior: 'smooth',
              left:0
          })
      }
    return (
        <>
            {
                isVisible ? (<div className='bg-blue-600 w-10 h-10 flex justify-center items-center rounded-3xl text-white right-2 bottom-2 m-auto float-right fixed cursor-pointer font-bold'  onClick={handleMove}> <MoveUp className='w-10 h-5 text-6xl font-bold animate-bounce' /></div>) : ""
            }
        </>
    )
}

export default MoveToTop