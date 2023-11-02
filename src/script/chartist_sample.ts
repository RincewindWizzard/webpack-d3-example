// import * as Chartist from 'chartist';
//
// import 'chartist';
// import 'chartist/dist/index.scss';
// import 'chartist-plugin-tooltips';
// import 'chartist-plugin-legend';
//
//
// document.addEventListener('DOMContentLoaded', () => {
//     const container = document.getElementById('diagram')
//     if(container) {
//         const data = {
//             labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
//             series: [
//                 [5, 2, 4, 2, 0]
//             ]
//         };
//
//         const options = {
//             width: container.offsetWidth,
//             height: container.offsetHeight
//         };
//
//         new Chartist.LineChart('#diagram', data, options);
//     }
// });

import 'chartist/dist/index.scss';
import {LineChart, AutoScaleAxis, Interpolation} from 'chartist';

const container = document.getElementById('diagram')
if (container) {
    new LineChart(
        '#diagram',
        {
            series: [
                [
                    {x: 1, y: 100},
                    {x: 2, y: 50},
                    {x: 3, y: 25},
                    {x: 5, y: 12.5},
                    {x: 8, y: 6.25}
                ]
            ]
        },
        {
            width: container.offsetWidth,
            height: container.offsetHeight,
            showArea: true,
            lineSmooth: Interpolation.step(),
            axisX: {
                type: AutoScaleAxis,
                onlyInteger: true
            }
        }
    )
}