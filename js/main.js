let globalData = [];

d3.csv("data/enve-main1.csv").then(data => {
  data.forEach(d => {
    d.initial_area_ha = +d.initial_area_ha || 0;
    d.gain_2010_2020_ha = +d.gain_2010_2020_ha || 0;
    d.avg_tc_loss = 0;

    for (let year = 2010; year <= 2020; year++) {
      const key = `tc_loss_ha_${year}`;
      d[key] = +d[key] || 0;
      d.avg_tc_loss += d[key];
    }
  });

  // Load data for pie chart
d3.csv("data/enve-main2.csv").then(pieData => {
    window.pieDataRaw = pieData;  // Save globally
  
    // Initial pie chart
    const initialCountry = d3.select("#countrySelect").property("value").toLowerCase();
    updatePieChart(initialCountry);
  
    // Update pie on country change
    d3.select("#countrySelect").on("change.pie", function () {
      const selected = this.value.toLowerCase();
      updatePieChart(selected);
    });
  });
  

  globalData = data;

  const countries = Array.from(new Set(data.map(d => d.country))).sort();
  const countryDropdown = d3.select("#countrySelect");
  const stateDropdown = d3.select("#stateSelect");

  countryDropdown.selectAll("option")
    .data(countries)
    .enter()
    .append("option")
    .text(d => d)
    .attr("value", d => d);

  function updateStateDropdown(country) {
    const states = data
      .filter(d => d.country === country)
      .map(d => d.subnational1);
    stateDropdown.selectAll("option").remove();
    stateDropdown.selectAll("option")
      .data(states)
      .enter()
      .append("option")
      .text(d => d)
      .attr("value", d => d);
  }

  const defaultCountry = countries[0];
  countryDropdown.property("value", defaultCountry);
  updateStateDropdown(defaultCountry);

  renderVisuals(data.filter(d => d.country === defaultCountry));
  renderLineChart(data, defaultCountry, stateDropdown.property("value"));

  countryDropdown.on("change", function () {
    const selectedCountry = this.value;
    const filtered = data.filter(d => d.country === selectedCountry);
    updateStateDropdown(selectedCountry);
    renderVisuals(filtered);
    renderLineChart(filtered, selectedCountry, stateDropdown.property("value"));
  });

  stateDropdown.on("change", function () {
    const selectedCountry = countryDropdown.property("value");
    renderLineChart(data.filter(d => d.country === selectedCountry), selectedCountry, this.value);
  });
}
);

function updatePieChart(country) {
    const svg = d3.select("#piechart");
    svg.selectAll("*").remove();
  
    const data = window.pieDataRaw.find(d => d.country2.toLowerCase() === country);
    if (!data) return;
  
    const lossHuman = +data.X_agri + +data.X_urban + +data.X_wildfire;
    const lossNatural = +data.treecover_loss_without_human_intervention;
  
    const dataset = [
      { label: "Human Intervention", value: lossHuman },
      { label: "Natural Causes", value: lossNatural }
    ];
  
    const width = 400, height = 300, radius = Math.min(width, height) / 2;
  
    const g = svg.append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);
  
    const color = d3.scaleOrdinal()
      .domain(dataset.map(d => d.label))
      .range(["orange", "steelblue"]);
  
    const pie = d3.pie().value(d => d.value);
    const arc = d3.arc().innerRadius(0).outerRadius(radius - 10);
  
    const tooltip = d3.select("#tooltip");
  
    g.selectAll("path")
      .data(pie(dataset))
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => color(d.data.label))
      .on("mouseover", (event, d) => {
        tooltip.style("visibility", "visible")
          .style("opacity", 1)
          .html(`<strong>${d.data.label}</strong><br>Loss: ${d.data.value.toFixed(2)} ha`)
          .style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY + 10) + "px");
      })
      .on("mousemove", (event) => {
        tooltip.style("left", (event.pageX + 10) + "px")
          .style("top", (event.pageY + 10) + "px");
      })
      .on("mouseout", () => {
        tooltip.style("opacity", 0)
          .style("visibility", "hidden");
      });
  
    // Pie chart title inside
    // Add country name above pie chart
    svg.append("text")
    .attr("x", 90)  
    .attr("y", 15)
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("fill", "#333")
    .text(`Country: ${country.charAt(0).toUpperCase() + country.slice(1)}`);

  }