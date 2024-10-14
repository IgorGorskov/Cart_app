import React from "react";

import "./Header.css"

import logo from "../../assets/shop-seeklogo.svg";
import { useNavigate } from "react-router-dom";

interface Props {
    children: React.ReactNode;
  }

export const Header: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate()
    function handleClick(){
        navigate('/')
    }
    return <div className="header">
        <a href="/" className="header__logo" onClick={handleClick}>
            <img src={logo} alt="logo" />
        </a>
        {children}
    </div>
}