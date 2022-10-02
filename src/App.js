import "./App.css";
import { Routes, Route } from "react-router-dom";
import BookList from "./components/booklist/BookList";
import BookDetails from "./components/bookdetails/BookDetails";
import Footer from "./components/footer/Footer";
import Favorites from "./components/favorites/Favorites";
import Login from './components/login/Login';
import Register from './components/register/Register';
import Recommend from "./components/recommend/Recommend";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/booklist" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/recommended" element={<Recommend/>}/>
        <Route path="/" element={<Login/>}/>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
