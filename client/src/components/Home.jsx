import React from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
const Home = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/login');
    }
    return (
        <div className="view bg-image home_bg">
            <div style={{ minHeight: "100vh" }} className="d-flex justify-content-center align-items-center">
                <div className="container text-dark">
                    <div>
                        <img className="key" src="images/key.png" alt="" />
                    </div>
                    <div>
                        <img className="logo" src="images/logo.png" alt="" />
                    </div>
                    <p className="text-white fs-1">WELCOME MASTER OF KNOWLEDGE</p>
                    <button className="startBtn px-4 py-2" onClick={handleClick} type="submit">START GAME</button>
                    {/* <p className="fs-5">PRESS BUTTON TO START GAME</p> */}
                </div>
            </div>
        </div >
    )
}

export default Home;