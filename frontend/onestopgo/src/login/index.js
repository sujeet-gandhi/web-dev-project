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
import {useDispatch, useSelector} from "react-redux";
import {loginThunk, registerThunk} from "./login-thunk";
import {useNavigate} from "react-router";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft} from "@fortawesome/free-solid-svg-icons";

export const LoginForm = () => {
    const [activeTab, setActiveTab] = useState('login');
    const [regName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerAddress, setRegisterAddress] = useState('');
    const [registerContact, setRegisterContact] = useState('');
    const [userImage, setImage] = useState({});
    const [signInPressed, setSignInPressed] = useState(false);
    const {loggedIn, loggedInUser} = useSelector(state => state.login)
    const dispatch= useDispatch();
    const navigate = useNavigate();

    const handleClick = (value) => {
        if (value === activeTab) {
            return;
        }

        setActiveTab(value);
    };

    const handleSubmit = event => {
        setSignInPressed(true);
        event.preventDefault();
        const loginDetails = {
            email : email,
            password : password};

        dispatch(loginThunk(loginDetails))
    };

    const handleEnterKeyPressed = event => {
        if (event.key === 'Enter' || event.code ==='Enter') {
           handleSubmit(event)
        }
    };


    const handleRegistration = event => {
      const userDetails = {
          name: regName,
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
                            <MDBInput placeholder={'john.doe@onestopgo.com'}
                                      wrapperClass='mb-4' label='Email address' id='form1' type='email'
                                      onChange={event => setEmail(event.target.value)}
                                      onKeyDown={event => handleEnterKeyPressed(event)}
                                      value={email}/>
                            <MDBInput placeholder={'Your Super Secret Password'}
                                      wrapperClass='mb-4' label='Password' id='form2' type='password'
                                      onChange={event => setPassword(event.target.value)}
                                      onKeyDown={event => handleEnterKeyPressed(event)}
                                      value={password}/>
                            {!loggedIn && signInPressed && <p className="text-center" style={{color: "red"}}>Bad Credentials, Try again</p>}
                            <MDBBtn onClick={handleSubmit} className="mb-4 w-100" style={{backgroundColor: "teal"}}>Sign in</MDBBtn>


                        </MDBTabsPane>

                        <MDBTabsPane show={activeTab === 'register'}>

                            <MDBInput wrapperClass='mb-4' placeholder={'John Doe'} label='Name' type='text' onChange={event => setName(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' placeholder={'john.doe@onestopgo.com'} label='Email' type='email' onChange={event => setRegisterEmail(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' placeholder={'Your Super Secret Password'} label='Password'  type='password' onChange={event => setRegisterPassword(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' placeholder={'A Place You Call Home'} label='Address' type='text' onChange={event => setRegisterAddress(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' placeholder={'XXX-XXX-XXXX'} label='Contact' type='tel' onChange={event => setRegisterContact(event.target.value)}/>
                            <MDBInput wrapperClass='mb-4' label='Image' type='file' onChange={event => setImage(event.target.files[0])}/>


                            <MDBBtn onClick={handleRegistration} className="mb-4 w-100" style={{backgroundColor: "teal"}}>Sign up</MDBBtn>

                        </MDBTabsPane>

                    </MDBTabsContent>

                </MDBContainer>
            </div>
        </>
    );
}
