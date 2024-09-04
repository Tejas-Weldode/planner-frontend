// src/pages/DisplayEvents.jsx

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayEvents = () => {
    const [events, setEvents] = useState([]);
    const { userData } = useAuthContext();

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_SERVER}/event`,
                    { headers: { Authorization: `Bearer ${userData.token}` } }
                );
                setEvents(response.data);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [userData.token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_SERVER}/event/${id}`,
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            setEvents(events.filter((event) => event._id !== id));
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div>
            <h1>Events</h1>
            <Link
                to="/event/create"
                className="inline-block my-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
            >
                Create New Event
            </Link>
            <ul>
                {events.length > 0 ? (
                    events.map((event) => (
                        <li
                            key={event._id}
                            className="p-4 mb-4 bg-blue-100 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="text-blue-800">
                                <p className="text-lg font-semibold">
                                    {event.event}
                                </p>
                                <p className="text-sm">
                                    Date and Time:{" "}
                                    {new Date(event.dateTime).toLocaleString()}
                                </p>
                            </div>
                            <div className="flex space-x-4 mt-4 sm:mt-0">
                                <Link
                                    to={`/event/edit/${event._id}`}
                                    className="text-blue-600 hover:text-blue-800 font-medium"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(event._id)}
                                    className="text-red-600 hover:text-red-800 font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No events found.</p>
                )}
            </ul>
        </div>
    );
};

export default DisplayEvents;
