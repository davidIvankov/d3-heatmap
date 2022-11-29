let url = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json"
 
let req = new XMLHttpRequest()
let data
let values
let base
let yScale
let xScale
let xAxesScale
let yAxesScale

// legend scales
let dataset=["#0000FF", "#088F8F", "#ADD8E6", "white", "#EEFF33", "#FFC633", "#FF8133", "#FF5733", "#FF337E" ]
let xAxLegend
let xLegend


let w = 1200;
let h= 400;
let padding = 60;

let barHight = (h -(2*padding)) / 12;
let barWidth = (w -(2*padding) )/ 262;
let svg = d3.select("svg");

let legend= d3.select("#legend")

let drawCanves=()=>{
  svg.attr("height", h )
     .attr("width", w)
  
  legend.attr("height", barHight + 30)
        .attr("width", 300)
 

};

let generateScales =()=>{
  xAxLegend= d3.scaleLinear()
               .domain([0, 9])
               .range([10, 290])
  
  
  yScale = d3.scaleLinear()
             .domain([12.5, 0.5])
             .range([h - padding, padding])
          
  
  xScale = d3.scaleLinear()
             .domain([d3.min(values, (d)=> d.year), d3.max(values, (d)=> d.year)])
             .range([padding, w - padding])
  
  let dateArr = values.map((d)=>{
    return new Date(d.year.toString() +"-01-01" )  
  })
 
  xAxesScale = d3.scaleTime()
              .domain([d3.min(dateArr), d3.max(dateArr)])
              .range([padding, w - padding])
  
  yAxesScale = d3.scaleLinear()
                 .domain([12.5 ,  0.5])
                 .range([h-padding, padding])
  
  
};

let drawBars =()=>{
   let tooltip = d3.select("body")
                  .append("div")
                  .attr("id", "tooltip")
                 .style("visibility", "hidden")
                 .style("height", "auto")
                 .style("width", "auto")
                
  
  
  legend.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("fill", (d)=> d)
        .attr("height", barHight)
        .attr("width", 32)
        .attr("x", (d,i)=> xAxLegend(i))
         
  
  
 svg.selectAll("rect")
    .data(values)
    .enter()
    .append("rect")
    .attr("class", "cell")
    .attr("fill", (d)=>{
   let temp = d.variance + base
   if (temp <= 3.9) {
     return "#0000FF"
   } else if (temp <= 5) {
     return "#088F8F"
   } else if (temp <= 6.1) {
     return "#ADD8E6"
   } else if (temp <= 7.2) {
     return "white"
   } else if (temp <= 8.3) {
     return "#EEFF33"
   } else if (temp <= 9.5) {
     return "#FFC633"
   } else if (temp <= 10.6) {
     return "#FF8133"
   } else if(temp <= 11.7) {
     return "#FF5733"
   } else {
     return "#FF337E"
   }
 })
  .attr("data-month", (d)=>{
  return d.month - 1
 })
  .attr("data-year", (d)=> d.year)
  .attr("data-temp", (d)=> d.variance + base)
  .attr("width", barWidth)
  .attr("height", barHight)
  .attr("margin", 0)
  .attr("y", (d)=> yScale(d.month) - barHight/2)
  .attr("x", (d)=> xScale(d.year))
  .on("mouseover", (d)=>{
      tooltip.transition()
          .style("visibility", "visible")
          .style("top", (event.pageY - 90) + "px")
          .style("left", (event.pageX - 15) + "px")
      function sex(){
                 if (d.month === 1) {
                   return "January"
                 } else if (d.month=== 2) {
                   return "February"
                 } else if (d.month=== 3) {
                   return "March"
                 } else if (d.month=== 4) {
                   return "April"
                 } else if (d.month=== 5) {
                   return "May"
                 } else if (d.month=== 6) {
                   return "June"
                 } else if (d.month === 7) {
                   return "July"
                 } else if (d.month=== 8) {
                   return "August"
                 } else if (d.month=== 9) {
                   return "September"
                 } else if (d.month=== 10) {
                   return "October"
                 } else if (d.month=== 11) {
                   return "November"
                 } else if (d.month=== 12) {
                   return "December"
                 }
       }
   let mon = sex()
         
   tooltip.text(d.year + " - " + mon + "\n" + (d.variance + base) + "℃" + "\n" + d.variance + "℃"  )
          .attr("data-year", d.year)
 })
  .on("mouseleave", (d)=>{
    tooltip.transition()
           .style("visibility", "hidden")
  })
};

let generateAxes=()=>{
  let legAx = d3.axisBottom(xAxLegend)
                .tickFormat((d, i)=> [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.8, 12.7][i])
 
   let xAxis = d3.axisBottom(xAxesScale)
                 .ticks(26)
 let yAxis = d3.axisLeft(yAxesScale)
               .tickFormat((d)=>{
                 if (d === 1) {
                   return "January"
                 } else if (d=== 2) {
                   return "February"
                 } else if (d=== 3) {
                   return "March"
                 } else if (d=== 4) {
                   return "April"
                 } else if (d=== 5) {
                   return "May"
                 } else if (d=== 6) {
                   return "June"
                 } else if (d === 7) {
                   return "July"
                 } else if (d=== 8) {
                   return "August"
                 } else if (d=== 9) {
                   return "September"
                 } else if (d=== 10) {
                   return "October"
                 } else if (d=== 11) {
                   return "November"
                 } else if (d=== 12) {
                   return "December"
                 }
               })
               
 
  svg.append("g")
     .call(xAxis)
     .attr("transform", "translate(0, " + (h - padding) + ")")
     .attr("id", "x-axis")
  
  svg.append("g")
     .call(yAxis)
     .attr("id", "y-axis")
     .attr("transform", "translate(" + padding + " ,0)")
  
  legend.append("g")
        .call(legAx)
        .attr("transform", "translate(0, " + barHight + ")")
        
        
  
};

req.open("GET", url, true)
req.onload=()=>{
  data = JSON.parse(req.responseText)
  values = data.monthlyVariance;
  base = data.baseTemperature;
  
  drawCanves()
  generateScales()
  drawBars()
  generateAxes()
}
req.send()