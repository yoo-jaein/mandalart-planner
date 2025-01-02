import React from "react";

function MandalartLayout({ children }) {
    return (
        <div className="container">
            <header>
                <h1>Mandalart Planner</h1>
            </header>
            <main>
                {children}
            </main>
        </div>
    );
}

export default MandalartLayout;
