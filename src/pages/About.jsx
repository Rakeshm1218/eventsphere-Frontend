import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 ">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">About EventSphere</h1>
          <p className="text-xl mb-12 leading-relaxed">
            EventSphere is revolutionizing how people plan, promote, and participate in events. 
            Our innovative platform connects event creators with passionate attendees, 
            transforming every gathering into a memorable experience.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className=" p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p>
                To empower event creators and attendees by providing a seamless, 
                innovative platform that transforms event experiences.
              </p>
            </div>
            <div className=" p-6 rounded-xl">
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p>
                To become the global leader in event management, connecting people 
                through unforgettable experiences across various industries and interests.
              </p>
            </div>
            <div className=" p-6 rounded-xl bg-[#FBDA61]">
              <h3 className="text-2xl font-bold mb-4">Our Values</h3>
              <p>
                Innovation, Connectivity, User Experience, and Passion drive everything 
                we do at EventSphere.
              </p>
            </div>
          </div>

          <div className=" backdrop-blur-md p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6">What Makes Us Unique</h2>
            <p className="text-lg leading-relaxed">
              From corporate conferences to music festivals, weddings to workshops, 
              EventSphere provides the tools you need to bring your vision to life. 
              Our platform is designed to make event planning simple, engaging, and extraordinary.
            </p>
          </div>
        </div>
      </div>

  );
};

export default About;