import './App.css';
import Post from './components/Post/Post';

function App() {
  return (
    <main>
      <header>
        <a href="" className="logo">
          Blog
        </a>
        <nav>
          <a href="">Login</a>
          <a href="">Register</a>
        </nav>
      </header>
      <div className="entries">
        <Post />
        <Post />
        <Post />
      </div>
    </main>
  );
}

export default App;
