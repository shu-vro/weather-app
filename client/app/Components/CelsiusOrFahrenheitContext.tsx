"use client";

import { createContext, useContext, useState } from "react";

const Context = createContext({} as CelsiusOrFahrenheitType);

type CelsiusOrFahrenheitType = {
    celsius: boolean;
    setTemperature: React.Dispatch<React.SetStateAction<boolean>>;
};

export const useCelsiusOrFahrenheit = () => {
    return useContext(Context);
};

export const CelsiusOrFahrenheitContext = ({
    children,
}: Readonly<{ children: React.ReactNode }>) => {
    const [celsius, setTemperature] = useState(true);

    return (
        <Context.Provider value={{ celsius, setTemperature }}>
            {children}
        </Context.Provider>
    );
};
