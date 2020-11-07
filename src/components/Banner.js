import React, { useEffect, useState } from 'react';
import './Banner.css';
import DateRange from "./DateRange";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import moment from "moment";

am4core.useTheme(am4themes_animated);

function Banner({ data }) {
    const [range, setRange] = useState({});

    function showGraph(data) {
        let chart = am4core.create("chartdiv", am4charts.XYChart);
        // "title": "USA",
        // "visits": 2025
        chart.data = data;
        let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "title";
        categoryAxis.renderer.grid.template.location = 0;
        categoryAxis.renderer.minGridDistance = 30;

        categoryAxis.renderer.labels.template.adapter.add("dy", function (dy, target) {
            if (target.dataItem && target.dataItem.index & 2 == 2) {
                return dy + 25;
            }
            return dy;
        });

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

        // Create series
        let series = chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "visits";
        series.dataFields.categoryX = "title";
        series.name = "Visits";
        series.columns.template.tooltipText = "{categoryX}: [bold]{valueY}[/]";
        series.columns.template.fillOpacity = .8;

        let columnTemplate = series.columns.template;
        columnTemplate.strokeWidth = 2;
        columnTemplate.strokeOpacity = 1;
    }

    useEffect(() => {
        showGraph(data.map(({ title, time_published }) => { return { title, visits: moment(time_published).format('YYYY') } }));
    }, []);


    function dateHandler(value, id) {
        const dates = { ...range };

        dates[id] = value;
        setRange(dates);
    }

    function calculateHisto() {
        const filteredData = data.filter((wikiObj) => {
            let { time_published } = wikiObj;
            time_published = moment(time_published);
            return (time_published >= moment(range.start) && time_published <= moment(range.end));
        });
        console.log(filteredData);
        showGraph(filteredData.map(({ title, time_published }) => { return { title, visits: moment(time_published).format('YYYY') } }));
    }

    return (
        <header className="banner"
            style={{
                backgroundSize: "cover",
                backgroundPosition: "center center"
            }}
        >
            <div className="banner_contents">
                <h1>NLP Core Task</h1>
                <div className="banner_buttons">
                    <DateRange inputId="start" handler={dateHandler} />
                    <DateRange inputId="end" handler={dateHandler} />
                    <button style={{ height: "30px" }} onClick={calculateHisto} className="banner_button">Show histogram</button>
                    <div id="histogramContainer" className="histogram">
                        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Banner;