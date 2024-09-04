// src/pages/createNote.jsx

import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateNote = () => {
    const [note, setNote] = useState("");
    const navigate = useNavigate();
    const { userData } = useAuthContext();

    const handleChange = (e) => {
        setNote(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_API_SERVER}/note`,
                { note },
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            navigate("/note");
        } catch (error) {
            console.error("Error creating note:", error);
        }
    };

    return (
        <div>
            <h1>Create Note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Note</label>
                    <textarea
                        value={note}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="inline-block my-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75">Create Note</button>
            </form>
        </div>
    );
};

export default CreateNote;
