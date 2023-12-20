import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import IndexPage from './pages/IndexPage/IndexPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path={'/login'} element={<LoginPage />} />
        <Route path={'/register'} element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
