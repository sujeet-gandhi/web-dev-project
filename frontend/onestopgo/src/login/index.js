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

export const LoginForm = () => {

    const [activeTab, setActiveTab] = useState('login');

    const handleClick = (value) => {
        if (value === activeTab) {
            return;
        }

        setActiveTab(value);
    };

    return (
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

                    <div className="text-center mb-3">
                        <p>Sign in</p>
                    </div>
                    <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email'/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password'/>

                    <div className="d-flex justify-content-between mx-4 mb-4">
                        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me'/>
                        <a href="!#">Forgot password?</a>
                    </div>

                    <MDBBtn className="mb-4 w-100" style={{backgroundColor: "teal"}}>Sign in</MDBBtn>
                    <p className="text-center">Not a member? <a href="#" onClick={() => handleClick('register')}>Register</a></p>

                </MDBTabsPane>

                <MDBTabsPane show={activeTab === 'register'}>

                    <div className="text-center mb-3">
                        <p>Sign up</p>
                    </div>

                    <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
                    <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text'/>
                    <MDBInput wrapperClass='mb-4' label='Email' id='form1' type='email'/>
                    <MDBInput wrapperClass='mb-4' label='Password' id='form1' type='password'/>

                    <div className='d-flex justify-content-center mb-4'>
                        <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms'/>
                    </div>

                    <MDBBtn className="mb-4 w-100" style={{backgroundColor: "teal"}}>Sign up</MDBBtn>

                </MDBTabsPane>

            </MDBTabsContent>

        </MDBContainer>
    );
}
