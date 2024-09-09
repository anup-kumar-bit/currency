import React, { useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { useState } from 'react';
import { MyContext } from '../App';
ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

export default function Chart() {
    const [dates, setdates] = useState([]);
    const [rates, setrates] = useState([]);
    const [rate2, setrate2] = useState('#');
    const {To,From}=useContext(MyContext);

    const date = new Date();
    const today = date.toLocaleDateString("en-CA");
    date.setDate(date.getDate() - 7);
    const date2Week = date.toLocaleDateString("en-CA");
    const getChartdata = async () => {
        if(To!=From){
            const response = await fetch(`https://api.frankfurter.app/${date2Week}..${today}?from=${From}&to=${To}`);
            const response2 = await fetch(`https://api.frankfurter.app/latest?amount=1&from=${From}&to=${To}`);
            if (response.ok) {
                const result = await response.json();
                const result2 = await response2.json();
                const resultObject = result2.rates;
                setrate2((Object.values(resultObject)[0]))

                setdates(Object.keys(result.rates));
                const allvalues=Object.values(result.rates);


                const key=Object.keys(allvalues[0])[0]
                setrates(allvalues.map(ele => ele[key]))
            }
        }
    }
    useEffect(() => {
        getChartdata();
    }, [To,From,rate2])
    const data = {
        labels: dates,
        datasets: [{
            data: rates,
            borderColor: "rgb(1 82 76 / 66%)",
            backgroundColor: "white",
            borderWidth: 2,
            tension: 0.5
        }],
    };

    return (
        <>
        <h1 className='flex justify-center items-center mb-4 font-sans text-teal-700 font-bold'>1 {From} = {rate2} {To}</h1>
        <div className='flex justify-center items-center graph w-full h-3/4'>
            <Line data={data} options={{
                plugins: {
                    legend: false
                },
                scales: {
                    x: {
                        grid: {
                            drawOnChartArea: false,
                            drawBorder: false
                        },
                    },
                }

            }
            } />
        </div>
        </>
    );
}
