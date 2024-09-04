// src/pages/DisplayTasks.jsx

import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../context/AuthContext.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

const DisplayTasks = () => {
    const [tasks, setTasks] = useState([]);
    const { userData } = useAuthContext();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_API_SERVER}/task`,
                    { headers: { Authorization: `Bearer ${userData.token}` } }
                );
                setTasks(response.data);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };

        fetchTasks();
    }, [userData.token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(
                `${import.meta.env.VITE_API_SERVER}/task/${id}`,
                {
                    headers: { Authorization: `Bearer ${userData.token}` },
                }
            );
            setTasks(tasks.filter((task) => task._id !== id));
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    const handleComplete = async (id, currentStatus) => {
        try {
            // Toggle the status between 'completed' and 'pending'
            const newStatus =
                currentStatus === "completed" ? "pending" : "completed";

            await axios.put(
                `${import.meta.env.VITE_API_SERVER}/task/${id}`,
                { status: newStatus }, // Update the status field
                {
                    headers: { Authorization: `Bearer ${userData.token}` },
                }
            );

            // Update local state to reflect the change
            setTasks(
                tasks.map((task) =>
                    task._id === id ? { ...task, status: newStatus } : task
                )
            );
        } catch (error) {
            console.error("Error toggling task status:", error);
        }
    };

    return (
        <div>
            <h1>Tasks</h1>
            <Link
                to="/task/create"
                className="inline-block my-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
            >
                Create New Task
            </Link>
            <ul>
                {tasks.length > 0 ? (
                    tasks.map((task) => (
                        <li
                            key={task._id}
                            className="p-4 mb-4 bg-red-100 rounded-lg shadow-md flex flex-col sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="text-red-800">
                                <p
                                    className={
                                        task.status === "completed"
                                            ? "line-through text-lg"
                                            : "text-lg"
                                    }
                                >
                                    {task.task}
                                </p>
                                <p className="text-sm font-bold">
                                    Due Date:{" "}
                                    {new Date(
                                        task.dueDate
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="flex space-x-4 mt-4 sm:mt-0">
                                <Link
                                    to={`/task/edit/${task._id}`}
                                    className="text-red-400 hover:text-red-800 font-medium"
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={() =>
                                        handleComplete(task._id, task.status)
                                    }
                                    className="text-red-400 hover:text-red-800 font-medium"
                                >
                                    {task.status === "pending"
                                        ? "Mark as Completed"
                                        : "Mark as Pending"}
                                </button>
                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="text-red-400 hover:text-red-800 font-medium"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>No tasks found.</p>
                )}
            </ul>
        </div>
    );
};

export default DisplayTasks;
