import React from 'react';

import TemperatureChart from './TemperatureChart';

import './Temperature.scss';

const Temperature = () => {

    return (  
        <section className="temperature">
            <h2>Temperature</h2>

            <TemperatureChart />

        </section>  
    );
}
 
export default Temperature;