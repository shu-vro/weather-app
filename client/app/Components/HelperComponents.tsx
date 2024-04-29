import { cn } from "@/lib/utils";
import { Card, CardBody, CardProps, Image } from "@nextui-org/react";
import { useCelsiusOrFahrenheit } from "./CelsiusOrFahrenheitContext";
import { useMemo } from "react";

export function HourlyWeather({
    hourData,
    active = false,
}: {
    hourData: IHourlyData;
    active?: boolean;
}) {
    const { celsius } = useCelsiusOrFahrenheit();
    const epoch = useMemo(
        () =>
            new Date(hourData.time_epoch * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                hour12: true,
            }),
        []
    );
    return (
        <>
            <div
                className={cn(
                    "flex flex-col items-center bg-accent rounded-2xl p-3 text-black flex-[0_0_auto] w-28",
                    active && "border-4 border-blue-500"
                )}>
                <span className="text-xl">{epoch}</span>
                <Image
                    src={hourData.condition.icon}
                    alt={hourData.time_epoch.toString()}
                    className="w-16 h-16"
                />
                <span>
                    {celsius ? hourData.temp_c : hourData.temp_f}&deg;{" "}
                    {celsius ? "C" : "F"}
                </span>
            </div>
        </>
    );
}

export function ForecastCard({ forecast }: { forecast: IBasicForecastData }) {
    const { celsius } = useCelsiusOrFahrenheit();
    const date = useMemo(() => new Date(forecast.date), []);
    // const date = new Date(forecast.date);
    return (
        <div className="flex flex-row justify-between items-center bg-background rounded-2xl p-3 shadow-md">
            <div className="flex flex-row justify-center items-center">
                <Image src={forecast.day.condition.icon} alt="forecast" />
                <div>
                    <span className="text-2xl">
                        {celsius
                            ? forecast.day.avgtemp_c
                            : forecast.day.avgtemp_f}
                        &deg;
                    </span>
                    /
                    <span className="text-sm">
                        {celsius
                            ? forecast.day.mintemp_c
                            : forecast.day.mintemp_f}
                        &deg;
                    </span>
                </div>
            </div>
            <div>
                <span className="text-2xl">
                    {date.getDate().toString().padStart(2, "0")}{" "}
                </span>
                <span className="text-sm align-baseline">
                    {date.toLocaleString("default", { month: "short" })},{" "}
                    {date.toLocaleString("default", { weekday: "short" })}
                </span>
            </div>
        </div>
    );
}

export function SmallCard({
    stats,
    label,
}: {
    stats: React.ReactNode;
    label: string;
}) {
    return (
        <div className="my-5">
            <h1 className="font-bold text-4xl">{stats}</h1>
            <span>{label}</span>
        </div>
    );
}

export function CustomCard({
    children,
    name,
    className = "",
    classNameOuter = "",
    ...rest
}: {
    children: React.ReactNode;
    className?: string;
    classNameOuter?: string;
    name: string;
} & CardProps) {
    return (
        <Card
            {...rest}
            className={cn("bg-card rounded-3xl", classNameOuter)}
            shadow="lg"
            style={{
                gridArea: name,
            }}>
            <CardBody className={cn(className)}>{children}</CardBody>
        </Card>
    );
}
