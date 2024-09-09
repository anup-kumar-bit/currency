import BoxContent from "./components/boxContent"
import Chart from "./components/chart"
import "./App.css"

import { useState, createContext, useContext, useEffect } from 'react';
const MyContext = createContext();

export default function App() {
  const [To, setTo] = useState('AUD');
  const [From, setFrom] = useState('AUD');

  return (
    <MyContext.Provider value={{ To, setTo, From, setFrom }}>
      <div className="w-screen h-screen flex justify-center items-center flex-wrap bg-gray-100 maindiv relative">
        <div className="w-2/5 h-2/4 mr-4 bg-white shadow-2xl px-6 flex flex-col justify-center indiv1 relative rounded-lg">
        <div className="absolute -top-16 -left-px bg-white shadow-lg p-3 rounded-lg w-full indiv1-1 mb-3 text-2xl font-bold text-zinc-600">Currency Converter</div>
          <Chart />
        </div>
        <div className="w-2/4 h-2/4 shadow-2xl px-5 py-5 rounded-lg bg-white indiv2">
          <BoxContent />
        </div>
      </div>
    </MyContext.Provider>
  )
}
export { MyContext }

