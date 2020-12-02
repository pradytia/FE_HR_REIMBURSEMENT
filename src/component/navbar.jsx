import React from 'react';
import {
    MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline, MDBIcon,
    MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
    } from "mdbreact";

function NavbarComp(){

    const [id, setID] = React.useState('');
    const [name, setName] = React.useState('');

    React.useEffect(()=>{

        var id = localStorage.getItem('id');
        var name = localStorage.getItem('name');
        setID(id);
        setName(name);
    });

    const onClickLogOut = () =>{
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        window.location = '/';
    }

    return(
        <MDBNavbar color="indigo" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text">HR REIMBURSEMENT</strong>
        </MDBNavbarBrand>
        {
            id ? (
                <MDBNavbarNav right>
                    <MDBNavItem>
                        <MDBDropdown>
                            <MDBDropdownToggle nav caret>
                            <MDBIcon icon="user" />
                            </MDBDropdownToggle>
                            <MDBDropdownMenu className="dropdown-default" right>
                            <MDBDropdownItem>
                            <MDBIcon icon="user-circle"/> &nbsp; 
                                <span style={{fontStyle:'italic'}}>{name}</span>
                            </MDBDropdownItem>
                            <MDBDropdownItem href="/profile">Profile</MDBDropdownItem>
                            <MDBDropdownItem href="#!" onClick={onClickLogOut}>Logout</MDBDropdownItem>
                            </MDBDropdownMenu>
                        </MDBDropdown>
                    </MDBNavItem>
                </MDBNavbarNav>
            ) : null
        }
        
      </MDBNavbar>
    )
}

export default NavbarComp;