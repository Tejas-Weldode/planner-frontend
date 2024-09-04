// src/pages/EditEvent.jsx

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditEvent = () => {
    const [event, setEvent] = useState("");
    const [dateTime, setDateTime] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useAuthContext();

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_SERVER}/event/${id}`,
                    { headers: { Authorization: `Bearer ${userData.token}` } }
                );
                setEvent(response.data.event);
                setDateTime(
                    new Date(response.data.dateTime).toISOString().slice(0, 16)
                );
            } catch (error) {
                console.error("Error fetching event:", error);
            }
        };

        fetchEvent();
    }, [id, userData.token]);

    const handleEventChange = (e) => {
        setEvent(e.target.value);
    };

    const handleDateTimeChange = (e) => {
        setDateTime(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${import.meta.env.VITE_API_SERVER}/event/${id}`,
                { event, dateTime },
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            navigate("/event");
        } catch (error) {
            console.error("Error updating event:", error);
        }
    };

    return (
        <div>
            <h1>Edit Event</h1>
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
                <button type="submit" className="inline-block my-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">Update Event</button>
            </form>
        </div>
    );
};

export default EditEvent;
