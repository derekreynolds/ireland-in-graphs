import React, { useEffect } from 'react';

import * as d3 from 'd3';

import * as _ from 'lodash';
import { useViewport } from '../ViewportProvider';
import temperatureData from '../data/belmullet.csv';

import './TemperatureChart.scss';
import color from '../Color.scss';
import LineChart from './LineChart';
import Chip from '../components/chip/Chip';

const TemperatureChart = () => {
    
    const { width, height } = useViewport();    

    let lineChart;

    useEffect(()=> {       
        var data = d3.csv(temperatureData).then(function(data) {
            var objects = [];
    
            _.forIn(data[0], (value, key) => {
                objects.push({
                    date: new Date(key.replace('M', '-') + '-01'),
                    averageMaxTemperature: +value,
                    averageMinTemperature: +_.get(data[1], key),  
                    meanTemperature: +_.get(data[2], key), 
                    highestTemperature: +_.get(data[3], key),
                    lowestTemperature: +_.get(data[4], key)
                });     
            });


           return objects;
        });       

        data.then(value => {
            lineChart = new LineChart(width, height);
            lineChart.draw(value);
        });

    }, []);


    useEffect(() => {
        if(lineChart)
            lineChart.redraw(width, height);
    }, [width, height]);   

    function toggleAverageTemperatureVisibility() {        
        lineChart.toggleAverageTemperatureVisibility();
    }

    function toggleMinimumTemperatureVisibility() {        
        lineChart.toggleMinimumTemperatureVisibility();
    }

    function toggleMaximumTemperatureVisibility() {        
        lineChart.toggleMaximumTemperatureVisibility();
    }

    function toggleHighestTemperatureVisibility() {        
        lineChart.toggleHighestTemperatureVisibility();
    }

    function toggleLowestTemperatureVisibility() {        
        lineChart.toggleLowestTemperatureVisibility();
    }

    return ( 
        <>
            <div className="temperature-chart">
                
            </div>
            <div className="er-temperature-selection">                
                <Chip color={color.minimumcolor} onClick={toggleMinimumTemperatureVisibility}>Minimum</Chip>
                <Chip color={color.maximumcolor} onClick={toggleMaximumTemperatureVisibility}>Maximum</Chip>
                <Chip color={color.averagecolor} onClick={toggleAverageTemperatureVisibility}>Average</Chip>
                <Chip color={color.highestcolor} onClick={toggleHighestTemperatureVisibility}>Highest</Chip>
                <Chip color={color.lowestcolor} onClick={toggleLowestTemperatureVisibility}>Lowest</Chip>
            </div>                 
        </>
    );
}
 
export default TemperatureChart;

