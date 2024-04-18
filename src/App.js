import React, { useEffect, useState } from "react";
import axios from 'axios';
const App = () => {
const [data,setdata]=useState([])
console.log(data)
const [city,setcity]=useState("delhi")
// console.log(city)
const [sub,setsub]=useState()
    const getWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&APPID=2820e0653be0113c32b58508785433ba`)
    //  console.log(response.data)
            setdata(response.data);

    }
useEffect(()=>{
    getWeather();
},[sub])

const change=(e)=>{
   let x=e.target.value
   setsub(x) // console.log(e.target.value)
 
}
const submit=()=>{
    setcity(sub)
   setsub("")
}
    return (
        <>
            <div className="mainBody">
                <div className="centerBody">
                    <h1 className=" head m-4 fw-bold">Live Weather</h1>
                    <div class="input-group mb-3 p-2 text-al">
                        <input value={sub} onChange={change} type="text" className="form-control text-center" placeholder="Enter your state name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        <button onClick={submit} class="btn btn-outline-success" type="button" id="button-addon2">Search</button>
                    
                    </div>
                    {!data.name ? <p>Oops! incorrect state or city name</p>:
                    <div className="info">
                            <h1>{data.name}, IN</h1>
                            <p>{data.main.temp} &#x2103; </p>
                            <h3 className="temp_minmax">Min: {data.main.temp_min} &#x2103; Max: {data.main.temp_max} &#x2103;</h3>
                            </div>}
              

               
                      
                   
                </div>
            </div>
        </>
    )
}
export default App;
