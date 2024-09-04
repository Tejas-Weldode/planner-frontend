// src/pages/displayNotes.jsx

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayNotes = () => {
    const [notes, setNotes] = useState([]);
    const { userData } = useAuthContext();

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_SERVER}/note`,
                    { headers: { Authorization: `Bearer ${userData.token}` } }
                );
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_SERVER}/note/${id}`,
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            setNotes(notes.filter((note) => note._id !== id));
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    return (
        <div>
            <h1>Notes</h1>
            <Link
                to="/note/create"
                className="inline-block my-2 px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-75"
            >
                Create New Note
            </Link>
            <ul>
                {notes.map((note) => (
                    <li
                        key={note._id}
                        className="p-4 mb-4 bg-yellow-100 rounded-lg shadow-md flex items-center justify-between"
                    >
                        <div className="text-yellow-800">
                            <p className="text-lg font-semibold">{note.note}</p>
                        </div>
                        <div className="flex space-x-4">
                            <Link
                                to={`/note/edit/${note._id}`}
                                className="text-yellow-600 hover:text-yellow-800 font-medium"
                            >
                                Edit
                            </Link>
                            <button
                                onClick={() => handleDelete(note._id)}
                                className="text-red-600 hover:text-red-800 font-medium"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DisplayNotes;
