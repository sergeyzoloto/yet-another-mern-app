import Post from '../../components/Post/Post';
import { useEffect, useState } from 'react';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch('http://localhost:4000/post').then((response) => {
      response
        .json()
        .then((posts) => {
          setPosts(posts);
        })
        .catch((error) => {
          console.log(error);
        });
    });
  }, []);
  return (
    <>
      {posts.length > 0 &&
        posts.map((post) => <Post key={post._id} {...post} />)}
    </>
  );
}
