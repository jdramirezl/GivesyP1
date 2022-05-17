import { ColorModeScript } from "@chakra-ui/react";
import * as React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import ProductoDetail from "./components/product/Details";
import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import NoMatch from "./components/NoMatch";

const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<ChakraProvider>
			<ColorModeScript />
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Navigate to="home" />} />
						<Route path="home" element={<App />} />
						<Route
							path="producto/:prodId"
							element={<ProductoDetail />}
						/>
						<Route path="*" element={<NoMatch />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</ChakraProvider>
	</React.StrictMode>
);
