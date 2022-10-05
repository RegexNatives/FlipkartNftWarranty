import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router';
import { getAllUserAction } from '../actions/auth.actions';

const Users = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    const {users,user} = useSelector(state=>state.user);


    const navigateToAssign = (name,walletAddress) => {
        navigate('/assign',{state:{name,walletAddress}});
    }

    useEffect(()=>{
        let mounted = true;
        const fetchUsers = async () => {
            if(mounted){
                dispatch(getAllUserAction(user?.type == "superAdmin"?"admin":"vendor"));
            }
        }
        fetchUsers();
        return () => mounted = false;
    },[])
    // console.log(users);
  return (
    <>
        <div className="admin-page">
            <div className="admin-page-container">
                <h1>{user?.type == "superAdmin" ? 'Admins' : 'Vendors'}</h1>
                <div className="users-table">
                    <table>
                        <thead>
                            <th>S No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Wallet</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            {users?.map((user,index)=>(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{user?.name}</td>
                                    <td>{user?.email}</td>
                                    <td>{user?.phone}</td>
                                    <td>{user?.walletAddress}</td>
                                    <td>
                                        <div className="mynft-logout-btn" onClick={()=>navigateToAssign(user?.name,user?.walletAddress)}>
                                            <button className="primary" >Assign</button>
                                        </div>
                                        
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </>
  )
}

export default Users