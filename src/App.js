import React, { useEffect, useState } from "react";
import axios from 'axios';
const App = () => {
    const [data, setdata] = useState([])
    // console.log(data)
    const [city, setcity] = useState("delhi")
    // console.log(city)
    const [sub, setsub] = useState("delhi")

    const getWeatherByLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lon = position.coords.longitude;

                    try {
                        const response = await axios.get(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=2820e0653be0113c32b58508785433ba`
                        );
                        setdata(response.data);
                        setsub(response.data.name); // update input box
                    } catch (error) {
                        alert("Unable to fetch weather by location.");
                        setdata({});
                    }
                },
                () => {
                    alert("Location access denied.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const getWeather = async (cityname) => {
        if (!cityname) return;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityname},in&units=metric&APPID=2820e0653be0113c32b58508785433ba`)
            //  console.log(response.data)
            setdata(response.data);
            setsub("")
        } catch (error) {
            setdata({});
        }
    }
    
    useEffect(() => {
        getWeather(city);
    }, [city])

    useEffect(() => {
        const timer = setTimeout(() => {
            if (sub.trim() !== "") {
                setcity(sub.trim());
            }
        }, 1000);

        return () => clearTimeout(timer); // Clear previous timer on every keystroke
    }, [sub]);

    const change = (e) => {
        let x = e.target.value
        setsub(x) // console.log(e.target.value)

    }
    // const submit = () => {
    //     setcity(sub)
    //     setsub("")
    // }
    return (
        <>
            <div className="mainBody">
                <div className="centerBody">
                    <h1 className=" head m-3 fw-bold">Live Weather</h1>
                    <div class="input-group p-2 text-al">
                        <input value={sub} onChange={change} type="text" className="form-control text-center w-100" placeholder="Enter your state name" aria-label="Recipient's username" aria-describedby="button-addon2" />
                        {/* <button onClick={submit} class="btn btn-outline-success" type="button" id="button-addon2">Search</button> */}
                    </div>
                    {!data.name ? (<p className="error">Oops! incorrect state or city name</p>) :
                        (<div className="info">
                            <h1 className="mb-0">{data.name}, IN</h1>
                            {data.weather?.[0] && <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="weather" />}
                            <p>{data.main.temp} &#x2103; </p>
                            <h3 className="temp_minmax">Min: {data.main.temp_min} &#x2103; Max: {data.main.temp_max} &#x2103;</h3>
                            <p>{data?.weather[0]?.description}</p>
                        </div>)
                    }
                    <button type="button" onClick={getWeatherByLocation} className="btn btn-outline-primary mt-2">
                        Use My Location
                    </button>
                </div>
            </div>
        </>
    )
}
export default App;
