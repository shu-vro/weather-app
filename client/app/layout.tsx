import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./Components/Header";
import { ThemeProvider } from "./Components/Providers";
import ApolloContext from "./Components/ApolloContext";
import { CelsiusOrFahrenheitContext } from "./Components/CelsiusOrFahrenheitContext";

const font = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`${font.className} min-h-screen`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange>
                    <ApolloContext>
                        <CelsiusOrFahrenheitContext>
                            <div className="p-6">
                                <Header />
                                {children}
                            </div>
                        </CelsiusOrFahrenheitContext>
                    </ApolloContext>
                </ThemeProvider>
            </body>
        </html>
    );
}
