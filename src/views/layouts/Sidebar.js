import React, {useState} from "react";
import {Nav, NavLink as ReactstrapNavLink} from "reactstrap";
import {Country} from "../../config/endpoint";
import {NavLink} from "react-router-dom";

const Sidebar = () => {
    const [navData, setNav] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    async function fetchData() {
        setIsLoading(true);

        const response = await fetch(Country);
        const json = await response.json();

        //console.log(json);
        setData(json);
        setIsLoading(false);
    }

    return (
        <div className={"sidebar"} data={"blue"}>
            <div className={"sidebar-wrapper"} ref={"sidebar"}>
                <div className={"logo"}></div>
                <Nav>
                    {
                        isLoading ? 'Loading...' :
                            navData.map((item, key) => {
                                return (
                                    <li key={key}>
                                        <NavLink>
                                            <i className={prop.icon} />
                                            <p>{rtlActive ? prop.rtlName : prop.name}</p>
                                        </NavLink>
                                    </li>
                                );
                            })
                    }
                </Nav>
            </div>
        </div>
    );
}

export default Sidebar;