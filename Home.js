import React from 'react';
import { Link } from 'react-router-dom'
import './Home.css'
import blog from './blog.png'
function Home() {
  return (
    <div>
      <div className="row container">
        <div className="col-md-8">
          <p style={{ fontSize: '19px',  borderRadius: '10px' }} className="m-5 p-4 text-dark">
            A free app 🧑‍💻 that allows you to create multi-user blogs with time-stamped entries. You can use it to post, edit,
            save, and view your blog posts. To post, you need a Google Account and a blog created from a computer. Blogify📑 is
            a good option for individuals or businesses looking for a user-friendly and free platform✍️ to create and manage a
            basic blog. However, if you need more advanced features, design control, or storage space, you might consider paid
            blogging platforms.
          </p>
        </div>
        <div className='col-md-4'>
          <br />
          <br />
            <img src={blog} alt="" style={{width:'500px',height:'250px'}}/>
        </div>
      </div>
      <div className="text-center mt-1">
        <Link to="/about" style={{textDecoration:"none", color: 'blue' }} className="h-link p-5 m-5">
          To know more Explore the App
        </Link>
      </div>
    </div>
  );
}

export default Home;
