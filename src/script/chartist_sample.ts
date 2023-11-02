import 'chartist/dist/index.scss';
import {AutoScaleAxis, Interpolation, LineChart} from 'chartist';

const container = document.getElementById('diagram')
if (container) {
    new LineChart(
        '#diagram',
        {
            series: [
                [
                    {x: 1, y: 1},
                    {x: 2, y: 2},
                    {x: 3, y: 5},
                    {x: 5, y: 6},
                    {x: 8, y: 7},
                    // {x: 9, y: 8},
                ],
                [
                    {x: 8, y: 7},
                    {x: 9, y: 8},
                    {x: 10, y: 6},
                    {x: 11, y: 5},
                    {x: 12, y: 2},
                    {x: 13, y: 1}
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
            },
            axisY: {
                type: AutoScaleAxis,
                onlyInteger: true
            },
        }
    )
}