import React from "react";
import { Skeleton } from "@nextui-org/react";
import { CustomCard } from "./HelperComponents";
import { cn } from "@/lib/utils";

export default function Loading({
    name,
    count = 1,
    vertical = false,
}: {
    name: string;
    count?: number;
    vertical?: boolean;
}) {
    return (
        <CustomCard
            name={name}
            className={cn("gap-3", vertical ? "flex-row" : "flex-col")}>
            {Array(count)
                .fill(0)
                .map((_, i) => (
                    <Skeleton
                        className="rounded-3xl h-full w-full"
                        key={i}></Skeleton>
                ))}
        </CustomCard>
    );
}
