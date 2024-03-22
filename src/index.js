import { createRoot } from "react-dom/client"; // Importing createRoot from "react-dom/client"
import App from "./App";

const root = createRoot(document.getElementById("root")); // Using createRoot to create a root
root.render(<App />);
