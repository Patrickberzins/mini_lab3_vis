import barLineChart from './BarLineChart.js';
import lineChart from './LineChart.js';
import barChart from './barChart.js';
//load the data in here

d3.csv('/national.csv', d3.autoType).then(data=>{
    console.log('national', data)

    const date_filter_national = data.filter(d=>d.date.getDay()==1)/*.then{
      const vaccines =d.vaccines(d=>
        BarLineChart(d)
      )
      const deaths = d.deaths(d=>
        BarLineChart(d)
      )
    }
    */
    console.log('national_day_filter',date_filter_national)
      



d3.csv('/vaccine.csv', d3.autoType).then(data_2=>{
    console.log('covid', data_2)

    const date_filter_2 = data_2.filter(d=>d.date.getDay()==1)
    console.log('filter',date_filter_2)

    const massachusetts = date_filter_2.filter(d=>d.location == 'Massachusetts')
    const mississippi = date_filter_2.filter(d=>d.location == 'Mississippi')
    console.log('ma', massachusetts)
    console.log('miss', mississippi)


d3.csv('deaths.csv', d3.autoType).then(data_3=>{

    const date_filter_3 = data_3.filter(d=>d.date.getDay()==1)
    const mass_death = date_filter_3.filter(d=>d.state == 'Massachusetts')
    const miss_death = date_filter_3.filter(d=>d.state == 'Mississippi')

    const mass_pop = 6912239
    const miss_pop = 2966407

    for (let i = 1; i < mass_death.length; i++){
        mass_death[0].daily_deaths = 0
        mass_death[i].daily_deaths = mass_death[i].deaths - mass_death[i-1].deaths
        mass_death[i].death_rate = ((mass_death[i].daily_deaths)/mass_pop)*1000000
    }

    for (let j = 1; j < miss_death.length; j++){
        miss_death[0].daily_deaths = 0
        miss_death[j].daily_deaths = miss_death[j].deaths - miss_death[j-1].deaths
        miss_death[j].death_rate = ((miss_death[j].daily_deaths)/miss_pop)*1000000
    }

    console.log('ma_2', mass_death)
    console.log('miss_2',miss_death)
  

//pass in the data we will want

//not sure if we need to keep the .update(data) stuff in here yet
//for this one pass in the data for covid vaccinations of US
//----const LineChart = lineChart('.national-data-chart');
  //----  LineChart.update(data);
  

//----Loading csv data and assigning variables ----
// Im still working on cleaning all of this up and aligning the data

document.querySelector("#group-by").addEventListener('change', (x)=> {

    let type= x.target.value;
    console.log (type)

    if (type == 'Ma'){
        document.querySelector('.left-chart').innerHTML = "";
        document.querySelector('.right-chart').innerHTML = "";
        document.querySelector('.bottom-left-chart').innerHTML = "";
        document.querySelector('.bottom-right-chart').innerHTML = "";
        const BarChart = barChart('.left-chart');
        BarChart.update(massachusetts, mass_death,'daily_vaccinations_per_million');

        const BarChart_2 = barChart('.right-chart');
        BarChart_2.update(mass_death, mass_death,'daily_deaths');

        const BarChart_3 = barChart('.left-chart');
        BarChart_3.update(massachusetts, mass_death,'people_vaccinated');

        const BarChart_4 = barChart('.right-chart');
        BarChart_4.update(mass_death, mass_death,'cases');

    }

    else if (type == 'Miss') {
        document.querySelector('.left-chart').innerHTML = "";
        document.querySelector('.right-chart').innerHTML = "";
        document.querySelector('.bottom-left-chart').innerHTML = "";
        document.querySelector('.bottom-right-chart').innerHTML = "";
        const BarChart = barChart('.left-chart');
        BarChart.update(mississippi, miss_death,'daily_vaccinations_per_million');

        const BarChart_2 = barChart('.right-chart');
        BarChart_2.update(miss_death, miss_death,'daily_deaths');

        const BarChart_3 = barChart('.left-chart');
        BarChart_3.update(mississippi, miss_death,'people_vaccinated');

        const BarChart_4 = barChart('.right-chart');
        BarChart_4.update(miss_death, miss_death,'cases');

    }

    else if (type == 'national') {

    }

})

})
  
//keep the ones below
/*
  //these 2 stay static so just give them the data they need
const Nat_BarLineChart = barLineChart('.left-chart');
    BarLineChart.update(data);
    
const Nat_Line_Chart=LineChart('.right-chart');
    LineChart.update(data);

  //these 2 will get new data depending on the dropdown selection
const BarLineChart = barLineChart('.bottom-left-chart');
    BarLineChart.update(data);

const LineChart = lineChart('.bottom-right-chart');
    LineChart.update(data);
*/

})
  
})