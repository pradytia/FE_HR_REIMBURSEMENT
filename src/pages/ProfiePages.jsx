
import React from 'react';


function ProfilePages(){

    
    const [id] = React.useState(localStorage.getItem('id'));
    const [name] = React.useState(localStorage.getItem('name'));

    const onClickBack = () => {
        window.location = '/dashboard';
    }


    return(
        <div className="container mt-5">
                <div className="card">
            <div className="row mt-5">
                <div className="col-sm-3">
                    
                    <img 
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" 
                    style={{width : '200px'}}/>
                    
                </div>
                <div className="col-sm-6">
                   
                    <h1>Employee ID :  {id}</h1>
                    <h1>Employee Name : {name}</h1>
               
                </div>
                </div>
            </div>
            
            <div className="row justify-content-center mt-5">
                <input type="button" value="Back To Home" onClick={onClickBack}/>
            </div>
        </div>
    )
}

export default ProfilePages;