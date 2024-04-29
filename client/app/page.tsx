"use client";

import React from "react";
import ForecastComponent from "./Components/ForecastComponent";
import CurrentInfoComponent from "./Components/CurrentInfoComponent";
import HourlyDataComponent from "./Components/HourlyDataComponent";
import OverviewComponent from "./Components/OverviewComponent";
import RequestDataContext from "./Components/RequestDataContext";

export default function Home() {
    return (
        <div className="grid-page grid gap-6 min-h-[calc(100vh-8.5rem)] my-4">
            <RequestDataContext>
                <></>
                <CurrentInfoComponent />
                <HourlyDataComponent />
                <ForecastComponent />
                <OverviewComponent />
                {/* 
                
                 */}
            </RequestDataContext>
        </div>
    );
}
