import './Post.css';

export default function Post() {
  return (
    <div className="post">
      <div className="image">
        <img src="https://live.staticflickr.com/65535/52262973450_36e098af77_c.jpg"></img>
      </div>
      <div className="text">
        <h2>Title</h2>
        <p className="info">
          <a className="author">Name Surname</a>
          <time>2023-01-01 00:01</time>
        </p>
        <p className="summary">
          Few words about whatever bla bla bla bla bla bla bla bla bla bla bla
          blabla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
          blabla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
          bla bla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
          blabla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
          blabla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
          blabla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
          blabla bla bla bla bla blabla bla bla bla bla blabla bla bla bla bla
        </p>
      </div>
    </div>
  );
}
