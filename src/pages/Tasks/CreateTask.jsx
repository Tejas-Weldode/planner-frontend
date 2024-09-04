// src/pages/CreateTask.jsx

import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateTask = () => {
    const [task, setTask] = useState("");
    const [status, setStatus] = useState("pending");
    const [dueDate, setDueDate] = useState("");
    const navigate = useNavigate();
    const { userData } = useAuthContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(
                `${import.meta.env.VITE_API_SERVER}/task`,
                { task, status, dueDate },
                { headers: { Authorization: `Bearer ${userData.token}` } }
            );
            navigate("/task");
        } catch (error) {
            console.error("Error creating task:", error);
        }
    };

    return (
        <div>
            <h1>Create Task</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Task</label>
                    <input
                        type="text"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Status</label>
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
                <div>
                    <label>Due Date</label>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>
                <button type="submit" className="inline-block my-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75">Create Task</button>
            </form>
        </div>
    );
};

export default CreateTask;
