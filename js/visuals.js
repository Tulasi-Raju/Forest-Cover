function renderVisuals(data) {
  createScatterPlot(data);
  createBarChart(data);
}

function createScatterPlot(data) {
  d3.select("#scatterplot").selectAll("*").remove();

  const margin = {top: 40, right: 40, bottom: 60, left: 80};
  const width = 700 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  const svg = d3.select("#scatterplot")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.initial_area_ha) * 1.05])
    .range([0, width]);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.avg_tc_loss) * 1.05])
    .range([height, 0]);

  svg.append("g").attr("transform", `translate(0,${height})`).call(d3.axisBottom(x));
  svg.append("g").call(d3.axisLeft(y));

  const tooltip = d3.select("#tooltip");

  svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", d => x(d.initial_area_ha))
    .attr("cy", d => y(d.avg_tc_loss))
    .attr("r", 4)
    .attr("fill", "steelblue")
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .style("opacity", 1)
        .html(`<strong>${d.subnational1}</strong><br>Initial: ${d.initial_area_ha}<br>Loss: ${d.avg_tc_loss}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mousemove", function(event) {
      tooltip.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0)
        .style("visibility", "hidden");
    });
    
  svg.append("text")
    .attr("x", width / 2).attr("y", height + 40)
    .attr("text-anchor", "middle")
    .text("Initial Forest Area (ha)");

  svg.append("text")
    .attr("x", -height / 2).attr("y", -67)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Total Tree Cover Loss (ha)");
}

function createBarChart(data) {
  d3.select("#barchart").selectAll("*").remove();

  const margin = {top: 40, right: 20, bottom: 100, left: 80};
  const width = 800 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  const svg = d3.select("#barchart")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleBand()
    .domain(data.map(d => d.subnational1))
    .range([0, width])
    .padding(0.2);

  const y = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.gain_2010_2020_ha) * 1.1])
    .range([height, 0]);

  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d => d).tickSizeOuter(0))
    .selectAll("text")
    .attr("transform", "rotate(-40)")
    .style("text-anchor", "end");

  svg.append("g").call(d3.axisLeft(y));

  const tooltip = d3.select("#tooltip");

  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("x", d => x(d.subnational1))
    .attr("y", d => y(d.gain_2010_2020_ha))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d.gain_2010_2020_ha))
    .attr("fill", "orange")
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .style("opacity", 1)
        .html(`<strong>${d.subnational1}</strong><br>Gain: ${d.gain_2010_2020_ha}<br>Loss: ${d.avg_tc_loss}`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mousemove", function(event) {
      tooltip.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0)
        .style("visibility", "hidden");
    });
    
  svg.append("text")
    .attr("x", width / 2).attr("y", height + 70)
    .attr("text-anchor", "middle")
    .text("Subnational Regions");

  svg.append("text")
    .attr("x", -height / 2).attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .text("Tree Cover Gain (ha)");
}

function renderLineChart(data, country, selectedState) {
  d3.select("#linechart").selectAll("*").remove();

  const stateData = data.find(d => d.subnational1 === selectedState);
  if (!stateData) return;

  const years = d3.range(2010, 2021);
  const values = years.map(y => ({
    year: y,
    loss: +stateData[`tc_loss_ha_${y}`]
  }));

  const margin = {top: 40, right: 40, bottom: 70, left: 80};
  const width = 800 - margin.left - margin.right;
  const height = 350 - margin.top - margin.bottom;

  const svg = d3.select("#linechart")
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

  const x = d3.scaleLinear().domain([2010, 2020]).range([0, width]);
  const y = d3.scaleLinear().domain([0, d3.max(values, d => d.loss)]).range([height, 0]);

  const tooltip = d3.select("#tooltip");

  // Axes
  svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.format("d")));

  svg.append("g").call(d3.axisLeft(y));

  // Axis Labels
  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + 50)
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Year");

  svg.append("text")
    .attr("x", -height / 2)
    .attr("y", -60)
    .attr("transform", "rotate(-90)")
    .attr("text-anchor", "middle")
    .style("font-size", "14px")
    .text("Tree Cover Loss (ha)");

  // Line Path
  svg.append("path")
    .datum(values)
    .attr("fill", "none")
    .attr("stroke", "#2a5599")
    .attr("stroke-width", 2)
    .attr("d", d3.line()
      .x(d => x(d.year))
      .y(d => y(d.loss))
    );

  // Dots with Tooltip
  svg.selectAll("circle")
    .data(values)
    .enter().append("circle")
    .attr("cx", d => x(d.year))
    .attr("cy", d => y(d.loss))
    .attr("r", 4)
    .attr("fill", "#2a5599")
    .on("mouseover", (event, d) => {
      tooltip.style("visibility", "visible")
        .style("opacity", 1)
        .html(`<strong>Year: ${d.year}</strong><br>Loss: ${d.loss} ha`)
        .style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mousemove", function(event) {
      tooltip.style("left", (event.pageX + 10) + "px")
        .style("top", (event.pageY + 10) + "px");
    })
    .on("mouseout", () => {
      tooltip.style("opacity", 0)
        .style("visibility", "hidden");
    });

    
    
}

