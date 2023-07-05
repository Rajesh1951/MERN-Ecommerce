import React from 'react'
import { FaReact } from 'react-icons/fa'
import { SiRedux, SiTailwindcss, SiExpress, SiJsonwebtokens } from 'react-icons/si'
import { BiLogoMongodb } from 'react-icons/bi'
import { IoLogoNodejs } from 'react-icons/io'
function About() {
  return (
    <div className="flex-1 bg-gray-900 text-gray-300 mt-16">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <h2 className="text-5xl font-bold pt-3 mb-4">About the Website</h2>
        <p className=" mb-6 text-2xl">
          This website is developed solely for learning purposes.
        </p>
        <p className="text-4xl font-bold mb-3">Technologies used</p>
        <div className="ml-2">
          <h4 className="text-3xl font-bold mb-2 ">Frontend:</h4>
          <div className="flex flex-row justify-around">
            <div className='flex flex-col items-center justify-center'>
              <div><FaReact className="text-1xl md:text-3xl lg:text-6xl"
                size={80} style={{ color: '#61DAFB' }} /></div>
              <div className="font-semibold">React JS</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div><SiRedux className="text-2xl md:text-4xl lg:text-6xl" size={80} style={{ color: '#764ABC' }} /></div>
              <div className="font-semibold">Redux JS</div>
            </div>
            <div className='flex flex-col flex-wrap  items-center justify-center'>
              <div><SiTailwindcss className="text-2xl md:text-4xl lg:text-6xl" size={80} style={{ color: '#4FD1C5' }} /></div>
              <div className="font-semibold">Tailwind CSS</div>
            </div>
          </div>
          <h4 className="text-3xl font-bold mb-2 ">Backend:</h4>
          <div className="flex flex-row justify-around">
            <div className='flex flex-col items-center justify-center'>
              <div><IoLogoNodejs className="text-2xl md:text-4xl lg:text-6xl" size={80} style={{ color: '#339933' }} /></div>
              <div className="font-semibold">Node JS</div>
            </div>
            <div className='flex flex-col flex-wrap  items-center justify-center'>
              <div><SiExpress className="text-2xl md:text-4xl lg:text-6xl" size={80} style={{ color: '#339933' }} /></div>
              <div className="font-semibold">Express JS</div>
            </div>
            <div className='flex flex-col items-center justify-center'>
              <div><BiLogoMongodb className="text-1xl md:text-3xl lg:text-6xl"
                size={80} style={{ color: '#13AA52' }} /></div>
              <div className="font-semibold">Mongo DB</div>
            </div>
            <div className='flex flex-col flex-wrap  items-center justify-center'>
              <div><SiJsonwebtokens className="text-2xl md:text-4xl lg:text-6xl" size={80} style={{ color: 'white' }} /></div>
              <div className="font-semibold">JsonWebToken</div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default About