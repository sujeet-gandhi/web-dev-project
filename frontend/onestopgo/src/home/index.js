import React, {useEffect, useState} from "react";
import StoreList from "../store/store-list";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import CategoriesList from "./categories-list";
import axios from "axios";

const baseURL = "http://localhost:8080/api/v1/home";

export default function HomeComponent() {
    const [home, setHome] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            console.log(response.data);
            setHome(response.data);
        });
    }, []);

    if (!home) return null;

    return (
        <>
            <nav>
                <div className="nav-wrapper teal">
                    <form>
                        <div className="input-field">
                            <input id="search" type="search" required/>
                            <label className="label-icon" htmlFor="search"><i className="material-icons">search</i></label>
                            <i className="material-icons">close</i>
                        </div>
                    </form>
                </div>
            </nav>
            <StoreList storeArray={home.stores}/>
            <CategoriesList categoriesArray={home.categories}/>
        </>
    );
}
