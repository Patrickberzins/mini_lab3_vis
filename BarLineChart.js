//will most likely need to change the dimensions later
//this will be for the covid vax rates
export default function barLineChart(container){

    //this will just be a bar chart, and then we can put a line chart on top of it like how we did the previous lab
    
    //creating the barchart first
    
      const margin = ({top:30, bottom:20, left:50, right:20})
      const width = 700 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
    
      const svg = d3.select('.barchart_Container')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
      
    //I domains should be added here since the axes wont change
      const xScale = d3
      .scaleBand()
      .rangeRound([0, width])
      .paddingInner(.1);
      
      const yScale = d3
      .scaleLinear()
      .range([height,0]);
    
    //
      svg.append('g')
          .attr('class', 'x-axis')
          //.call(xAxis)
          .attr('transform', `translate(0, ${height})`);
  
      svg.append('g')
      .attr('class', 'y-axis');
      
      //.call(yAxis)
  
    //this is for the label
      svg.append('text')
          .attr('id', 'axis-labels')
          .attr('x', 0)
          .attr('y', -10);
    
  function update(data, type){
          //d.company will change to something else
          x.domain(data.map (d=> d.company))
          y.domain([0, d3.max(data, d=> d[type])])
      
    const bars = svg.selectAll('.bar').data(data, d=> d[type]);
  
      bars
      .enter()
      .data(data, d=> d.company)
      .append('rect')
      .attr('x', d=>x(d.company)) 
      .attr('y', height)
      .attr('fill', '#BC9B6A')
      .attr('opacity', .5)
      .merge(bars)
      //not sure if we will need to keep these here
      .transition()
      .delay(function(d,i) {return 100*i;})
      .duration(1000)
      
      .attr('x', d=> x(d.company))
      .attr('y', d=> y(d[type]))
      .attr('fill', 'maroon')
      .attr('width', x.bandwidth())
      .attr('height', d=> (height - y(d[type])))
      .attr('opacity', .8)
      .on("mouseenter", (event, d)=>{
        const pos = d3.pointer(event, window)
            tooltip = d3.select('.tooltip')
            .style('display', 'block')
            .style('position', 'absolute')
            .style('top', pos[1] + 'px')
            .style('left', pos[0] + 'px')
            .html(`<p>
            Date: ${d.Date} <br>
            Covid Vaccination Rate: ${d.vaccination}
                  </p>`);
          })
          .on('mouseleave', (event,d)=>{
              d3.select('.tooltip')
                  .style('display', 'none');
  
          })
    
    
  //this stuff is for the line
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
    
  }
  }