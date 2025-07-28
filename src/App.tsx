import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import Profile from './pages/Profile';
import ItemDetail from './pages/ItemDetail';
import SearchResults from './pages/SearchResults';
import SignUp from './pages/SignUp';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/product/:id" element={<ItemDetail />} />
      <Route path="/search" element={<SearchResults />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}