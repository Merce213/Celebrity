import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
    return (
        <div className="background container mx-auto">
            <h1 className="text-4xl text-purple-400">Page Introuvable</h1>
            <Link className="border-b-2 text-purple-300" to="/">
                <p>Retour à l'accueil</p>
            </Link>
        </div>
    );
};

export default Error404;
