// /* eslint-disable react-hooks/exhaustive-deps */
// import { useContext, createContext, useState, useEffect } from "react";
// import axios from 'axios'

// const StateContext = createContext()

// export const StateContextProvider = ({ children }) => {
//     const [weather, setWeather] = useState({})
//     const [values, setValues] = useState([])
//     const [place, setPlace] = useState('Jaipur')
//     const [thisLocation, setLocation] = useState('')
//     let Data = {}

//     // fetch api
//     const fetchWeather = async () => {
//     const  REACT_APP_WEATHER_API_KEY='9ca141454f272c5b8faec74388872af7'    
//         // const options = {
//         //     method: 'GET',
//         //     url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
//         //     params: {
//         //         aggregateHours: '24',
//         //         location: place,
//         //         contentType: 'json',
//         //         unitGroup: 'metric',
//         //         shortColumnNames: 0,
//         //     },
//         //     headers: {
//         //         'X-RapidAPI-Key': REACT_APP_WEATHER_API_KEY,
//         //         'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
//         //     }
//         // }

//         try {
//             // const response = await axios.request(options);

//  Data= await   fetch(
//                 `http://api.openweathermap.org/data/2.5/weather?q=${place}&appid=${REACT_APP_WEATHER_API_KEY}`
//               )
//                 // .then(res => res.json())

//             // const thisData = Object.values(response.data.locations)[0]
//             // setLocation(thisData.address)
//             // setValues(thisData.values)
//             // setWeather(thisData.values[0])
//             console.log(Data.body);
//         } catch (e) {
//             console.error(e);
//             // if the api throws error.
//             alert('This place does not exist')
//         }
//     }

//     useEffect(() => {
//         fetchWeather()
//     }, [place])

//     useEffect(() => {
//         console.log(values)
//     }, [values])

//     return (
//         <StateContext.Provider value={{
//             weather,
//             setPlace,
//             values,
//             thisLocation,
//             place
//         }}>
//             {children}
//         </StateContext.Provider>
//     )
// }

// export const useStateContext = () => useContext(StateContext)



















/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
    const [weather, setWeather] = useState({});
    const [values, setValues] = useState([]);
    const [place, setPlace] = useState('Nairobi');
    const [thisLocation, setLocation] = useState('');
    let Data = {};

    const kelvinToCelsius = (temperatureInKelvin) => {
        return Math.round(temperatureInKelvin - 273.15);
    };

    // fetch api
    const fetchWeather = async () => {
        const apiUrl = `http://localhost:3001/weather?place=${place}`;

        try {
            const response = await axios.get(apiUrl);
            Data = response.data;

            const weatherData = {
                wspd: Data.wind.speed,
                country: Data.sys.country,
                humidity: Data.main.humidity,
                temp: kelvinToCelsius(Data.main.temp ),
                heatindex: kelvinToCelsius(Data.main.temp_max),
                iconstring: Data.weather[0].icon,
                conditions: Data.weather[0].description
            }

            const valuesData = {
                datetime: Data.dt,
                temp: Data.main.temp,
                conditions: Data.weather[0].icon
            }
    
            // Rest of your code remains the same
            console.log(Data);
            setLocation(Data.name)
            setWeather(weatherData)
            setValues([valuesData])
        } catch (e) {
            console.error(e);
            alert('This place does not exist');
        }
    }
    useEffect(() => {
        fetchWeather();
    }, [place]);


    return (
        <StateContext.Provider value={{
            weather,
            setPlace,
            values,
            thisLocation,
            place
        }}>
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
