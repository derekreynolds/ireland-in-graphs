import React, { useEffect, useRef, useCallback, useState } from 'react';

import { useViewport } from '../ViewportProvider';

import './TemperatureChart.scss';
import color from '../Color.scss';

import * as d3 from 'd3';
import _ from 'lodash';

import belmulletTemperatureData from '../data/belmullet.csv';
import valenciaTemperatureData from '../data/valencia.csv';
import casementTemperatureData from '../data/casement.csv';
import corkTemperatureData from '../data/cork.csv';
import dublinTemperatureData from '../data/dublin.csv';
import malinheadTemperatureData from '../data/malinhead.csv';
import mullingarTemperatureData from '../data/mullingar.csv';
import shannonTemperatureData from '../data/shannon.csv';

const TemperatureChart = React.memo((props) => {
    
    const belmulletData = d3.csv(belmulletTemperatureData).then(function(data) {        
        return createObjects(data);
    });
    const valenciaData = d3.csv(valenciaTemperatureData).then(function(data) {
        return createObjects(data);
    });
    const casementData = d3.csv(casementTemperatureData).then(function(data) {
        return createObjects(data);
    });
    const corkData = d3.csv(corkTemperatureData).then(function(data) {
        return createObjects(data);
    });
    const dublinData = d3.csv(dublinTemperatureData).then(function(data) {
        return createObjects(data);
    });
    const malinheadData = d3.csv(malinheadTemperatureData).then(function(data) {
        return createObjects(data);
    });
    const mullingarData = d3.csv(mullingarTemperatureData).then(function(data) {
        return createObjects(data);
    });
    const shannonData = d3.csv(shannonTemperatureData).then(function(data) {
        return createObjects(data);
    });

    const { width, height } = useViewport(); 

    var svg;

    const stokeWidth = 1.5;

    useEffect(() => {
        draw(props.station);
    }, [props.station]);

    useEffect(() => {
        draw(props.station);            
    }, [width, height])

    const isFirstRun = useRef(true);

    useEffect(() => { 
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }     
        
        _.forIn(props.displayTemperature, (value, key) => { 
            setLinePathVisibility(`.er-${key}-temperature`, value);
        });
             
    }, [props.displayTemperature]);

    const createObjects = (data) => {
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
    }

    const draw = (station) => {

        switch(station) {
            case 'Belmullet':
                belmulletData.then(data => {
                    drawChart(data);
                });
                break;
            case 'Valencia': 
                valenciaData.then(data => {
                    drawChart(data);
                });
                break;
            case 'Casement': 
                casementData.then(data => {
                    drawChart(data);
                });
                break;
            case 'Cork': 
                corkData.then(data => {
                    drawChart(data);
                });
                break;
            case 'Dublin': 
                dublinData.then(data => {
                    drawChart(data);
                });
                break;  
            case 'Malin Head': 
                malinheadData.then(data => {
                    drawChart(data);
                });
                break; 
            case 'Mullingar': 
                mullingarData.then(data => {
                    drawChart(data);
                });
                break; 
            case 'Shannon': 
                shannonData.then(data => {
                    drawChart(data);
                });
                break;                      
            default:    
                belmulletData.then(data => {
                    drawChart(data);
                });
        }
    }

    const drawChart = (data) => {              
  
        const margin = ({top: 20, right: 30, bottom: 20, left: 30}); 
        const graphWidth = width - (margin.right ); 
        const graphHeight = (height - (margin.top + margin.bottom)) * 0.6;   

        const x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, graphWidth]);

        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.lowestTemperature), d3.max(data, d => d.highestTemperature)]).nice()
            .range([(graphHeight - margin.bottom), margin.top]);    
        
        const averageMaxTemperatureLine = d3.line()
            .defined(d => !isNaN(d.averageMaxTemperature))
            .x(d => x(d.date))
            .y(d => y(d.averageMaxTemperature));

        const averageMinTemperatureLine = d3.line()
            .defined(d => !isNaN(d.averageMinTemperature))
            .x(d => x(d.date))
            .y(d => y(d.averageMinTemperature));

        const meanTemperatureLine = d3.line()
            .defined(d => !isNaN(d.meanTemperature))
            .x(d => x(d.date))
            .y(d => y(d.meanTemperature));

        const highestTemperatureLine = d3.line()
            .defined(d => !isNaN(d.highestTemperature))
            .x(d => x(d.date))
            .y(d => y(d.highestTemperature)); 
            
        const lowestTemperatureLine = d3.line()
            .defined(d => !isNaN(d.lowestTemperature))
            .x(d => x(d.date))
            .y(d => y(d.lowestTemperature));     

        const xAxis = g => g
            .attr("transform", `translate(0,${(graphHeight) - margin.bottom})`)
            .call(d3.axisBottom(x).ticks((graphWidth - margin.right) / 80).tickSizeOuter(0));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain"))
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 1)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")); 
        
        var svg = d3.select("svg")
            .attr("viewBox", `0 0 ${width} ${height * 0.6}`);;
        
        svg.selectAll("*").remove();

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.append("path")            
            .datum(data)
            .attr("class", "er-maximum-temperature")
            .attr("fill", "none")
            .attr("stroke", color.maximumcolor)
            .attr("stroke-width", 0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", averageMaxTemperatureLine);
            
        svg.append("path")
            .datum(data)
            .attr("class", "er-minimum-temperature")
            .attr("fill", "none")
            .attr("stroke", color.minimumcolor)
            .attr("stroke-width", 0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", averageMinTemperatureLine);

        svg.append("path")
            .datum(data)
            .attr("class", "er-average-temperature")
            .attr("fill", "none")
            .attr("stroke", color.averagecolor)
            .attr("stroke-width", stokeWidth)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", meanTemperatureLine); 
            
        svg.append("path")
            .datum(data)
            .attr("class", "er-highest-temperature")
            .attr("fill", "none")
            .attr("stroke", color.highestcolor)
            .attr("stroke-width", 0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", highestTemperatureLine);     

        svg.append("path")
            .datum(data)
            .attr("class", "er-lowest-temperature")
            .attr("fill", "none")
            .attr("stroke", color.lowestcolor)
            .attr("stroke-width", 0)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", lowestTemperatureLine);

    }



    const setLinePathVisibility = (className, showLine) => {

        const path = d3.select(className);
        
        if(showLine) {
            path.attr("stroke-width", stokeWidth);
        } else {
            path.attr("stroke-width", 0.0);            
        }      
            
    }

    return ( 
        <svg>
            
        </svg>
    );
});
 
export default TemperatureChart;

