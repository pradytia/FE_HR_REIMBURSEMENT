import React from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn, MDBModal, MDBModalHeader, MDBModalBody, MDBModalFooter, MDBContainer } from 'mdbreact';
import Axios from 'axios';

function Table(){

    const [employeeID] = React.useState(localStorage.getItem('id'));
    const [employeeName] = React.useState(localStorage.getItem('name'));
    const[listReimbursement, setListReimbursement] = React.useState([]);
    const[modal, setModal] = React.useState(false);
    const[modalEdit, setModalEdit] = React.useState(false);
    const [inputCategory, setCategory] = React.useState('');
    const [inputAmount, setAmount] = React.useState('');
    const [inputAttachment, setAttachment] = React.useState('');
    const[editID, setEditID]= React.useState('');
    const [editCategory, setEditCategory] = React.useState('');
    const [editAmount, setEditAmount] = React.useState('');
    const [editAttachment, setEditAttachment] = React.useState('');

    React.useEffect(()=> {

        getListReimbursement();
        console.log(inputCategory);
    }, [])

    const clickEdit = (value) => {
        setModalEdit(true);
        setEditID(value.reimbursement_id);
        setEditCategory(value.category);
        setEditAmount(value.amount);
        setEditAttachment(value.attachment);
    }

    const getListReimbursement = () => {

        let data = {};
        data['id'] = employeeID;

        Axios.post('http://localhost:1994/api/reimbust/get-list', data)
        .then(res => {
            console.log(res.data);
            setListReimbursement(res.data);
        }).catch(err => console.log(err));
    };

    const renderListReimbursement = () => {

        return listReimbursement.map((value, index) => {

            return(
                    <tr key={index}>
                         <td>
                             <input type="button" value="edit" className="btn-primary" onClick={()=> clickEdit(value)}/>
                             <input type="button" value="delete" className="btn-danger" onClick={()=> onBtnDelete(value.reimbursement_id)}/>
                         </td>
                         <td>{value.reimbursement_id}</td>
                         <td>{value.employee_id}</td>
                         <td>{value.employee_name}</td>
                         <td>{value.created_date}</td>
                         <td>{value.category}</td>
                         <td>Rp. {new Intl.NumberFormat('id-ID').format(value.amount)}</td>
                         <td>
                             <img src={value.attachment} alt='' style={{ width: '100px' }}/>
                         </td>
                         <td>{value.status}</td>
                     </tr>
            )
        })
    };

    const onBtnAddNew = () => {

        let data = {};
        data["employee_id"] = employeeID;
        data["employee_name"] = employeeName;
        data["category"] = inputCategory;
        data["amount"] = inputAmount;
        data["attachment"] = inputAttachment;
        data["status"] = 'waiting';

        Axios.post('http://localhost:1994/api/reimbust/add', data)
        .then(res => {
            alert('Insert Berhasil')
            setModal(false);
            getListReimbursement();
        })
        .catch(err => console.log(err))
    }

    const onBtnDelete = (id) => {
        let data = {};
        data["id"] = id;
        if(window.confirm('Yakin Mau Hapus ?')){
            Axios.post('http://localhost:1994/api/reimbust/delete' , data)
            .then(res => {
                alert('Delete Berhasil')
                getListReimbursement();
            }).catch(err=>{
                console.log(err)
            })
        }
    }

    const onBtnSaveEdit = () => {

        let data = {};

        data["category"] = editCategory;
        data["amount"] = editAmount;
        data["attachment"] = editAttachment;

        Axios.put('http://localhost:1994/api/reimbust/edit/' + editID, data)
        .then(res => {
            setModalEdit(false);
            alert('Edit Berhasil');
            getListReimbursement();
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
        <div className="container mt-5">
            <h1 className="text-center">Reimbursement List</h1>
        <div className="row mt-5">
            <div className="col">
            <MDBBtn onClick={()=> setModal(true)} style={{float : 'right'}}>New</MDBBtn>
                {
                    listReimbursement.length > 0
                    ?
                    <MDBTable>
                        <MDBTableHead>
                        <tr>
                            <th>Action</th>
                            <th>Reimbust ID</th>
                            <th>Employee ID</th>
                            <th>Employee Name</th>
                            <th>Created Date</th>
                            <th>Category</th>
                            <th>Amount</th>
                            <th>Attachment</th>
                            <th>Status</th>
                        </tr>
                        </MDBTableHead>
                        <MDBTableBody>
                        {renderListReimbursement()}
                        </MDBTableBody>
                    </MDBTable>
                :
                <div className="alert alert-primary text-center mt-5" role="alert">
                    Anda Belum Memiliki Reimbursement
                </div>
                }
                
            </div>
        </div>
        </div>

        {/* modal */}

        <MDBContainer>
            <MDBModal isOpen={modal} toggle={()=> setModal(false)}>
                <MDBModalHeader toggle={()=> setModal(false)}>Add Reimbursement</MDBModalHeader>
                <MDBModalBody>
                    <div class="form-group">
                        <label>Employee ID</label>
                        <input type="text" className="form-control" placeholder={employeeID} disabled/>
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Employee Name</label>
                        <input type="text" class="form-control" placeholder={employeeName} disabled/>
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Category</label>
                        <select className="browser-default custom-select" onChange={(e) => setCategory(e.target.value)}>
                            <option>Choose your option</option>
                            <option value="Food">Food</option>
                            <option value="Office">Office</option>
                            <option value="transport">Transport</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label" >Jumlah</label>
                        <input type="number" class="form-control" onChange={(e) => setAmount(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Attachment</label>
                        <input type="text" class="form-control"  onChange={(e) => setAttachment(e.target.value)}/>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="primary" onClick={onBtnAddNew}>Submit</MDBBtn>
                <MDBBtn color="danger" onClick={()=> setModal(false)}>Cancel</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>

        {/* modal edit */}

        <MDBContainer>
            <MDBModal isOpen={modalEdit} toggle={()=> setModalEdit(false)}>
                <MDBModalHeader toggle={()=> setModalEdit(false)}>Edit Reimbursement</MDBModalHeader>
                <MDBModalBody>
                    <div class="form-group">
                        <label>Employee ID</label>
                        <input type="text" className="form-control" placeholder={employeeID} disabled/>
                    </div>
                    <div class="form-group">
                        <label>Employee Name</label>
                        <input type="text" className="form-control" placeholder={employeeName} disabled/>
                    </div>
                    <div class="form-group">
                        <label>Category</label>
                        <select className="browser-default custom-select" value={editCategory} onChange={(e)=> setEditCategory(e.target.value)}>
                            <option value="Food">Food</option>
                            <option value="Office">Office</option>
                            <option value="transport">Transport</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label >Jumlah</label>
                        <input type="number" className="form-control" value={editAmount} onChange={(e)=> setEditAmount(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Attachment</label>
                        <input type="text" className="form-control" value={editAttachment} onChange={(e)=> setEditAttachment(e.target.value)}/>
                    </div>
                </MDBModalBody>
                <MDBModalFooter>
                <MDBBtn color="primary" onClick={onBtnSaveEdit}>Save</MDBBtn>
                <MDBBtn color="danger" onClick={()=> setModalEdit(false)}>Cancel</MDBBtn>
                </MDBModalFooter>
            </MDBModal>
        </MDBContainer>

        </div>
    )

}

export default Table;