import React from "react";
import { Link } from "react-router-dom";

import { OffCanvasToggleProvider } from "../context/OffcanvasMenuContext.jsx";
import OffCanvasMenu from "./OffcanvasMenu.jsx";

export default function Navbar() {
    return (
        <div className="bg-green-400 flex justify-between">
            <Link to="/" className="flex items-center">
                <p className="font-light text-xl px-4">
                    Personal <span className="font-normal">Planner</span>
                </p>
            </Link>
            {/* Offcanvas menu CODE --- START 2/2*/}
            <OffCanvasToggleProvider>
                <OffCanvasMenu />
            </OffCanvasToggleProvider>
            {/* Offcanvas menu CODE --- END   2/2*/}
        </div>
    );
}
