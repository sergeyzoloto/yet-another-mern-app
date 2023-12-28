import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import IndexPage from './pages/IndexPage/IndexPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { UserContextProvider } from './context/UserContext';
import CreatePost from './pages/CreatePost/CreatePost';
import PostPage from './pages/PostPage/PostPage';
import EditPost from './pages/EditPost/EditPost';

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/login'} element={<LoginPage />} />
          <Route path={'/register'} element={<RegisterPage />} />
          <Route path={'/create'} element={<CreatePost />} />
          <Route path={'/post/:id'} element={<PostPage />} />
          <Route path={'/edit/:id'} element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
