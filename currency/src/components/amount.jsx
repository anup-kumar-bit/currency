import { useContext, useEffect, useRef, useState } from "react"
import select from "./select";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MyContext } from "../App";


export default function Amount() {
    const [value, setvalue] = useState();
    const [rate, setrate] = useState('');
    const {To,From}=useContext(MyContext);
    const inputRef=useRef(null);
    const inputbutton=useRef(null);

    const notify = (msg) => {
        toast.info(msg, {
            position: "top-right",
            autoClose: 2000,
        });
    }
    const fetchValue = async () => {
        try {
            if (To != From) {
                const response = await fetch(`https://api.frankfurter.app/latest?amount=${value}&from=${From}&to=${To}`);
                if (response.ok) {
                    const result = await response.json();
                    const resultObject = result.rates;
                    setrate((Object.values(resultObject)[0]))
                } else {
                    console.error(`Error: ${response.status} ${response.statusText}`);
                }
                inputbutton.current.style.backgroundColor = "rgb(19 78 74 / 100%)";
            }else{
                notify("Getting Same Selection");
                inputbutton.current.disabled = true;
                inputbutton.current.style.backgroundColor = "rgb(19 78 74 / 93%)";
                setTimeout(()=>{
                    inputbutton.current.disabled = false;
                },[2000])
            }

        } catch (err) {
            console.error("Wrong Input or Selection", err);
        }
    }
    const handleinput=(e)=>{
        const myval=e.target.value;
        console.log();
        if(/^\d*$/.test(myval) && myval.length>0){
            setvalue(e.target.value);
            inputRef.current.style.backgroundColor = "";
            inputbutton.current.disabled = false;
        }else{
            inputRef.current.style.backgroundColor = "rgb(255 0 0 / 6%)";
            inputbutton.current.disabled = true;
        }
    }
    return (
        <div className="mt-3 ">
            <ToastContainer />
            <input type="text" placeholder="Enter Amount to convert" className="w-full p-2 rounded-md bg-gray-100 focus:outline-none focus:ring-1 ring-gray-200" onChange={handleinput} ref={inputRef}/>
            <div className="flex justify-between mt-4">
                <span className="w-80 py-1 px-2 font-semibold">Value :  
                    <span className="text-purple-600"> {rate}</span>
                </span>
                <button ref={inputbutton} className="bg-teal-900 py-1 px-5 text-white rounded-sm active:bg-teal-800" onClick={fetchValue}>Convert</button>
            </div>
        </div>
    )
}