import React, { useEffect, useRef, useState } from 'react';
import { Feature, FeatureCollection, Geometry, Polygon, Position } from "geojson";
import useWindowSize from '../hooks/useWindowSize';
import benchIcon from '../assets/Symbols/BENCH ICON.svg'
import treeIcon from '../assets/Symbols/TREE.svg'
import * as d3 from 'd3';


interface GridProps {
    gridData: FeatureCollection;
    benchData: FeatureCollection;
    pedestrianData: FeatureCollection;
    targetDate: string;
    targetHour: number;
}

/**
  * 
  * @param jsonData a geojson object
  * 
  * @param date the day for which the data should be retrieved from 
  * 
  * @param hour the hour at which the data should be retrieved from 
  * @returns a geojson object with features at the specified time
  */
function getDataAtTime(jsonData: FeatureCollection, date: string, hour: number): FeatureCollection {

    const filteredFeatures: Array<Feature> = jsonData.features.filter((feature: Feature) => {
        const timestamp: Date = new Date(feature.properties!.timestamp + ':00:00.000Z');
        const targetTime: Date = new Date(date);
        targetTime.setHours(targetTime.getHours() + hour)
        const timemask: boolean = (targetTime.getTime() == timestamp.getTime())
        return timemask;
    });
    const filteredData: FeatureCollection = {
        type: "FeatureCollection",
        features: filteredFeatures
    }
    return filteredData

}

const GridMap: React.FC<GridProps> = ({ gridData, benchData, pedestrianData, targetDate, targetHour }) => {
    const svgRef = useRef<SVGSVGElement>(null);


    const [hourlyBenchData, setBenchData] = useState<FeatureCollection>(getDataAtTime(benchData, targetDate, targetHour))
    const [hourlyPedestrianData, setPedestrianData] = useState<FeatureCollection>(getDataAtTime(pedestrianData, targetDate, targetHour))
    const { width, height } = useWindowSize();

    useEffect(() => {
        if (!gridData || !benchData || !pedestrianData) return
        setBenchData(getDataAtTime(benchData, targetDate, targetHour))
        setPedestrianData(getDataAtTime(pedestrianData, targetDate, targetHour))
        const svg = d3.select(svgRef.current);
        const svgWidth = width * 0.9;
        const svgHeight = height * 0.7;

        const benchLength: number = 15
        const pedestrianCircleRadius: number = 5
        const haloRadius: number = 20

        // Define the projection and path generator
        const projection = d3.geoMercator().fitSize([svgWidth, svgHeight], gridData);
        const path = d3.geoPath().projection(projection);

        // Remove any existing content before rendering
        svg.selectAll('*').remove();

        // Render the GeoJSON grid
        svg
            .append('g')
            .selectAll('path')
            .attr('id', 'grid')
            .data(gridData['features'])
            .enter()
            .append('path')
            .attr('d', path)
            .attr('fill', 'none')
            .attr('stroke', '#FF2953')
            .attr('stroke-width', 0.5);

        svg
            .append('image')
            .attr('xlink:href', () => treeIcon)
            .attr('x', svgWidth * 0.2)
            .attr('y', svgHeight * 0.63)
            .attr('width', 100) // Radius of the point
            .attr('height', 100) // Radius of the point
            .attr('fill', '#FF2551') // Color of the point
            .attr('stroke', 'none')
            .attr('stroke-width', 0.5);

        svg
            .append('image')
            .attr('xlink:href', () => treeIcon)
            .attr('x', svgWidth * 0.7)
            .attr('y', svgHeight * 0.7)
            .attr('width', 100) // Radius of the point
            .attr('height', 100) // Radius of the point
            .attr('fill', '#FF2551') // Color of the point
            .attr('stroke', 'none')
            .attr('stroke-width', 0.5);


        svg
            .append('g')
            .selectAll('image')
            .data(hourlyBenchData.features)
            .enter()
            .append('image')
            .attr('x', d => projection(d.geometry.coordinates)[0] - 12)
            .attr('y', d => projection(d.geometry.coordinates)[1] - 12)
            .attr('xlink:href', () => benchIcon)
            .attr('width', benchLength) // Radius of the point
            .attr('height', benchLength) // Radius of the point
            .attr('fill', '#FF2551') // Color of the point
            .attr('stroke', 'none')
            .attr('stroke-width', 0.5);




        svg
            .append('g')
            .selectAll('circle')
            .data(hourlyPedestrianData.features)
            .enter()
            .append('circle')
            .attr('cx', d => projection(d.geometry.coordinates)[0])
            .attr('cy', d => projection(d.geometry.coordinates)[1])
            .attr('r', pedestrianCircleRadius * 3) // Radius of the point
            .attr('fill', '#ffffff') // Color of the point
            .attr('stroke', 'none')
            .attr('opacity', 0.3)
            .attr('stroke-width', 0.5);

        svg
            .append('g')
            .selectAll('circle')
            .data(hourlyPedestrianData.features)
            .enter()
            .append('circle')
            .attr('cx', d => projection(d.geometry.coordinates)[0])
            .attr('cy', d => projection(d.geometry.coordinates)[1])
            .attr('r', pedestrianCircleRadius) // Radius of the point
            .attr('fill', '#FF2551') // Color of the point
            .attr('stroke', 'black')
            .attr('stroke-width', 0.5);




    }, [gridData, targetDate, targetHour]);



    return (
        <div
            style={{
                // backgroundImage: `
                // linear-gradient(90deg, #FEBECD 1px, transparent 1px), 
                // linear-gradient(180deg, #FEBECD 1px, transparent 1px)`,
                // backgroundSize: '4px 4px', /* adjust the spacing between the lines */
                backgroundColor: '#FFBDCC',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 0
            }}>

            <svg ref={svgRef} width={width} height={height * 0.7} style={{
                transform: 'rotate(-10deg)',
            }}>
                {/* Grid will be rendered here */}
            </svg>
        </div >
    );
};

export default GridMap;
