import { useEffect, useState,useContext, memo} from "react";
import { MyContext } from "../App";
function Select({ title }) {
    const { setTo,setFrom } = useContext(MyContext);
    const [currOpt, setCurrOpt] = useState([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch("https://api.frankfurter.app/currencies");
                if (response.ok) {
                    const result = await response.json();
                    const allOptions = Object.keys(result);
                    setCurrOpt(allOptions);
                }
            } catch (error) {
                console.error("Failed to fetch options:", error);
            }
        };
        fetchOptions();
    }, []);
    const currencyTo=(e)=>{
        try{
            if((e.target.id)=="To"){
                setTo(e.target.value);
            }else if((e.target.id)=="From"){
                setFrom(e.target.value);
            }else{
                throw new Error("Something went wrong !!")
            }
        }catch(err){
            console.log(err);
        }
    }
    return (

        <div className="flex flex-col selectDiv">
            <label htmlFor={title} className="ml-2 mb-1">{title}</label>
            <select name="" id={title} onChange={currencyTo} className="w-48 px-3 py-2 bg-gray-100 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-300">
                {currOpt.map((option) => (
                    <option key={option} value={option} className="" >{option}</option>
                ))}
            </select>
        </div>
    );
}
export default memo(Select);