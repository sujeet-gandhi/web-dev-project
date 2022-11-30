import React, {useState} from "react";
import NavBar from "../nav-bar";

const ONESTOPGO_API = process.env.REACT_APP_ONESTOPGO_API_BASE;

const ProfilePage = () => {

    const mockUserData = () => {
        return {
            imageUrl: 'images/user/190015bd-511a-41f5-ac17-f401aef8df46.jpg',
            email: 'arnold@onestopgo',
            password: 'arnold789'
        }
    }

    const [editable, setEditable] = useState(true);
    const [localUserData, setLocalUserData] = useState(mockUserData());

    const handleDataEntry = ({target}) => {
        let val = target.value;
        let name = target.name;
        if (name === "imageUrl") {
            val = target.files[0]
            name = "image";
        }
        setLocalUserData({
            ...localUserData,
            [name]: val
        })
    }

    return (
        <>
            <NavBar links={[{link: 'cart', name: 'Cart'}, {link: 'orders', name: 'Orders'}]}
                              userData={mockUserData()}/>
            <div className="row mt-2">
                <div className="col-4 float-end">
                    <img width={150}
                         height={150}
                         src={ONESTOPGO_API + "/" + localUserData.imageUrl}
                         className="circle float-end mt-5"/>
                </div>
                <div className="col-8">
                    <div className="ms-2 me-2 mt-2 mb-2 align-content-between">
                        <div className="fs-2 text-center">
                            Update Personal Data
                        </div>
                        <div className="form-floating wd-top-margin-form">
                            <input type="email" className="form-control text-bg-light" id="email" name="email"
                                   value={localUserData.email} disabled={true}/>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating wd-top-margin-form">
                            <input type="password" className="form-control text-bg-light" id="password" name="password"
                                   value={localUserData.password} disabled={editable}/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="form-floating wd-top-margin-form">
                            <input type="text" className="form-control text-bg-light" id="address" name="address"
                                   value={localUserData.address} disabled={editable} onChange={handleDataEntry}/>
                            <label htmlFor="address">Address</label>
                        </div>
                        <div className="form-floating mt-2">
                            <input type="text" className="form-control text-bg-light" id="contact" name="contact"
                                   value={localUserData.contact} disabled={editable} onChange={handleDataEntry}/>
                            <label htmlFor="contact">Contact</label>
                        </div>
                        <div>
                            <input type="file" className="form-control text-bg-light mt-2" id="imageUrl"
                                   name="imageUrl"
                                   onChange={handleDataEntry}/>
                            <label htmlFor="imageUrl">Update profile pic</label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfilePage;