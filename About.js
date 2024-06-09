import React from 'react'
import './About.css'
function About() {
  return (
    <div>
    <div>
      <h1 className="display-6 text-black p-5 text-center">About Blogify</h1>
      <div className="container">
      <div className="row">
        <div className="col-md-3">
          <div style={{height:"300px",padding:"25px",borderRadius:"5px",backgroundColor:"#63ace5",color:"black"}} className='rounded-lg hover-link'>
            <p>
              <h6 className="text-uppercase">Choose the perfect design </h6>
              Create a beautiful blog that fits your style. Choose from a selection of easy-to-use templates – all with flexible layouts and hundreds of background images – or design something new.
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div style={{height:"300px",padding:"25px",borderRadius:"5px",backgroundColor:"#03396c",color:"white"}} className=' rounded-lg hover-link'>
            <p>
              <h6 className="text-uppercase">Get a domain </h6>
              Give your blog the perfect home. Get a blogspot.com domain or buy a custom domain with just a few clicks.
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div style={{height:"300px",padding:"25px",borderRadius:"5px",backgroundColor:"#63ace5"}} className='rounded-lg hover-link'>
            <p>
              <h6 className="text-uppercase">Earn money</h6>
              Get paid for your hard work. Google AdSense can automatically display relevant targeted ads on your blog so that you can earn income by posting about your passion.
            </p>
          </div>
        </div>
        <div className="col-md-3">
          <div style={{height:"300px",padding:"25px",borderRadius:"5px",backgroundColor:"	#03396c",color:"white"}} className='rounded-lg hover-link'>
            <p>
              <h6 className="text-uppercase">Know your audience </h6>
              Find out which posts are a hit with Blogger’s built-in analytics. You’ll see where your audience is coming from and what they’re interested in. You can even connect your blog directly to Google Analytics for a more detailed look.
            </p>
          </div>
        </div>
      </div>
    </div>
      <p className="container p-5 m-6" style={{fontSize:"18px"}}>
        Welcome to Blogify, where words come to life! 🚀

        At Blogify, we believe in the power of storytelling. Everyone has a unique story to share, and our mission is to provide a platform that empowers individuals and businesses to express themselves through the art of blogging.

        📝 What sets Blogify apart?
        
        Blogify is not just another blogging platform; it's a community of passionate writers, thinkers, and creatives. Here are some key features that make Blogify special:

        🌐 User-Friendly: We've designed Blogify to be intuitive and user-friendly. Whether you're a seasoned blogger or just starting, you'll find our platform easy to navigate.

        🤝 Community Building: Connect with like-minded individuals, gain followers, and build a community around your ideas. Blogify is more than a platform; it's a space for meaningful interactions.

        📅 Time-Stamped Entries: Every blog post on Blogify comes with a timestamp, capturing the essence of the moment. Document your journey and share your experiences with the world.

        🌟 Free for All: Blogify is committed to providing a free and accessible platform for everyone. No hidden fees or premium subscriptions – just pure, unfiltered creativity.

        🚀 Ready to Join?
        
        Whether you're here to read, write, or both, we're thrilled to have you as part of the Blogify family. Join us on this exciting journey of words, ideas, and endless possibilities.

        Happy Blogging! 🎉
      </p>
    </div>
    

    </div>
  );
}

export default About;
