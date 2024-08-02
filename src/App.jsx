import './App.css'
import './styles/fonts.css'
import './styles/login.css'
import './styles/signUp.css'
import Header from './components/Header';
import NoteContainer from './components/NoteContainer';
import { Route, Routes } from 'react-router';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path='/' element={<NoteContainer />} />
        <Route path="/update/:id" element={<NoteContainer />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
};

export default App;
