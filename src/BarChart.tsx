import * as d3 from "d3";
import { Component } from "react";

interface BarChartProps {
    data: number[];
    width: number;
    height: number;
  }


class BarChart extends Component<BarChartProps, {}> {
    private ref!: SVGSVGElement; 

    drawChart() {
        // const width = 200,
        const scaleFactor = 10,
        barHeight = 20;
    
        const graph = d3.select(this.ref)
          .attr("width", this.props.width)
          .attr("height", barHeight * this.props.data.length);
    
        const bar = graph.selectAll("g")
          .data(this.props.data)
          .enter()
          .append("g")
          .attr("transform", (d, i) => { return "translate(0," + i * barHeight + ")"; });
    
        bar.append("rect")
          .attr("width", (d) => { return d * scaleFactor;})
          .attr("height", barHeight - 1);
           
        bar.append("text")
          .attr("x", (d) => { return (d*scaleFactor); })
          .attr("y", barHeight / 2)
          .attr("dy", ".35em")
          .text((d) => { return d; });
    }
    
    drawChart2() {
        // const width = 200,
        const scaleFactor = 3,
        barWidth = 30;
    
        const graph = d3.select(this.ref)
          .attr("width", barWidth * this.props.data.length)
          .attr("height", this.props.height * scaleFactor);
    
        const bar = graph.selectAll("g")
          .data(this.props.data)
          .enter()
          .append("g")
          .attr("transform", (d, i) => { return "translate(0," + i  + ")"; });
    
        bar.append("rect")
          .attr("width", barWidth -1)
          .attr("height", (d) => { return (this.props.height - d) * scaleFactor;})
          .attr("x", (d,i) => i * barWidth)
          .attr("y", (d) => { return (this.props.height - d)*scaleFactor; })
          .attr("fill", "green");
           
        bar.append("text")
          .attr("x", (d,i) => i * barWidth)
          .attr("y", (d) => { return (this.props.height - d)*scaleFactor-10; })
          .attr("dy", ".35em")
          .text((d) => { return d; });

    }

    componentDidMount() {
        this.drawChart2();
    }

    render() {
        return (
            <div className="svg">
                <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width='100' height='100'></svg>
            </div>
        );
    }
}

export { BarChart };