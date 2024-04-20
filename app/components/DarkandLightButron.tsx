"use client"

import React from 'react'
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from 'next-themes';
import { IoMoonOutline } from "react-icons/io5";

type Props = {}



export default function DarkandLightButron({}: Props) {
  
    const {setTheme , resolvedTheme} =  useTheme();
  
    function toggleDark (){
        if(resolvedTheme === "light") setTheme("dark");
        if(resolvedTheme === "dark") setTheme("light");
    }


    return (
    <div className='flex items-center gap-2'>
        <p className='text-sm'>{resolvedTheme === "light" ? "Dark" : "Light" }</p>
        <button onClick={toggleDark}>
        {resolvedTheme === "light" ? <IoMoonOutline className='text-2xl'/> : <IoSunnyOutline className='text-2xl'/>  }
        </button>
    </div>
  )
}