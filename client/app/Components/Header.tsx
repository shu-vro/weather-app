"use client";

import { Input, Avatar, Tabs, Tab } from "@nextui-org/react";
import React from "react";
import { RiSearch2Line } from "react-icons/ri";
import icon from "@/assets/icon.png";

export default function Header() {
    return (
        <div className="flex justify-between items-center mr-6 ml-10">
            <div className="greetings flex flex-row items-center gap-4">
                <Avatar
                    size="lg"
                    isBordered
                    color="primary"
                    src={icon.src}
                    alt="Weather Api"
                />
                <section>
                    <span> Hi, there!</span> <br />
                    <h2 className="text-2xl">{get_today()}</h2>
                </section>
            </div>

            <div className="flex flex-row items-center gap-2">
                <Input
                    type="text"
                    radius="full"
                    isClearable
                    classNames={{
                        inputWrapper: "border-border border-2",
                        input: "text-lg py-3",
                    }}
                    placeholder="Search Location"
                    startContent={<RiSearch2Line className="text-3xl" />}
                />
                <Tabs
                    color="primary"
                    radius="full"
                    onSelectionChange={e => {
                        console.log(e);
                    }}>
                    <Tab title="C°" key="c" className="rounded-full" />
                    <Tab title="F°" key="f" className="rounded-full" />
                </Tabs>
            </div>
        </div>
    );
}

function get_today() {
    let date = new Date();
    return date.toLocaleString("default", {
        month: "short",
        weekday: "short",
        day: "2-digit",
        year: "numeric",
    });
}
