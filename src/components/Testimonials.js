import React from 'react';
import './Testimonial.css';

function Testimonials() {
  const testimonials = [
    {
      name: 'Ayesha Ali',
      image: 'https://img.freepik.com/premium-photo/natural-beauty-portrait-woman-autumn-forest_1351942-2475.jpg', 
      rating: 5,
      feedback:
        '“SmartCart makes meal planning so easy! I love how I can pick a recipe, and all the ingredients are added to my cart instantly.”',
    },
    {
      name: 'Ahmad Junaid',
      image: 'https://img.freepik.com/free-photo/handsome-man-smiling-happy-face-portrait-close-up_53876-145493.jpg', 
      rating: 5,
      feedback:
        '“I was skeptical at first, but this app has saved me so much time. The ingredient suggestions are spot-on”',
    },
    {
      name: 'Sahil Khan',
      image: 'https://www.ciee.org/sites/default/files/styles/650h/public/blog/2018-05/6a010536fa9ded970b0224df30ce71200b.jpg?itok=iJzB8XaM', 
      rating: 5,
      feedback:
        '“SmartCart makes cooking fun and stress-free. No more running to the store last minute for missing ingredients!”',
    },
  ];

  return (
    <section className="conatiner ">
       

  <div className="container bg-warning reviewcontainer my-5">
  <div className="row justify-content-center">
    {testimonials.map((testimonial, index) => (
      <div key={index} className="col-12 col-md-4 d-flex  mb-4">
        <div className="card cardbg bg-warning border-0 text-center p-3 rounded d-flex flex-row">
          <div className="iamgereview d-flex justify-content-center align-items-center me-3">
            <img
              src={testimonial.image}
              alt={testimonial.name}
              className="rounded-circle"
              style={{
                width: '100px',
                height: '100px',
                objectFit: 'cover',
              }}
            />
          </div>

          <div className="textreview d-flex flex-column justify-content-center">
            <div className="stars mb-2">
              {'★'.repeat(testimonial.rating)}
            </div>
            <p className="text-muted ">{testimonial.feedback}</p>
            <h6 className="fw-bold text-name  mt-3">{testimonial.name}</h6>
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


      
    </section>
  );
}

export default Testimonials;
