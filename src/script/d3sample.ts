import * as d3 from "d3";

interface Point {
    x: number
    y: number
}

const data: Point[] = []

for (let x = 0; x < 10; x++) {
    data.push({x: x, y: fun(x)})
}

const container = d3.select("#diagram");
const table = container.append("table")
const tbody = table.append("tbody");

const addButton = document.getElementById('btn-add')
const removeButton = document.getElementById('btn-remove')

function fun(x: number): number {
    return x * x
}

function setup() {
    table.attr('class', 'table is-striped is-hoverable')
        .append("thead")
        .append("tr")
        .selectAll("th")
        .data(["x", "f(x)"])
        .enter()
        .append("th")
        .text(d => d)

    update()
}


function update() {
    console.log(data)

    const tr = tbody
        .selectAll("tr")
        .data(data)

    tr.exit()
        .transition()
        .duration(100)
        .style("opacity", 0)
        .remove()

    const newTr = tr
        .enter()
        .append("tr")

    newTr
        .style("opacity", 0)
        .transition()
        .duration(100)
        .style("opacity", 1)


    appendRows(newTr)
}

function appendRows(tr: d3.Selection<any, any, any, any>) {
    tr.append("td").text(d => d.x);
    tr.append("td").text(d => d.y);
}

addButton?.addEventListener('click', () => {
    data.push({x: data.length, y: fun(data.length)})
    update()
})

removeButton?.addEventListener('click', () => {
    data.pop()
    update()
})

document.addEventListener("DOMContentLoaded", setup);