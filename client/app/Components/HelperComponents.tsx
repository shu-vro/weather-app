import { cn } from "@/lib/utils";
import { Card, CardBody, CardProps, Image } from "@nextui-org/react";

export function HourlyWeather({
    hourData,
    active = false,
}: {
    hourData: IHourlyData;
    active?: boolean;
}) {
    const epoch = new Date(hourData.time_epoch * 1000);
    return (
        <>
            <div
                className={cn(
                    "flex flex-col items-center bg-accent rounded-2xl p-3 text-black flex-[0_0_auto] w-28",
                    active && "border-4 border-blue-500"
                )}>
                <span className="text-xl">
                    {epoch.toLocaleTimeString([], {
                        hour: "2-digit",
                        hour12: true,
                    })}
                </span>
                <Image
                    src={hourData.condition.icon}
                    alt={hourData.time_epoch.toString()}
                    className="w-16 h-16"
                />
                <span>{hourData.temp_c}&deg;</span>
            </div>
        </>
    );
}

export function ForecastCard({ forecast }: { forecast: IBasicForecastData }) {
    const date = new Date(forecast.date);
    return (
        <div className="flex flex-row justify-between items-center bg-background rounded-2xl p-3 shadow-md">
            <div className="flex flex-row justify-center items-center">
                <Image src={forecast.day.condition.icon} alt="forecast" />
                <div>
                    <span className="text-2xl">
                        +{forecast.day.avgtemp_c}&deg;
                    </span>
                    /
                    <span className="text-sm">
                        +{forecast.day.mintemp_c}&deg;
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
