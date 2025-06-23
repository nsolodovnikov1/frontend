import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

export default function TrainGraph({ trains }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();
    const width = 700;
    const height = 350;
    const margin = { left: 80, top: 40 };

    if (!trains.length) return;

    // Список станций по порядку их появления
    const stations = [
      ...new Set(trains.flatMap(t => t.routes.map(r => r.station)))
    ];
    const yScale = d3.scalePoint().domain(stations).range([margin.top, height - margin.top]);

    // Временной диапазон
    const times = trains.flatMap(t => t.routes.map(r => r.arrival));
    const parse = d3.timeParse("%H:%M");
    const xScale = d3.scaleTime()
      .domain([
        d3.min(times, t => parse(t)),
        d3.max(times, t => parse(t))
      ])
      .range([margin.left, width - margin.left]);

    svg.attr("width", width).attr("height", height);

    // Ось станций
    svg.selectAll(".station-label")
      .data(stations)
      .enter()
      .append("text")
      .attr("x", margin.left - 65)
      .attr("y", d => yScale(d))
      .text(d => d);

    // Сетка по времени
    const xAxis = d3.axisBottom(xScale).ticks(10).tickFormat(d3.timeFormat("%H:%M"));
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.top})`)
      .call(xAxis);

    // Линии поездов
    trains.forEach(train => {
      const points = train.routes.map(r => ({
        x: xScale(parse(r.arrival)),
        y: yScale(r.station)
      }));
      svg.append("path")
        .datum(points)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("d", d3.line().x(d => d.x).y(d => d.y));
      // Подписи поездов
      svg.append("text")
        .attr("x", points[0]?.x)
        .attr("y", points[0]?.y - 10)
        .attr("fill", "steelblue")
        .text(train.name);
    });
  }, [trains]);

  return <svg ref={ref}></svg>;
}