export default function barChart(container){

    const margin = ({top: 20, right: 20, bottom: 60, left: 50})
  
    const width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
  
    const svg = d3.select(container).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
    const xScale = d3
        .scaleBand()
        .range([0, width])
        .round(true)
        .paddingInner(0.1)
  
    const yScale = d3
        .scaleLinear()
        .range([height,0])

    const xTime = d3.scaleTime()
        .rangeRound([0, width - margin.right])
  
  
    const xAxis = d3.axisBottom()
      .scale(xTime)
  
    const yAxis = d3.axisLeft()
      .scale(yScale)
      .ticks(10, "s")
  
    svg.append("g")
    .attr("class", "axis x-axis")
  
    svg.append("g")
    .attr("class", "axis y-axis")
  
    svg.append("text")
    .attr("class", "y label")
    
    function update(data, data_2, type){
    
        // Update scale domains
        xScale.domain(data_2.map(d=>d.date))
    
        yScale.domain([0,d3.max(data.map(d=>d[type]))])

        xTime.domain(d3.extent(data_2.map(d=>d.date)))
    
        const bars = svg.selectAll('.bar')
        .data(data);
    
        bars.enter()
        .append('rect')
        .attr('x', d=>xScale(d.date))
        .attr("y", (d)=> yScale(d[type]))
        .merge(bars)
        .transition()
        .duration(1000)
        .delay(500)
        .attr('x', d=>xScale(d.date))
        .attr('y', d => yScale(d[type]))
        .attr('width', xScale.bandwidth())
        .attr('height', d => height - yScale(d[type]))
        .style("opacity", .5)
        .attr('fill', '#69a3b2')
        .attr("class","bar");
    
        bars.exit()
        .transition()
        .duration(1000)
        .remove();
    
        svg.select(".x-axis")
        .transition()
        .duration(1000)
        .call(xAxis)
        .attr("transform", `translate(0, ${height})`);
    
        svg.select(".y-axis")
        .transition()
        .duration(1000)
        .call(yAxis)
        .attr("transform", `translate(0, 0)`)

        if (type == 'daily_deaths'){
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Daily Deaths');
        }
    
        else if (type == 'daily_vaccinations_per_million') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Daily Vaccinations (per million)');
        }

        else if (type == 'cases') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Total Cases');
        }

        else if (type == 'people_vaccinated') {
            svg.select(".y")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text('Total Vaccinations');
        }

        const line = d3.line()
        .x(d => xScale(d.date))
        .y(d => yScale(d[type]));

        const path = svg
        .append("path")
        .datum(data)
        .transition()
        .duration(2000)
        .delay(100)
        .attr("fill", "none")
        .attr("stroke", "black")
        .attr("stroke-width", 2)
        .attr("d", line);
  
  }

  return {update}
    
  }