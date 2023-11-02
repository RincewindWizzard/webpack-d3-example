// import * as d3 from "d3";

import * as d3Selection from "d3-selection";
import * as d3Transition from "d3-transition";
import * as d3Scale from "d3-scale";
import * as d3Axis from "d3-axis"
import * as d3Shape from "d3-shape"
import * as d3Array from "d3-array"

const d3 = {
    ...d3Selection,
    ...d3Transition,
    ...d3Scale,
    ...d3Axis,
    ...d3Shape,
    ...d3Array
}


interface Point {
    x: number
    y: number
}

const step: number = 0.001

function fun(t: number): Point {
    const period = 2 * Math.PI
    const growthPerPeriod = 1 - t / 100 / period

    const circles = Math.ceil(t * step)
    const phi = t * step * period
    return {
        x: phi,
        y: Math.cos(phi * circles * 3)
    }
}
// function fun(t: number): Point {
//     const period = 2 * Math.PI
//     const growthPerPeriod = 1 - t / 100 / period
//
//     const circles = Math.ceil(t * step)
//     const phi = t * step * period
//     return {
//         x: Math.sin(phi * circles * 5),
//         y: Math.cos(phi * circles * 3)
//     }
// }

class LinePlot {
    svg: d3.Selection<SVGGElement, any, any, any>
    transitionDuration: number = 1000
    width: number
    height: number
    xScale: d3.ScaleLinear<number, number>
    yScale: d3.ScaleLinear<number, number>
    xAxis: d3.Axis<d3.NumberValue>
    yAxis: d3.Axis<d3.NumberValue>
    svgAxisX: any
    svgAxisY: any
    line: d3.Line<Point>
    // path: d3.Selection<any, any, any, any>


    constructor(container: HTMLDivElement) {
        const margin = {top: 10, right: 30, bottom: 30, left: 60}
        this.width = container.offsetWidth - margin.left - margin.right
        this.height = container.offsetHeight - margin.top - margin.bottom;

        this.svg = d3.select(container)
            .append("svg")
            .attr("width", container.offsetWidth)
            .attr("height", container.offsetHeight)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // clipping of the path
        this.svg.append("defs")
            .append("clipPath")
            .attr("id", "line-clip") // Eindeutige ID für das Clipping
            .append("rect")
            .attr("width", this.width) // Breite des Clippings
            .attr("height", this.height);

        this.xScale = d3.scaleLinear()
            .domain([0, 1])
            .range([0, this.width])
        this.yScale = d3.scaleLinear()
            .domain([0, 1])
            .range([this.height, 0])


        this.xAxis = d3.axisBottom(this.xScale)
        this.yAxis = d3.axisLeft(this.yScale)

        this.svgAxisX = this.svg
            .append("g")
            .attr('class', 'axis axisX')
            .attr("transform", `translate(0, ${this.height})`)
            .call(this.xAxis)

        this.svgAxisY = this.svg
            .append("g")
            .attr('class', 'axis axisY')
            .call(this.yAxis)


        this.line = d3.line<Point>()
            .x(d => this.xScale(d.x))
            .y(d => this.yScale(d.y));

    }

    updateScale(data: Point[]) {
        this.xScale
            .domain([
                d3.min(data, (d) => d.x) || 0,
                d3.max(data, (d) => d.x) || 1,
            ])
            .range([0, this.width])

        this.yScale
            .domain([
                d3.min(data, (d) => d.y) || 0,
                d3.max(data, (d) => d.y) || 1
            ])
            .range([this.height, 0])
    }

    update(data: Point[]) {
        const lineData = this.svg
            .selectAll(".line")
            .data([data])


        lineData
            .transition()
            .duration(this.transitionDuration)
            .attr("d", this.line);


        lineData
            .exit()
            .transition()
            .duration(this.transitionDuration)
            .remove();


        lineData
            .enter()
            .append("path")
            .attr('class', 'line') // Verwende eine Klasse, um die Linie zu klassifizieren
            .attr("clip-path", "url(#line-clip)")
            .attr("fill", "none")
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .transition()
            .duration(this.transitionDuration)
            .attr("d", this.line);


        this.updateScale(data);


        this.svgAxisX
            .transition()
            .duration(this.transitionDuration)
            .call(this.xAxis);

        this.svgAxisY
            .transition()
            .duration(this.transitionDuration)
            .call(this.yAxis);
    }
}


// function update(path: any, line: any) {
//     path.datum(data)
//         .transition()
//         .duration(1000)
//         .attr("d", line);
// }


document.addEventListener("DOMContentLoaded", () => {
    const container: HTMLDivElement | null = document.getElementById('diagram') as HTMLDivElement
    const addButton: HTMLButtonElement | null = document.getElementById('btn-add') as HTMLButtonElement
    const removeButton: HTMLButtonElement | null = document.getElementById('btn-remove') as HTMLButtonElement

    if (container) {
        const data: Point[] = []

        for (let i = 0; i < 100; i++) {
            data.push(fun(data.length))
        }

        const plot = new LinePlot(container)
        plot.update(data)


        // const handle = setInterval(() => {
        //     data.push(fun(data.length))
        //     data.shift()
        //     plot.update(data)
        // }, 100)


        addButton?.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) {
                data.push(fun(data.length))
            }
            plot.update(data)
        })

        removeButton?.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) {
                data.shift()
            }
            plot.update(data)
            // plot.update(data)
            // clearInterval(handle)
        })
    }
});