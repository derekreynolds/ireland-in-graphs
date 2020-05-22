import * as d3 from 'd3';

import color from '../Color.scss';

export default class LineChart {

    stokeWidth = 1.5;

    svg;

    constructor(width, height) {
        this.width = width * 0.9;
        this.height = height * 0.6;
    }


    draw(data) {              
  
        const margin = ({top: 20, right: 20, bottom: 20, left: 20});     

        const x = d3.scaleUtc()
            .domain(d3.extent(data, d => d.date))
            .range([margin.left, this.width]);

        const y = d3.scaleLinear()
            .domain([d3.min(data, d => d.lowestTemperature), d3.max(data, d => d.highestTemperature)]).nice()
            .range([(this.height - margin.bottom), margin.top]);    
        
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
            .attr("transform", `translate(0,${(this.height) - margin.bottom})`)
            .call(d3.axisBottom(x).ticks((this.width - margin.right) / 80).tickSizeOuter(0));

        const yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y))
            .call(g => g.select(".domain"))
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 1)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold"));    

        this.svg = d3.select(".temperature-chart").append("svg")
            .attr("viewBox", `0 0 ${this.width} ${this.height}`);

        this.svg.append("g")
            .call(xAxis);

        this.svg.append("g")
            .call(yAxis);

        this.svg.append("path")            
            .datum(data)
            .attr("class", "er-maximum-temperature")
            .attr("fill", "none")
            .attr("stroke", color.maximumcolor)
            .attr("stroke-width", this.stokeWidth)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", averageMaxTemperatureLine);
            
        this.svg.append("path")
            .datum(data)
            .attr("class", "er-minimum-temperature")
            .attr("fill", "none")
            .attr("stroke", color.minimumcolor)
            .attr("stroke-width", this.stokeWidth)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", averageMinTemperatureLine);

        this.svg.append("path")
            .datum(data)
            .attr("class", "er-average-temperature")
            .attr("fill", "none")
            .attr("stroke", color.averagecolor)
            .attr("stroke-width", this.stokeWidth)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", meanTemperatureLine); 
            
        this.svg.append("path")
            .datum(data)
            .attr("class", "er-highest-temperature")
            .attr("fill", "none")
            .attr("stroke", color.highestcolor)
            .attr("stroke-width", this.stokeWidth)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", highestTemperatureLine);     

        this.svg.append("path")
            .datum(data)
            .attr("class", "er-lowest-temperature")
            .attr("fill", "none")
            .attr("stroke", color.lowestcolor)
            .attr("stroke-width", this.stokeWidth)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", lowestTemperatureLine);

    }

    redraw (width, height) {
        this.svg.attr("viewBox", `0 0 ${width} ${height}`);
    }

    toggleAverageTemperatureVisibility() {
        this.toggleLinePathVisibility(".er-average-temperature");
    }

    toggleMinimumTemperatureVisibility() {
        this.toggleLinePathVisibility(".er-minimum-temperature");
    }

    toggleMaximumTemperatureVisibility() {
        this.toggleLinePathVisibility(".er-maximum-temperature");
    }

    toggleHighestTemperatureVisibility() {
        this.toggleLinePathVisibility(".er-highest-temperature");
    }

    toggleLowestTemperatureVisibility() {
        this.toggleLinePathVisibility(".er-lowest-temperature");
    }

    toggleLinePathVisibility(className) {

        const path = this.svg.select(className);

        const value = parseFloat(path.attr("stroke-width"));

        if(value === this.stokeWidth) {
            path.attr("stroke-width", 0.0);
        } else {
            path.attr("stroke-width", this.stokeWidth);
        }

    }


}