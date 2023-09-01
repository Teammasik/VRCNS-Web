import React from "react";
import {NavLink} from "react-router-dom";
import "./NavigationBar.scss";

const NavigationBar = ({type}) => {

    const links = [
        {link: "/test-results", name: "Результаты тестирования"},
        {link: "/charts", name: "Инфографика"},
    ];

    switch (type) {
        case "header":
            return (
                <div style={{display: "flex", justifyContent: "center", textAlign: "center"}}>
                    <div className="NavigationBar__header" style={{width: "100%"}}>
                        <div style={{
                            display: "flex", alignItems: "center",
                            justifyContent: "center"
                        }}>VR CNS
                        </div>
                        <div className="NavigationBar__header__links">
                            {
                                links.map(link => {
                                    return <NavLink className={({isActive, isPending}) =>
                                        isPending ? "" : isActive ? "NavigationBar__header__link__active" : "NavigationBar__header__link__pending"
                                    } to={link.link} key={link.link}>{link.name}</NavLink>
                                })
                            }
                        </div>
                    </div>
                </div>
            );
        default:
            return <div>Error</div>
    }
}

export default NavigationBar;