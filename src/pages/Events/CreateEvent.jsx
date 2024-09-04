// src/pages/CreateEvent.jsx

import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
    const [event, setEvent] = useState("");
    const [dateTime, setDateTime] = useState("");
    const navigate = useNavigate();
    const { userData } = useAuthContext();

    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_API_SERVER}/event`,
                { event, dateTime },
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            console.log(res);
            navigate("/event");
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Event</label>
                    <input
                        type="text"
                        value={event}
                        onChange={handleEventChange}
                        required
                    />
                </div>
                <div>
                    <label>Date and Time</label>
                    <input
                        type="datetime-local"
                        value={dateTime}
                        onChange={handleDateTimeChange}
                        required
                    />
                </div>
                <button type="submit" className="inline-block my-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Create Event</button>
            </form>
        </div>
    );
};

export default CreateEvent;
