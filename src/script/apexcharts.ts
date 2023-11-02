import ApexCharts from 'apexcharts'


const data = []

for(let i = 0; i < 100; i++) {
    data.push([i, Math.sin(i / 100 * Math.PI * 2)])
}

var options = {
    chart: {
        type: 'line'
    },
    series: [{
        data: data
    }],
    xaxis: {
        type: 'numeric'
    }
}

var chart = new ApexCharts(document.querySelector("#diagram"), options);

chart.render();