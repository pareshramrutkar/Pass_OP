import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setform] = useState({ site: "", username: "", password: "" });
    const [passwordsArray, setpasswordsArray] = useState([]);
    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        let passwordsArray;
        if (passwords) {
            setpasswordsArray(JSON.parse(passwords));
        }
    }, []);

    const copyText = (text) => {
        toast.success('Copied to clipboard...!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            // transition: Bounce,
        });
        navigator.clipboard.writeText(text)
    }

    const ShowPassword = () => {
        // alert("show pasword");
        passwordref.current.type = "text"
        if (ref.current.src.includes("icons/crosseye.png")) {
            ref.current.src = "icons/eye.png";
            passwordref.current.type = "text"
        } else {
            ref.current.src = "icons/crosseye.png";
            passwordref.current.type = "password"
        }
    };

    const savePassword = () => {
        // console.log(form);
        // toast.success('Password saved succesfully...!', {
        //     position: "top-right",
        //     autoClose: 5000,
        //     hideProgressBar: false,
        //     closeOnClick: true,
        //     pauseOnHover: true,
        //     draggable: true,
        //     progress: undefined,
        //     theme: "dark",
        //     // transition: Bounce,
        // });
            setpasswordsArray([...passwordsArray, {...form, id: uuidv4() }]);
            localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form, id: uuidv4() }]));
            console.log([...passwordsArray, form]);
            setform({ site: "", username: "", password: "" })
        };

    const editPassword = (id) => {
        console.log("edit " + id);
        setform(passwordsArray.filter(item => item.id === id)[0])
        setpasswordsArray(passwordsArray.filter(item => item.id !== id))
        // localStorage.setItem("passwords", JSON.stringify([...passwordsArray, {...form, id: uuidv4()}]));
        // console.log([...passwordsArray, form]);
    };

    const deletePassword = (id) => {
        console.log("deleted " + id);
        let c = confirm("do you really want delete password")
        if (c) {
            setpasswordsArray(passwordsArray.filter(item => item.id !== id));
            localStorage.setItem("passwords", JSON.stringify(passwordsArray.filter(item => item.id !== id)));
            // console.log([...passwordsArray, form]);
            
            // toast.success('Password deleted succesfully...!', {
            //     position: "top-right",
            //     autoClose: 5000,
            //     hideProgressBar: false,
            //     closeOnClick: true,
            //     pauseOnHover: true,
            //     draggable: true,
            //     progress: undefined,
            //     theme: "dark",
            //     // transition: Bounce,
            // })
        }
    };

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={true}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            {/* Same as */}
            <ToastContainer />
            <div className=" absolute inset-0 -z-10 h-full w-full">
                <div className=" absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div></div>

            <div className="p-2 md:p-8 md:mycontainer">
                <h1 className=" text-4xl font-bold text-center">
                    <span className=" text-green-700"> &lt;</span>
                    Pass
                    <span className=" text-green-700">OP/&gt;</span>
                </h1>

                <p className=" text-center text-green-900 text-lg">
                    Your Password Manger
                </p>

                <div className="flex flex-col p-4 text-black gap-6 items-center">
                    <input value={form.site} onChange={handleChange} placeholder="Enter URL Website" className=" rounded-full border border-green-500 w-full p-4 py-2" type="text" name="site" id="site" />

                    <div className=" flex md:flex-row flex-col w-full justify-between gap-4">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className=" rounded-full border border-green-500 w-full p-4 py-2" type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordref} value={form.password} onChange={handleChange} placeholder="Enter Password" className=" rounded-full border border-green-500 w-full p-4 py-2" type="password" name="password" id="password" />
                            <span className=" absolute right-2 top-3 cursor-pointer" onClick={ShowPassword}>
                                {/* <img ref={ref} width={20} src="icons/eye.png" alt="" /> */}
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className=" flex items-center gap-2 bg-green-500 hover:bg-green-600 rounded-full w-fit px-8 py-2 border-2 border-green-900">
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"></lord-icon>
                        Save Password
                    </button>
                </div>
                <div className="passwords">
                    <h1 className="font-bold text-2xl py-4">Your Passwords</h1>
                    {passwordsArray.length === 0 && <div>no passwords found </div>}
                    {passwordsArray.length != 0 &&
                        <table className="auto-table w-full rounded-md overflow-hidden mb-10">
                            <thead className=" bg-green-700 text-white">
                                <tr>
                                    <th className="py-2 ">Site</th>
                                    <th className="py-2 ">Username</th>
                                    <th className="py-2 ">Passwords</th>
                                    <th className="py-2 ">Actions</th>
                                </tr>
                            </thead>
                            <tbody className=" bg-green-100 ">
                                {passwordsArray.map((item, index) => {
                                    return <tr key={index}>
                                        <td className="text-center w-32 py-2 border border-white">
                                            <div className="flex justify-center items-center">
                                                <a href={item.site} target="_blanks">{item.site}</a>
                                                <div className="cursor-pointer px-2" onClick={() => copyText(item.site)}>
                                                    <img className="w-4" src="icons/copy.png" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center w-32 py-2 border border-white">
                                            <div className="flex justify-center items-center">
                                                <span>{item.username}</span>
                                                <div className="cursor-pointer px-2" onClick={() => copyText(item.username)}>
                                                    <img className="w-4" src="icons/copy.png" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center w-32 py-2 border border-white">
                                            <div className="flex justify-center items-center">
                                                <span>{"*".repeat(item.password.length)}</span>
                                                <div className="cursor-pointer px-2" onClick={() => copyText(item.password)}>
                                                    <img className="w-4" src="icons/copy.png" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="text-center w-32 py-2 border border-white">
                                            <div className="flex justify-center items-center">
                                                <span onClick={() => { editPassword(item.id) }} className="cursor-pointer mx-2"><img className="w-4" src="icons/pencil.png" alt="" /></span>
                                                <span onClick={() => { deletePassword(item.id) }} className="cursor-pointer mx-2"><img className="w-4" src="icons/delete.png" alt="" /></span>
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>
                        </table>}
                </div>
            </div>
        </>
    );
};

export default Manager;
