import React from "react";

import "./Header.css"

import logo from "../../assets/shop-seeklogo.svg";

interface Props {
    children: React.ReactNode;
  }

export const Header: React.FC<Props> = ({ children }) => {
    return <div className="header">
        <a href="#" className="header__logo">
            <img src={logo} alt="logo" />
        </a>
        {children}
    </div>
}