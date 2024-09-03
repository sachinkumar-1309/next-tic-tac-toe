import { Inter } from "next/font/google";
import "./globals.css";
import Head from 'next/head';


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Tic Tac Toe",
	description: "Developed by Sachin",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
        <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Head>
			<body>{children}</body>
		</html>
	);
}
