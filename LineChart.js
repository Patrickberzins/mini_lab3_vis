
//copy and pasted from most recent lab
//this one is going to be for the death rate
export default function lineChart(container){
  

    const outerWidth = 700;
    const outerHeight = 700;
    const margin = {top:50, bottom: 20, left:50, right:10}
    const height = outerHeight - margin.left - margin.right
    const width = outerWidth - margin.top - margin.bottom
    
    //the select will need to be changed
    const svg = d3.select('.scatter-plot')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    
    //need to change the data we will be passing in
    const xScale =
        d3.scaleLinear()
        .domain(d3.extent(data, d => d.miles)).nice()
        .range([0, width]);
    
    const yScale = 
        d3.scaleLinear()
        .domain(d3.extent(data, d=> d.gas)).nice()
        .range([height, 0]);
    
    const xAxis = d3
        .axisBottom()
        .scale(xScale);
    
    const yAxis = d3
        .axisLeft()
        .scale(yScale)
        .ticks(10, 's')
        .tickFormat(d => d3.format('.2f')(d))
    //i could add ticks later
    
    svg.selectAll('circles')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d=> xScale(d.miles))
        .attr('cy', d=> yScale(d.gas))
        .attr('r', 4)
        .attr('stroke', 'black')
        .attr('fill', 'white');
    
    //need to create labels now for axis
    svg.append('text')
        .attr('x', width - 180)
        .attr('y', height - 10)
        .text('Miles Per Person Per Year');
    
    svg.append('text')
        .attr('x', 10)
        .attr('y',+20)
        .text('Cost Per Gallon');
    //********Change the labels
    //now need labels for the datapoints
    svg.selectAll("text-label")
        .data(data)
        .enter()
        .append("text")
        //.attr("text-anchor", 'middle')
        .text( d=> d.year)
        .attr('x',d=>xScale(d.miles))
        .attr('y', d=> yScale(d.gas))
        .attr('font-size', '11')
        .each(position)
        .call(halo);
    
    //do the line stuff here
    const line = 
    d3.line()
    .x(d=>xScale(d.miles))
    .y(d=> yScale(d.gas))
    
    svg.append('path')
    .datum(data)
    .attr('fill', 'none')
    .attr('stroke', 'black')
    .attr('stroke-width', '2')
    .attr('d', line)
    
    function halo(text) {
        text
          .select(function() {
            return this.parentNode.insertBefore(this.cloneNode(true), this);
          })
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-width", 4)
            .attr("stroke-linejoin", "round");
          }
    
    }