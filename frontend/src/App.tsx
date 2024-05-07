
import { useEffect, useState } from 'react'
import './App.css'

interface Blog{
  title: string;
  description: string;
}

function App() {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const url = 'http://localhost:3000/api/v1/blogApp/blog/allBlogs/';
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json(); 
    })
      .then((data) => {
        console.log("data", data);
        setBlogs(data.data);
      })
      .catch((error) => console.error('Error fetching posts:', error));
  },[]);
 

  return (
    <>
      <div>Blog App</div>
      <div>
        {blogs.map(blog => (
          <div key={blog.title} className='mb-5'>
            <p>{blog.title}</p>
            <p>{blog.description}</p>
          </div>
        ))}
      </div>

    </>
  )
}

export default App
