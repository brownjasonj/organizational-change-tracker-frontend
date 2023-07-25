import * as d3 from "d3";
import React from "react";
import { Component } from "react"

interface OrganationHierarchyProps {
    height: number;
    width: number;
};

interface OrganationHierarchyType {
    name: string;
    value: number;
    type: string;
    level: string;
    children?: OrganationHierarchyType[];
};
    
    
const treeData: OrganationHierarchyType = {
    "name": "Eve",
    "value": 15,
    "type": "black",
    "level": "yellow",
    "children": [
       {
          "name": "Cain",
          "value": 10,
          "type": "grey",
          "level": "red"
       },
       {
          "name": "Seth",
          "value": 10,
          "type": "grey",
          "level": "red",
          "children": [
             {
                "name": "Enos",
                "value": 8,
                "type": "grey",
                "level": "purple"
             },
             {
                "name": "Noam",
                "value": 8,
                "type": "grey",
                "level": "purple"
             }
          ]
       },
       {
          "name": "Abel",
          "value": 10,
          "type": "grey",
          "level": "blue"
       },
       {
          "name": "Awan",
          "value": 10,
          "type": "grey",
          "level": "green",
          "children": [
             {
                "name": "Enoch",
                "value": 8,
                "type": "grey",
                "level": "orange"
             }
          ]
       },
       {
          "name": "Azura",
          "value": 10,
          "type": "grey",
          "level": "green"
       }
    ]
 };


class OrganizationHierarchyComponent extends Component<OrganationHierarchyProps, {}> {
    private ref!: SVGSVGElement; 

    drawOrganizationHierarchy() {
        // set the dimensions and margins of the diagram
        const margin = {top: 20, right: 90, bottom: 30, left: 90},
        width  = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

        // Declares a tree layout and assigns the size
        const treemap = d3.tree<OrganationHierarchyType>().size([height, width]);
        let nodes: d3.HierarchyNode<OrganationHierarchyType> = d3.hierarchy(treeData, (d) => { return d.children; });
        const nodes2 = treemap(nodes);

        // const g = d3.select(this.ref);
        const svg = d3.select(this.ref)
                    .append("svg")
                    .attr("width", width + margin.left + margin.right)
                    .attr("height", height + margin.top + margin.bottom);
        const g = svg.append("g")
                    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const link = g.selectAll(".link")
                    .data(nodes2.descendants().slice(1))
                    .enter()
                    .append("path")
                    .attr("class", "link")
                    .style("stroke", d => d.data.level)
                    .attr("d", d => {
                        return "M" + d.y + "," + d.x
                            + "C" + (d.y + d.parent!.y) / 2 + "," + d.x
                            + " " + (d.y + d.parent!.y) / 2 + "," + d.parent!.x
                            + " " + d.parent!.y + "," + d.parent!.x;
                    });

        const node = g.selectAll(".node")
                        .data(nodes2.descendants())
                        .enter()
                        .append("g")
                        .attr("class", d => "node" + (d.children ? " node--internal": " node--leaf"))
                        .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

        

        node.append("circle")
            .attr("r", d => d.data.value)
            .style("stroke", d => d.data.type)
            .style("fill", d => d.data.level);

        node.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d.children ? (d.data.value + 5) * -1 : d.data.value + 5)
            .attr("y", d => (d.children && d.depth !== 0) ? -(d.data.value + 5) : 0)
            .style("text-anchor", d => d.children ? "end" : "start")
            .text(d => d.data.name);
    }

    componentDidMount() {
        this.drawOrganizationHierarchy();
    }

    render() {
        return (
            <div className="svg">
                <svg className="container" ref={(ref: SVGSVGElement) => this.ref = ref} width='2000' height='400'></svg>
            </div>
        );
    }
}

export { OrganizationHierarchyComponent }