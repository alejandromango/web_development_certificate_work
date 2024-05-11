/* Students: Please use this week's project for Week 12: Assignment 10: Advanced Visualization.
     You will need to replace the contents of this JavaScript file with your own work,
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */
const margin = { top: 60, bottom: 10, left: 140, right: 20 };
const width = 800 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creates sources <svg> element
const svg = d3
        .select("body")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

// Group used to enforce margin
const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", 20)
    .text("Fire Year");

svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Area Burned (Hectares)");

// Global variable for all data
let data;

// Scales setup
const yscale = d3.scaleLinear().range([0, height]);
const xscale = d3.scaleBand().range([0, width]).paddingInner(0.1);

// Axis setup
const xaxis = d3.axisTop().scale(xscale);
const g_xaxis = g.append("g").attr("class", "x axis");
const yaxis = d3.axisLeft().scale(yscale);
const g_yaxis = g.append("g").attr("class", "y axis");

/////////////////////////

d3.json("wildfires.json").then((json) => {
    data = json;

    update(data);
});

function update(new_data) {
    //update the scales
    yscale.domain([0, d3.max(new_data, (d) => d.area)] );
    xscale.domain(d3.map(new_data, (d) => d.year));
    //render the axis
    g_xaxis.transition().call(xaxis);
    g_yaxis.transition().call(yaxis);

    // Render the chart with new data

    // DATA JOIN use the key argument for ensurign that the same DOM element is bound to the same data-item
    const rect = g
    .selectAll("rect")
    .data(new_data, (d) => d.area)
    .join(
        // ENTER
        // new elements
        (enter) => {
        const rect_enter = enter.append("rect").attr("y", 0);
        rect_enter.append("title");
        return rect_enter;
        },
        // UPDATE
        // update existing elements
        (update) => update,
        // EXIT
        // elements that aren't associated with data
        (exit) => exit.remove()
    );

    // ENTER + UPDATE
    // both old and new elements
    rect
    .transition()
    .attr("width", xscale.bandwidth())
    .attr("height", (d) => yscale(d.area))
    .attr("x", (d) => xscale(d.year));

    rect.select("title").text((d) => d.california_max);
}

//interactivity
d3.select("#five-years-only").on("change", function () {
    // This will be triggered when the user selects or unselects the checkbox
    const checked = d3.select(this).property("checked");
    if (checked === true) {
        // Checkbox was just checked

        // Keep only data element whose country is US
        const filtered_data = data.filter((d)=> (+d.year > d3.max(data, (d2) => +d2.year)-5));

        update(filtered_data); // Update the chart with the filtered data
    } else {
        // Checkbox was just unchecked
        update(data); // Update the chart with all the data we have
    }
});