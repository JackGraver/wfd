import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Restaurants from "./pages/Restaurants";
import Recipes from "./pages/Recipes";
import NavBar from "./components/navbar/NavBar";
import Recipe from "./pages/Recipe";

function App() {
    return (
        <Router>
            <NavBar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/restaurants" element={<Restaurants />} />
                <Route path="/recipes" element={<Recipes />} />
                <Route path="/recipe" element={<Recipe />} />
            </Routes>
        </Router>
    );
}

export default App;
