import Editor from '../../components/Editor/Editor';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetch('http://localhost:4000/post/' + id).then((response) => {
      response.json().then((postData) => {
        setTitle(postData.title);
        setContent(postData.content);
        setSummary(postData.summary);
      });
    });
  }, [id]);

  async function updatePost(event) {
    event.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
      credentials: 'include',
    });
    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/post/' + id} />;
  }

  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <input
        type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={(event) => setSummary(event.target.value)}
      />
      <input type="file" onChange={(event) => setFiles(event.target.files)} />
      <Editor value={content} onChange={setContent} />
      <button className="create">Update post</button>
    </form>
  );
}
