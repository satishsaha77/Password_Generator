import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setlength] = useState(8)
  const [numberAllow, setnumberAllow] = useState(false);
  const [charAllow, setcharAllow] = useState(false)
  const [Password, setPassword] = useState("")
// useRef hook
  const passwordRef = useRef(null)

// useCallback(fn, dependencies)
  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllow) str += "0123456789"
    if (charAllow) str += "!@#$%^&*()_+=~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)
  }, [length, numberAllow, charAllow, setPassword])

  // Copy Function
  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,99)
    window.navigator.clipboard.writeText(Password)
  }, [Password])

  // useEffect hook
  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllow, charAllow, passwordGenerator])

  return (
    
    <>
      <div className="flex items-center justify-center"><h1 className="mt-40 text-8xl text-center text-white font-mono">Password_Generator</h1>
      </div>
      
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
          <div className="flex shadow rounded-lg overflow-hidden mb-4">
            <input type="text" value={Password} className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
            />

            <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0">Copy</button>
          </div>
          <div className="flex text-sm gap-x-2">
            <div className='flex items-center gap-x-1'>
              <input 
              type="range"
              min = {6}
              max = {100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {setlength(e.target.value)}}
              />
              <label>Length:{length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked = {numberAllow}
              id='numberInput'
              onChange={() => {
                setnumberAllow((prev) => !prev);
              }}
              />
              <label htmlFor='numberInput'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
              type="checkbox"
              defaultChecked = {charAllow}
              id='characterInput'
              onChange={() => {
                setcharAllow((prev) => !prev);
              }}
              />
              <label htmlFor='characterInput'>Characters</label>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
