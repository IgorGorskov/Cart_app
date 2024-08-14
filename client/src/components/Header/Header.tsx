import "./Header.css"
import logo from "../../assets/shop-seeklogo.svg";

export const Header = () => {
    return <div className="header">
        <a href="#" className="header__logo">
            <img src={logo} alt="logo" />
        </a>
    </div>
}