// src/pages/editNote.jsx

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
    const [note, setNote] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { userData } = useAuthContext();

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_SERVER}/note/${id}`, {
                    headers: { Authorization: `Bearer ${userData.token}` },
                });
                setNote(response.data.note);
            } catch (error) {
                console.error("Error fetching note:", error);
            }
        };

        fetchNote();
    }, [id]);

    const handleChange = (e) => {
        setNote(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(
                `${import.meta.env.VITE_API_SERVER}/note/${id}`,
                { note },

                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            navigate("/note");
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div>
            <h1>Edit Note</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Note</label>
                    <textarea
                        value={note}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="inline-block my-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75">Update Note</button>
            </form>
        </div>
    );
};

export default EditNote;
