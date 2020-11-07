import React, { useEffect, useState } from 'react';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

function Task2({ data }) {
    function calculateCommonAttributes(_data) {
        return _data.reduce((acc, { sections }) => {
            const d = sections.reduce((acc, section) => {
                section.attributes.forEach(attr => {
                    acc[attr.name] = 0;
                });
                return acc;
            }, {});

            acc = [...(Object.keys(d)), ...(Object.keys(acc))].reduce((acc, key) => {
                acc[key] = acc.hasOwnProperty(key) ? acc[key] + 1 : 1;
                return acc;
            }, {})
            return acc;
        }, {})
    }

    function showGraph(_data) {
        let chart = am4core.create("chartdiv2", am4charts.XYChart);
        let calulatedObject = calculateCommonAttributes(_data);
        let graphData = Object.keys(calulatedObject).map(key => { return { attribute: key, occurance: calulatedObject[key] } });
        console.log(graphData);
        chart.data = graphData;

        var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "attribute";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
        });

        var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        var series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "occurance";
        series.dataFields.categoryX = "attribute";
        series.name = "occurance";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        var columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    useEffect(() => {
        showGraph(data);
    }, [])

    return (
        <div className="middle-content">
            <h1>Task 2</h1>
            <div id="chartdiv2" style={{ width: "100%", height: "500px" }}></div>
        </div>
    )
}

export default Task2;