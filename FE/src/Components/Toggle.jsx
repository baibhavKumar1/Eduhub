import useTheme from "./useTheme"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex rounded-full *:dark:border-white *:dark:text-white">
    <button className='text-black p-1 rounded-l-full border-2  border-black' onClick={() => setTheme("light")}>Light</button>
    <button className='text-black p-1 border-2 rounded-r-full border-black' onClick={() => setTheme("dark")}>Dark</button>
    </div>
  )
}