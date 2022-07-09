/* React */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
/* Components */
import Navbar from "../components/Navbar";
import AccordionUI from "../components/AccordionUI";
/* Services */
import axios from "../services/axios";
import swal from "sweetalert";
/* Tabs */
import Tabs, { TabPane } from "rc-tabs";
import "rc-tabs/assets/index.css";
import "../styles/tabs.css";

const Home = () => {
    const [celebrity, setCelebrity] = useState([]);

    const [index, setIndex] = useState(false);

    useEffect(() => {
        fetchAllCelibrity();
    }, []);

    const fetchAllCelibrity = () => {
        axios
            .get("/celebrities")
            .then((res) => {
                setCelebrity(res.data);
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteCelebrity = (id) => {
        axios
            .delete(`/celebrities/${id}`)
            .then((res) => {
                if (res.data.status === 200) {
                    console.log(res.data);
                    swal("Success", res.data.message, "success");
                    fetchAllCelibrity();
                } else if (res.data.status === 404) {
                    swal("Error", res.data.message, "error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isLargeScreen = useMediaQuery({
        query: "(min-width: 1024px)",
    });

    const callback = (e) => {
        console.log(e);
    };

    return (
        <div className="background">
            <Navbar />
            <div className="container mx-auto">
                <div className="flex justify-center">
                    <h1 className="pt-5 text-2xl text-white">
                        Celebrity Profiles
                    </h1>
                </div>
                {isLargeScreen ? (
                    <Tabs
                        tabPosition="left"
                        defaultActiveKey="1"
                        onChange={callback}
                        className="mt-20 h-[26rem]"
                    >
                        {celebrity.map((celebrity) => (
                            <TabPane
                                tab={
                                    celebrity.firstname +
                                    " " +
                                    celebrity.lastname
                                }
                                key={celebrity.id}
                                className=""
                            >
                                <img
                                    src={`http://localhost:8000/${celebrity.image}`}
                                    alt={
                                        celebrity.firstname +
                                        " " +
                                        celebrity.lastname
                                    }
                                    className="p-1 mr-4 bg-white border rounded w-44 h-44 object-cover float-left"
                                />
                                <p>{celebrity.description}</p>

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
                                            deleteCelebrity(celebrity.id);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </TabPane>
                        ))}
                    </Tabs>
                ) : (
                    <div className="flex flex-col justify-center items-center px-5 h-auto py-20">
                        {celebrity.map((celebrity) => (
                            <AccordionUI
                                key={celebrity.id}
                                title={
                                    celebrity.firstname +
                                    " " +
                                    celebrity.lastname
                                }
                                id={celebrity.id}
                                children={celebrity.description}
                                img={celebrity.image}
                                index={index}
                                setIndex={setIndex}
                                celebrity={celebrity}
                                deleteCelebrity={deleteCelebrity}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
