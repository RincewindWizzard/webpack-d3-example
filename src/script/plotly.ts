// @ts-ignore
import * as Plotly from 'plotly.js-dist';

const trace1 = {
    x: [1, 2, 3, 4],
    y: [10, 15, 13, 17],
    type: 'scatter'
};

var data = [trace1];

Plotly.newPlot('diagram', data);
