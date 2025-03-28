import React, { useState, useEffect } from "react";
import { Clock, MapPin, Share2, Heart, Ticket, Calendar } from "lucide-react";
import { useLoaderData } from "react-router-dom";

const EventDetail = () => {
  const event = useLoaderData();
  console.log("Fetched event data:", event);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (!event || !event.eventDate) return;

      const eventDate = new Date(event.eventDate);
      const difference = eventDate - new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    if (event) {
      const timer = setInterval(calculateTimeLeft, 1000);
      return () => clearInterval(timer);
    }
  }, [event]);

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <p>Error: Event not found</p>
      </div>
    );
  }

  const formattedEventDate = new Date(event.eventDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedRegisterCloseDate = new Date(event.registerCloseDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6 mt-16">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">
        <img src={event.eventImage} alt={event.eventTitle} className="w-full h-80 object-cover" />

        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                Live Concert
              </span>
              <div className="flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <Heart className="w-5 h-5 text-gray-500 hover:text-red-500 cursor-pointer" />
              </div>
            </div>
            <button className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600">
              Buy Tickets - ₹{event.price}
            </button>
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4 flex items-center">
            {event.eventTitle}
            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Verified
            </span>
          </h1>

          <p className="text-gray-700 text-lg mb-6">{event.eventDescription}</p>

          <div className="flex space-x-4 mb-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center">
                  <span className="text-2xl font-bold">{value}</span>
                </div>
                <span className="text-sm text-gray-500 capitalize">{unit}</span>
              </div>
            ))}
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex items-center space-x-3">
              <Clock className="w-6 h-6 text-gray-500" />
              <span>{formattedEventDate}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Calendar className="w-6 h-6 text-gray-500" />
              <span>Registration closes on: {formattedRegisterCloseDate}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-6 h-6 text-gray-500" />
              <span>{event.eventLocation}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Ticket className="w-6 h-6 text-gray-500" />
              <span>Tickets Available: {event.remainingTickets} / {event.totalTickets}</span>
            </div>
          </div>

          

        </div>
      </div>
    </div>
  );
};

export default EventDetail;
