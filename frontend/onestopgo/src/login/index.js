import React, {useState} from 'react';
import {
    MDBBtn,
    MDBCheckbox,
    MDBCol,
    MDBContainer,
    MDBInput,
    MDBRow,
    MDBTabs,
    MDBTabsContent,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsPane
} from 'mdb-react-ui-kit';
import {useDispatch} from "react-redux";
import {loginThunk, registerThunk} from "./login-thunk";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export const LoginForm = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerAddress, setRegisterAddress] = useState('');
    const [registerContact, setRegisterContact] = useState('');
    const [userImage, setImage] = useState({});
    const dispatch= useDispatch();
    const navigate = useNavigate();

    const handleClick = (value) => {
        if (value === activeTab) {
            return;
        }

        setActiveTab(value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        const loginDetails = {
            email : email,
            password : password};

        dispatch(loginThunk(loginDetails));
        navigate("/");
    };

    const handleRegistration = event => {
      const userDetails = {
          email: registerEmail,
          password:registerPassword,
          address:registerAddress,
          contact:registerContact,
          image: userImage
      }

        dispatch(registerThunk(userDetails));
    };

    const handleBackClicked = () => {
        navigate('/');
    }


    return (
        <>
            <img src="/images/one.png" className="w-100 h-100 position-fixed center"/>
            <div className={'container card w-50'}>
                <a href={''} className={'position-fixed'}>
                    <FontAwesomeIcon onClick={handleBackClicked} className={'wd-login-back-arrow'} icon={faArrowLeft}/>
                </a>
                <MDBContainer className="p-3 my-5 w-50">
                    <MDBRow>
                        <MDBCol col='6' className={'md-5'}>
                            <div className={"text-center"}>
                                <img src="../images/OneStopGo.PNG" className='img-fluid shadow-4' style={{width: '300px'}}
                                     alt='...'/>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('login')} active={activeTab === 'login'}
                                         style={{backgroundColor: activeTab === 'login' ? "teal" : ""}}>
                                Login
                            </MDBTabsLink>
                        </MDBTabsItem>
                        <MDBTabsItem>
                            <MDBTabsLink onClick={() => handleClick('register')} active={activeTab === 'register'}
                                         style={{backgroundColor: activeTab === 'register' ? "teal" : ""}}>
                                Register
                            </MDBTabsLink>
                        </MDBTabsItem>
                    </MDBTabs>

                    <MDBTabsContent>

                        <MDBTabsPane show={activeTab === 'login'}>
                            <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' onChange={event => setEmail(event.target.value)}
                                      value={email}/>
                            <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' onChange={event => setPassword(event.target.value)}
                                      value={password}/>

                            <div className="d-flex justify-content-between mx-4 mb-4">
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                                <a href="!#">Forgot password?</a>
                            </div>

                            <MDBBtn onClick={handleSubmit} className="mb-4 w-100" style={{backgroundColor: "teal"}}>Sign in</MDBBtn>
                            <p className="text-center">Not a member? <a href="src/login/index.js">Register</a></p>

                        </MDBTabsPane>

                        <MDBTabsPane show={activeTab === 'register'}>

                            <MDBInput wrapperClass='mb-4' label='Email' type='email' onChange={event => setRegisterEmail(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Password'  type='password' onChange={event => setRegisterPassword(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Address' type='text' onChange={event => setRegisterAddress(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Contact' type='tel' onChange={event => setRegisterContact(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Image' type='file' onChange={event => setImage(event.target.files[0])}/>

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms'/>
                            </div>

                            <MDBBtn onClick={handleRegistration} className="mb-4 w-100" style={{backgroundColor: "teal"}}>Sign up</MDBBtn>

                        </MDBTabsPane>

                    </MDBTabsContent>

                </MDBContainer>
            </div>
        </>
    );
}
