import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import swal from "sweetalert";
import axios from "../services/axios";

const Edit = () => {
    let { id } = useParams();
    const navigate = useNavigate();

    const [celebrity, setCelebrity] = useState({
        firstname: "",
        lastname: "",
        description: "",
    });

    const [errorlist, setErrorlist] = useState([]);

    const [picture, setPicture] = useState([]);

    useEffect(() => {
        axios
            .get(`/celebrities/${id}`)
            .then((res) => {
                console.log(res.data.data);
                if (res.data.status === 200) {
                    setCelebrity(res.data.data);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCelebrity({ ...celebrity, [name]: value });
    };

    const handleImage = (e) => {
        setPicture({ image: e.target.files[0] });
    };

    const updateCelebrity = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", picture.image);
        formData.append("firstname", celebrity.firstname);
        formData.append("lastname", celebrity.lastname);
        formData.append("description", celebrity.description);
        axios
            .post(`/celebrities/${id}`, formData)
            .then((res) => {
                console.log(res);
                if (res.data.status === 200) {
                    swal("Success", res.data.message, "success");
                    setErrorlist([]);
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                    navigate("/");
                } else {
                    swal("Error", "All fields are mandatory", "error");
                    setErrorlist(res.data.errors);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="background">
            <Navbar />
            <div className="container mx-auto">
                <div className="container max-w-lg mx-auto flex-1 flex flex-col items-center justify-center min-h-screen px-2">
                    <div className="bg-slate-50 px-6 py-8 border-y rounded shadow-md text-black w-full mb-10">
                        <h1 className="mb-8 text-2xl text-center">
                            Edit {celebrity.firstname} Profile
                        </h1>
                        <form
                            className="flex flex-col"
                            onSubmit={updateCelebrity}
                            encType="multipart/form-data"
                        >
                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="block border w-full p-3 rounded"
                                    name="firstname"
                                    placeholder="Firstname"
                                    onChange={handleChange}
                                    value={celebrity.firstname}
                                />
                                <span className="text-red-400">
                                    {errorlist.firstname}
                                </span>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="text"
                                    className="block border w-full p-3 rounded"
                                    name="lastname"
                                    placeholder="Lastname"
                                    onChange={handleChange}
                                    value={celebrity.lastname}
                                />
                                <span className="text-red-400">
                                    {errorlist.lastname}
                                </span>
                            </div>

                            <div className="mb-4">
                                <textarea
                                    name="description"
                                    className="block border w-full p-3 rounded resize-none"
                                    placeholder="Description"
                                    onChange={handleChange}
                                    value={celebrity.description}
                                ></textarea>
                                <span className="text-red-400">
                                    {errorlist.description}
                                </span>
                            </div>

                            <div className="mb-4">
                                <input
                                    type="file"
                                    name="image"
                                    onChange={handleImage}
                                    className="block w-full text-sm text-slate-500

      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                                />
                                <img
                                    src={`http://localhost:8000/${celebrity.image}`}
                                    alt={
                                        celebrity.firstname +
                                        " " +
                                        celebrity.lastname
                                    }
                                    width="50px"
                                />
                                <span className="text-red-400">
                                    {errorlist.image}
                                </span>
                            </div>

                            <button
                                type="submit"
                                className="w-full text-center py-3 rounded bg-green-500 text-white hover:bg-green-dark focus:outline-none my-1"
                            >
                                Edit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;
