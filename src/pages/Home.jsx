import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export default function Home() {
    const { userData } = useAuthContext();

    return (
        <>
            {userData ? (
                <div className="h-screen bg-green-100 flex flex-col p-2 text-center">
                    <h1 className="text-4xl font-bold text-green-700">
                        Welcome Home
                    </h1>
                    <p className="my-2 text-2xl text-green-600">
                        Hello, {userData.fullName}!
                    </p>
                    <p className="my-2 text-lg text-green-500">
                        We're glad to have you back. Explore your notes, tasks,
                        and events.
                    </p>
                    <div className="my-2">
                        <Link
                            to="/task"
                            className="inline-block my-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                        >
                            Tasks
                        </Link>
                        <Link
                            to="/note"
                            className="ml-2 inline-block my-2 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
                        >
                            Notes
                        </Link>
                        <Link
                            to="/event"
                            className="ml-2 inline-block my-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                        >
                            Events
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="h-screen bg-green-100 flex flex-col p-2 text-center">
                    <h1 className="text-4xl font-bold text-green-700">
                        Welcome to Our App
                    </h1>
                    <p className="my-2 text-2xl text-green-600">
                        Please Login or Sign Up
                    </p>
                    <p className="my-2 text-lg text-green-500">
                        Join us and manage your tasks, notes, and events
                        efficiently.
                    </p>
                    <div className="my-2">
                        <Link
                            to="/login"
                            className="inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="inline-block ml-4 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
}
