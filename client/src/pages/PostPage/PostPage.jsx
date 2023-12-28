import './PostPage.css';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { formatISO9075 } from 'date-fns';

export default function PostPage() {
  const { id } = useParams();
  const [postData, setPostData] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((post) => {
        setPostData(post);
      });
    });
  }, []);

  if (!postData) return '';

  return (
    <div className="post-page">
      <h1>{postData.title}</h1>
      <time>{formatISO9075(new Date(postData.createdAt))}</time>
      <div className="author">by {postData.author.username}</div>
      <div className="image">
        <img src={`http://localhost:4000/${postData.cover}`} alt="" />
      </div>

      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postData.content }}
        // to directly implement html snippet into div
      />
    </div>
  );
}
