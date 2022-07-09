import React from "react";
import { HiArrowCircleDown, HiX } from "react-icons/hi";
import { Link } from "react-router-dom";

const AccordionUI = ({
    title,
    children,
    id,
    index,
    setIndex,
    celebrity,
    deleteCelebrity,
}) => {
    const handleSetindex = (id) => index !== id && setIndex(id);

    return (
        <>
            <div
                onClick={() => handleSetindex(id)}
                className={
                    index === id
                        ? `flex group cursor-pointer w-full h-16 justify-between items-center p-2 mt-2 rounded-md bg-emerald-300 hover:shadow-lg focus:bg-emerald-300 text-slate-900 group-hover:text-slate-900`
                        : `flex group cursor-pointer w-full h-16 justify-between items-center p-2 mt-2 rounded-md bg-slate-900 hover:bg-emerald-300 hover:shadow-lg focus:bg-emerald-300 text-emerald-300 hover:text-slate-900`
                }
            >
                <div className="flex group cursor-pointer">
                    <div className="font-semibold pl-10">{title}</div>
                </div>
                <div className="flex items-center justify-center pr-10">
                    {index !== id ? (
                        <HiArrowCircleDown className="w-6 h-6" />
                    ) : (
                        <HiX className="w-6 h-6" />
                    )}
                </div>
            </div>

            {index === id && (
                <div className="bg-emerald-100 pl-10 font-semibold text-sm sm:text-base text-emerald-500 w-full h-auto rounded-md p-4 border-l-4 border-lime-400 mb-2 ">
                    <img
                        src={`http://localhost:8000/${celebrity.image}`}
                        alt={celebrity.firstname + " " + celebrity.lastname}
                        className="p-1 mr-4 bg-white border rounded w-20 h-20 sm:w-28 sm:h-28 object-cover float-left"
                    />

                    <p>{children}</p>

                    <div className="flex justify-between mt-4">
                        <Link
                            className="text-slate-900 hover:underline"
                            to={`/edit/${celebrity.id}`}
                        >
                            Edit
                        </Link>
                        <button
                            type="button"
                            className="text-slate-900 hover:underline"
                            onClick={() => {
                                deleteCelebrity(id);
                            }}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default AccordionUI;
