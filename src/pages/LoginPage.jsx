import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';
import Axios from 'axios';

function LoginPage(){

    const[id, setID] = React.useState('');
    const[password, setPassword] = React.useState('');

    const onBtnLogin = () => {

        let body = {};
        body["id"] = id;
        body["password"] = password;

        if(id && password){
            Axios.post('http://localhost:1994/api/employee/get-profile', body)
            .then(res =>{
                if(res.data != null){
                    localStorage.setItem('id', res.data.employee_id);
                    localStorage.setItem('name', res.data.employee_name);
                    localStorage.setItem('role', res.data.role);
                    window.location = '/dashboard';
                }else{
                    alert('Data Tidak Ditemukan')
                }
                
            })
            .catch(err => console.log(err))
        }else{
            alert('Mohon Isi')
        }
    }

    return(
        <MDBContainer>
            <MDBRow className='justify-content-center mt-4 pt-4'>
                <MDBCol md="5">
                    <p className="h4 text-center mb-4">Sign in</p>
                    <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                        Your User ID
                    </label>
                    <input type="email" id="defaultFormLoginEmailEx" className="form-control" onChange={(e)=> setID(e.target.value)}/>
                    <br />
                    <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                        Your Password
                    </label>
                    <input type="password" id="defaultFormLoginPasswordEx" className="form-control"  onChange={(e)=> setPassword(e.target.value)}/>
                    <div className="text-center mt-4">
                        <MDBBtn color="indigo" type="submit" onClick={onBtnLogin}>Login</MDBBtn>
                    </div>
                </MDBCol>
            </MDBRow>
      </MDBContainer>
    )
}

export default LoginPage;