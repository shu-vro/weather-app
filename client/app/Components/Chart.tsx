"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const CanvasJsChart: React.ComponentType<any> = dynamic(
    async () => {
        // @ts-ignore
        const chart = await import("@canvasjs/react-stockcharts");
        return chart.default.CanvasJSStockChart;
    },
    { ssr: false }
);

export default function Chart({
    dataPoints = [],
    suffix = "%",
    ...rest
}: React.HTMLAttributes<HTMLDivElement> & {
    dataPoints?: {
        x: any;
        y: any;
        markerType?: string;
        markerColor?: string;
        markerBorderColor?: string;
    }[];
    suffix?: string;
}) {
    const StartTime = new Date();
    StartTime.setHours(StartTime.getHours() - 6);
    const EndTime = new Date();
    EndTime.setHours(EndTime.getHours() + 6);
    const [options, setOptions] = useState({
        animationEnabled: true,
        title: {
            // text: "Music Album Sales by Year",
        },
        theme: "dark1",
        backgroundColor: "transparent",
        height: 460,
        rangeSelector: {
            inputFields: {
                // valueFormatString: "YYYY",
            },

            buttons: [],
        },
        navigator: {
            slider: {
                minimum: StartTime,
                maximum: EndTime,
            },
        },
        charts: [
            {
                axisX: {
                    crosshair: {
                        enabled: true,
                        snapToDataPoint: true,
                    },

                    gridThickness: 0,
                    tickLength: 0,
                    lineThickness: 0,
                },
                axisY: {
                    crosshair: {
                        enabled: true,
                    },
                    suffix,
                    gridDashType: "longDash",
                    gridColor: "rgba(255, 255, 255, 0.2)",
                },

                // toolTip: {
                // updated(e: any) {
                //     e.entries[0].dataPoint.markerType = "circle";
                //     e.entries[0].dataPoint.markerColor = "black";
                //     e.entries[0].dataPoint.markerBorderColor = "white";
                // },
                // },
                data: [
                    {
                        yValueFormatString: `#,### ${suffix}`,
                        xValueFormatString: "D'th' MMMM, YYYY hh:mm tt",
                        type: "spline",
                        lineColor: "white",
                        markerType: "circle",
                        markerColor: "black",
                        markerBorderColor: "white",
                        markerBorderThickness: 4,
                        dataPoints,
                    },
                ],
            },
        ],
    });
    return (
        <div {...rest}>
            <CanvasJsChart options={options} {...rest} />
        </div>
    );
}
