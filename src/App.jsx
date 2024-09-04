import { React } from "react";
import { Routes, Route } from "react-router-dom";
// pages
import PageNotFound from "./pages/PageNotFound.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import Logout from "./utils/Logout.jsx";
import Update from "./pages/Update.jsx";
import VerifyEmail from "./pages/VerifyEmail.jsx";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword.jsx";
import SetNewPassword from "./pages/ForgotPassword/SetNewPassword.jsx";
//
// components
import Navbar from "./components/Navbar.jsx";
//context
import { useAuthContext } from "./context/AuthContext.jsx";
import CreateNote from "./pages/Notes/CreateNote.jsx";
import DisplayNotes from "./pages/Notes/DisplayNotes.jsx";
import EditNote from "./pages/Notes/EditNote.jsx";
import CreateTask from "./pages/Tasks/CreateTask.jsx";
import EditTask from "./pages/Tasks/EditTask.jsx";
import DisplayTasks from "./pages/Tasks/DisplayTasks.jsx";
import CreateEvent from "./pages/Events/CreateEvent.jsx";
import EditEvent from "./pages/Events/EditEvent.jsx";
import DisplayEvents from "./pages/Events/DisplayEvents.jsx";
//
function App() {
    const { userData } = useAuthContext();
    return (
        <>
            <Navbar />
            <div className="container mx-auto px-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route
                        path="/login"
                        element={userData ? <Home /> : <Login />}
                    />
                    <Route path="/logout" element={<Logout />} />

                    <Route
                        path="/signup"
                        element={userData ? <Home /> : <Signup />}
                    />
                    <Route
                        path="/update"
                        element={userData ? <Update /> : <Home />}
                    />
                    <Route
                        path="/verify"
                        element={userData ? <VerifyEmail /> : <Home />}
                    />
                    <Route
                        path="/note/create"
                        element={userData ? <CreateNote /> : <Home />}
                    />
                    <Route
                        path="/note/edit/:id"
                        element={userData ? <EditNote /> : <Home />}
                    />
                    <Route
                        path="/note"
                        element={userData ? <DisplayNotes /> : <Home />}
                    />

                    <Route
                        path="/task/create"
                        element={userData ? <CreateTask /> : <Home />}
                    />
                    <Route
                        path="/task/edit/:id"
                        element={userData ? <EditTask /> : <Home />}
                    />
                    <Route
                        path="/task"
                        element={userData ? <DisplayTasks /> : <Home />}
                    />

                    <Route
                        path="/event/create"
                        element={userData ? <CreateEvent /> : <Home />}
                    />
                    <Route
                        path="/event/edit/:id"
                        element={userData ? <EditEvent /> : <Home />}
                    />
                    <Route
                        path="/event"
                        element={userData ? <DisplayEvents /> : <Home />}
                    />

                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/set-new-password"
                        element={<SetNewPassword />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
