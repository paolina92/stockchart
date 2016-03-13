import {Component}          from 'angular2/core';

@Component({
	selector: 'stock-chart',
	template: `
		<svg id="visualisation" width="1240" height="500"></svg>
	`
})
export class StockChartComponent {
    
	initChart(data) {

        let i =0;
        let maxX = this._getMaxX(data);
        let maxY = this._getMaxY(data);

        let vis = d3.select("#visualisation"),
        WIDTH = 1240,
        HEIGHT = 500,
        MARGINS = {
            top: 40,
            right: 50,
            bottom: 40,
            left: 75
        },
        xScale = d3.scale.linear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([1, maxX]),
        yScale = d3.scale.linear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, maxY]),
        xAxis = d3.svg.axis().scale(xScale),
        yAxis = d3.svg.axis().scale(yScale).orient("left");

        d3.select("#visualisation").selectAll("*").remove();

        vis.append("svg:g").attr("class", "x axis").attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")").call(xAxis);
        vis.append("svg:g").attr("class", "y axis").attr("transform", "translate(" + (MARGINS.left) + ",0)").call(yAxis);   

        let lineGen = d3.svg.line()
        .x(function() {
            i++;
            return xScale(i);
        })
        .y(function(d) {
            return yScale(d.val);
        });

        for(let index in data){
            i=0;
            vis.append('svg:path').attr('d', lineGen(data[index].values)).attr('stroke', data[index].color).attr('stroke-width', 3).attr('fill', 'none');
            vis.append('svg:rect')
            .attr('width', 20)
            .attr('height', 3)
            .attr('x', 525 + 100 * index)
            .attr('y', 430)
            .style('fill', data[index].color)
            .style('stroke', data[index].color);
            vis.append('svg:text')
            .text(data[index].label)
            .style('font-size', "10px")
            .style('fill', data[index].color)
            .attr('x', 550 + 100 * index)
            .attr('y', 435);
        }
	}

    _getMaxX(data){
        for(let index in data){
            let max = data[index].values.length;
        }
        return max;
    }

    _getMaxY(data){
        let valuesArray = [];
        for(let index in data){
            for(let item in data[index].values){
                valuesArray.push(Math.ceil(data[index].values[item].val));
            }
        }
        let max = Math.max.apply(Math, valuesArray);
        return max
    }
}