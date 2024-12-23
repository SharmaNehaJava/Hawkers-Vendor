import React, { useState } from 'react';

const Nav = () => {
    const [username, setUsername] = useState("@username");

    return (
        <div className="h-12 flex items-center justify-between bg-white px-4 z-10 shadow-md">
            <div className="flex items-center">
                <img src="https://img.icons8.com/external-outline-black-m-oki-orlando/32/40C057/external-hawker-retail-outline-outline-black-m-oki-orlando.png" className="h-6" alt="Logo" />
                <img className="h-8" src="./logo.png" alt="Logo" />
            </div>
            <div className="flex justify-center items-center mx-4 text-black">
                <div className="h-10 w-10 rounded-full bg-gray-600 bg-opacity-50 flex items-center justify-center mx-2">
                    <img src="" alt="" className="rounded-full object-cover" />
                </div>
                <div className="text-black">{username}</div>
            </div>
        </div>
    );
};

export default Nav;
