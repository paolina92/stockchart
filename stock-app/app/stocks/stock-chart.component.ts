import {Component}          from 'angular2/core';

@Component({
	selector: 'stock-chart',
	template: `
		<div class="row text-center"><svg id="visualisation" width="1000" height="350"></svg></div>
	`
})
export class StockChartComponent {
    
	initChart(data) {

        let i =0;
        let maxX = this._getMaxX(data);
        let maxY = this._getMaxY(data);

        let vis = d3.select("#visualisation"),
        WIDTH = 1000,
        HEIGHT = 350,
        MARGINS = {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50
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
            .attr('x', 395 + 100 * index)
            .attr('y', 280)
            .style('fill', data[index].color)
            .style('stroke', data[index].color);
            vis.append('svg:text')
            .text(data[index].label)
            .style('font-size', "10px")
            .style('fill', data[index].color)
            .attr('x', 420 + 100 * index)
            .attr('y', 285);
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