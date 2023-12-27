import './Post.css';
import { formatISO9075 } from 'date-fns';
import PropTypes from 'prop-types';

export default function Post({
  // _id,
  title,
  summary,
  // content,
  cover,
  createdAt,
  author,
}) {
  return (
    <div className="post">
      <div className="image">
        <img src={'http://localhost:4000/' + cover}></img>
      </div>
      <div className="text">
        <h2>{title}</h2>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{formatISO9075(new Date(createdAt))}</time>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

Post.propTypes = {
  _id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date),
  author: PropTypes.string.isRequired,
};
