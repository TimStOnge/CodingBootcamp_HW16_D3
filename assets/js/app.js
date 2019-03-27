
/////////// DEFINE RESPONSIVNESS FUNCTION ******************************************
// *******************************************************************
function makeResponsive() {

/////////// SET-UP SVG AREA ******************************************
// *******************************************************************

// Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 600;

// Define the chart's margins as an object
var chartMargin = {
  top: 100,
  right: 100,
  bottom: 100,
  left: 100
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);


// Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

/////////// READ IN DATA ******************************************
// *******************************************************************

d3.csv("assets/data/data.csv").then(function(stateData) {

   stateData.forEach(function(data) {
      data.abbr = data.abbr;
      data.healthcare = +data.healthcare;
      data.poverty = +data.poverty;
      data.smokes = +data.smokes;
      data.income = +data.income;
      data.obesity = +data.obesity;
      data.age = +data.age;

  });

  /////////// DEFINE DATA SCALES ******************************************
// *******************************************************************

    // Create scaling functions
    var xPovertyScale = d3.scaleLinear()
      .domain(d3.extent(stateData, d => d.poverty))
      .range([0, chartWidth]);

    var xAgeScale = d3.scaleLinear()
    .domain([d3.min(stateData, function (d) {
          return d.age;
      }), d3.max(stateData, function (d) {
          return d.age;
      })])
      .range([0, chartWidth]);

    var xIncomeScale = d3.scaleLinear()
    .domain([d3.min(stateData, function (d) {
      return d.income;
      }), d3.max(stateData, function (d) {
      return d.income;
      })])
      .range([0, chartWidth]);

    var yObeseScale = d3.scaleLinear()
      .domain([d3.min(stateData, function (d) {
          return d.obesity;
      }), d3.max(stateData, function (d) {
          return d.obesity;
      })])
      .range([chartWidth, 0]);

    var ySmokesScale = d3.scaleLinear()
      .domain([d3.min(stateData, function (d) {
          return d.smokes;
      }), d3.max(stateData, function (d) {
          return d.smokes;
      })])
      .range([chartWidth, 0]);

    var yHealthcareScale = d3.scaleLinear()
      .domain([d3.min(stateData, function (d) {
          return d.healthcare;
      }), d3.max(stateData, function (d) {
          return d.healthcare;
      })])
      .range([chartWidth, 0]);

    /* AXES FOR EACH SCALE, USE ACCORDINGLY*/

    //var xAxis = d3.axisBottom(xPovertyScale);
    var xAxis = d3.axisBottom(xAgeScale);
    //var xAxis = d3.axisBottom(xIncomeScale);
    //var yAxis = d3.axisLeft(yObeseScale);
    //var yAxis = d3.axisLeft(ySmokesScale);
    var yAxis = d3.axisLeft(yHealthcareScale);

  ////// APPEND AXES TO CHART  ******************************************
  // *******************************************************************

    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);

    chartGroup.append("g")
    .call(yAxis);

  ////// APPEND CIRCLES TO CHART POPULATED BY DATA ****************
  // **************************************************************

    chartGroup.selectAll()
    .data(stateData)
    .enter()
    .append("circle")
    //.attr("cx", data => xPovertyScale(data.poverty))
    .attr("cx", data => xAgeScale(data.age))
    //.attr("cx", data => xIncomeScale(data.income))
    //.attr("cy", data => yHealthcareScale(data.healthcare))
    .attr("cy", data => ySmokesScale(data.smokes))
    //.attr("cy", data => yObeseScale(data.obesity))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .attr("stroke", "white");

  ////// CIRCLE LABELS ****************
  // *******************************************************************
    var text = chartGroup.selectAll("text")
      .data(stateData)
      .enter()
      .append("text");

    var textLabels = text
        .attr("x", function(data) { return xAgeScale(data.age); })
        .attr("y", function(data) { return yHealthcareScale(data.healthcare); })
        .text(stateData.abbr)
        .attr("font-family", "sans-serif")
        .attr("font-size", "20px")
        .attr("fill", "red");
    
  ////// AXIS LABELS ***********************************************
  // *******************************************************************

    svg.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 95})`)
    .text("In Poverty (%)");

    svg.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top+70})`)
    .text("Age (Median)");

    svg.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top+45})`)
    .text("Household Income (Median)");

    svg.append("text")
    .attr("transform", `rotate(-90)`)
    .attr("transform", `translate(${chartMargin.left - 40}, ${chartHeight / 2})`)
    .text("Obese (%)");

    svg.append("text")
    .attr("transform", `rotate(-90)`)
    .attr("transform", `translate(${chartMargin.left - 40}, ${chartHeight / 3})`)
    .text("Smokes (%)");

    svg.append("text")
    .attr("transform", `rotate(-90)`)
    .attr("transform", `translate(${chartMargin.left - 40}, ${chartHeight / 4})`)
    .text("Lacks Healthcare (%)");

  ////// TOOLTIPS ****************
  // *******************************************************************

    var toolTip = d3.select("#scatter").append("div")
    .attr("class", "tooltip");


    chartGroup.selectAll("text")
      .on("click", function(d, i) {
        (`Hey! You clicked bar ${data.smokes}!`);
    })




});
}
makeResponsive();

d3.select(window).on("resize", makeResponsive);