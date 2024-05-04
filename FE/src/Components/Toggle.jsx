import { useState } from "react"
import useTheme from "./useTheme"
import { MoonFilled, SunFilled } from "@ant-design/icons"

export function ModeToggle() {
  const { setTheme } = useTheme()
  const [curr,setCurr]= useState(false)
  return (
    <div className="flex rounded-full *:dark:border-white *:dark:text-white">
    {curr==true? <SunFilled  onClick={() => {setTheme("light"); setCurr(false)}} className="border rounded-full p-1"/> :
    <MoonFilled  onClick={() => {setTheme("dark");setCurr(true)}} className="border rounded-full p-1 border-black"/>}
    </div>
  )
}