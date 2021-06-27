import React, {useReducer, useState} from 'react';

import TemperatureChart from './TemperatureChart';

import color from '../Color.scss';

import Chip from '../components/chip/Chip'

import './Temperature.scss';

const Temperature = () => {

    const [selectedStation, setSelectedStation] = useState('Belmullet');

    const initStations = [
        { id:0, name: 'Belmullet', color: color.belmulletcolor, displayed: true },
        { id:1, name: 'Valencia', color: color.valenciacolor, displayed: false },
        { id:2, name: 'Casement', color: color.casementcolor, displayed: false },
        { id:3, name: 'Cork', color: color.corkcolor, displayed: false },
        { id:4, name: 'Dublin', color: color.dublincolor, displayed: false },
        { id:5, name: 'Malin Head', color: color.malinheadcolor, displayed: false },
        { id:6, name: 'Mullingar', color: color.mullingarcolor, displayed: false },
        { id:7, name: 'Shannon', color: color.shannoncolor, displayed: false }
    ]

    const initialDisplayTemperature = {
        minimum: false,
        maximum: false,
        average: true,
        highest: false,
        lowest: false
    };
    const [displayTemperature, setDisplayTemperature] = useState(initialDisplayTemperature);

    const stationReducer = (state, action) => {     
        switch (action.type) {
          case 'DISPLAY':
            return state.map(station => {  
                if(action.id === station.id) {
                    station.displayed = true;
                } else {
                    station.displayed = false;
                }           
                return station;           
            });
          default:
            return state;
        }
      };

    const [stations, dispatch] = useReducer(stationReducer, initStations);    

    const toggleDisplayTemperature = (whichTemperature) => {        
        setDisplayTemperature(prevState => {return {...prevState, whichTemperature: false}});
    }

    function switchStation(id) {        
        if(stations[id].displayed) {
            return false;
        }
        setDisplayTemperature(initialDisplayTemperature);
        setSelectedStation(stations[id].name);       
        dispatch({id: id, type: 'DISPLAY'});
        return true;
    }

    return (  
        <section className="temperature">
            <h2>Temperature</h2>
            <div className="er-stations">
            {
                stations.map(station => (
                    <Chip key={station.id} color={station.color} onClick={() => switchStation(station.id)} selected={station.displayed}>{station.name}</Chip>                   
                ))
            }
            </div>

            <TemperatureChart displayTemperature={displayTemperature} station={selectedStation}/>

            <div className="er-temperature-selection">                
                <Chip color={color.minimumcolor} onClick={ () => setDisplayTemperature(prevState => {return {...prevState, minimum: !prevState.minimum}; return true;}) } 
                    selected={displayTemperature.minimum}>Minimum</Chip>
                <Chip color={color.maximumcolor} onClick={ () => setDisplayTemperature(prevState => {return {...prevState, maximum: !prevState.maximum}}) } 
                    selected={displayTemperature.maximum}>Maximum</Chip>
                <Chip color={color.averagecolor} onClick={ () => setDisplayTemperature(prevState => {return {...prevState, average: !prevState.average}}) } 
                    selected={displayTemperature.average}>Average</Chip>
                <Chip color={color.highestcolor} onClick={ () => setDisplayTemperature(prevState => {return {...prevState, highest: !prevState.highest}}) } 
                    selected={displayTemperature.highest}>Highest</Chip>
                <Chip color={color.lowestcolor} onClick={ () => setDisplayTemperature(prevState => {return {...prevState, lowest: !prevState.lowest}})  } 
                    selected={displayTemperature.lowest}>Lowest</Chip>
            </div> 

        </section>  
    );
}
 
export default Temperature;