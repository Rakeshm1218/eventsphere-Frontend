import React, { useEffect, useState } from "react";
import { CgCalendar } from "react-icons/cg";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Events = () => {
  const [events, setEvents] = useState([]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const getEvents = async () => {
    try {
      const response = await fetch("http://localhost:8080/events/getAll");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setEvents(data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="w-full flex flex-col items-center mt-20 px-6">
      <h1 className="my-8 text-3xl font-semibold">Explore all the events</h1>
      
      {/* Grid layout for responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-7xl ">
        {events.map((event, index) => {
          const dateParts = event.eventDate.split("-");
          const year = dateParts[0];
          const month = dateParts.length > 1 ? dateParts[1] : "";
          const day = dateParts.at(-1) || "";
          
          return (
            <Link
              
              key={index}
              className="flex flex-col p-5 shadow-sm rounded-lg hover:shadow-lg transition duration-300 bg-white"
              to={event.eventId ? `/events/${event.eventId}` : "#"}
            >
              <img
                src={event.eventImage}
                alt={event.eventTitle}
                className="w-full h-60 object-cover rounded-lg"
              />
              <div className="mt-4">
                <h1 className="text-lg">{event.eventTitle}</h1>
                <p className="flex items-center mt-2 text-gray-600">
                  <FaLocationDot className="text-[#FF5ACD] mr-2" />
                  {event.eventLocation.split(",").pop().trim()}
                </p>
                <p className="flex items-center mt-2 text-gray-600">
                  <CgCalendar className="text-[#FBDA61] mr-2" />
                  {months[month - 1]}, {day} {year}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Events;
