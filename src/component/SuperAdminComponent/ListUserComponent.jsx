import React, { useEffect, useState } from 'react';
import avatar from '../../Assets/img/avatar.jpg';
import '../../style/SuperAdminDashboard/Organisercomponent.css';
import DataTable from 'react-data-table-component';
// import { OrganiserColumn, OrganiserData, OrganiserPendingColumn, PendingData } from '../../Constant/SuperAdminDashboard/OrganiserData';
// import AddOrganiser from './OrganiserComponent/AddOrganiser';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import Nav from 'react-bootstrap/Nav';
// import { IoMdArrowBack } from 'react-icons/io';
// import ApproveAsOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/ApproveAsOrganiser.jsx';
// import RejectOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/RejectOrganiser.jsx';
import {
  nonRefferalUSerColounm,
  allusercoloumn,
  nonpurchsedUserColoumn,
  purchasedUserColoumn
} from '../../Constant/SuperAdminDashboard/ListAllUserDetails.jsx';

function ListUserComponent() {
  const [userprofile, SetUserProfile] = useState([]);
  const [ActiveKey, setActiveKey] = useState('All Users');
  const [allRegistredData, setallRegistredData] = useState([]);
  const [nonRefferedUsers, setnonRefferedUsers] = useState([]);
  const [nonpurchasedUsers, setnonpurchasedUsers] = useState([]);
  const [purchasedUsers, setpurchasedUsers] = useState([]);

  const token = localStorage.getItem('admintoken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('userapp/admin/dash/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        SetUserProfile(response.data);
        if (ActiveKey === 'Purchased Users') {
          const purchasedUserResponse = await axiosInstance.get('product/payed/users', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('all purchasedUserResponse data', purchasedUserResponse.data);
          setpurchasedUsers(purchasedUserResponse.data);
        } else if (ActiveKey === 'All Users') {
          const allUserResponse = await axiosInstance.get('userapp/all/registred/users/in/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('allUserResponse', allUserResponse.data);
          setallRegistredData(allUserResponse.data);
        } else if (ActiveKey === 'Till to Reffer') {
          const nonRefferedUserResponse = await axiosInstance.get('userapp/all/non/reffered/users/in/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('nonRefferedUserResponse', nonRefferedUserResponse.data);
          setnonRefferedUsers(nonRefferedUserResponse.data);
        } else if (ActiveKey === 'Til To Purchase') {
          const nonPurchasedUSerResponse = await axiosInstance.get('userapp/non/product/purchased/users/in/admin', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          console.log('nonPurchasedUSerResponse', nonPurchasedUSerResponse.data);
          setnonpurchasedUsers(nonPurchasedUSerResponse.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [ActiveKey, token]);

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
        <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofile?.name}</span> Welcome to your admin dashboard</p>
      </div>
      <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }}/>
      <hr />
      <div style={{ marginBottom: '10px' }}>
        <Nav variant="tabs" defaultActiveKey="Organisers" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="All Users">All Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Purchased Users">Purchased Users</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Till to Reffer">No Affiliate Members Under</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Til To Purchase">Non Members</Nav.Link>
          </Nav.Item>
        </Nav>
        {ActiveKey === 'All Users' && (
          <DataTable
            columns={allusercoloumn}
            data={allRegistredData}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',
                  background: '#ffffff',
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff',
                },
              },
            }}
          />
        )}
        {ActiveKey === 'Purchased Users' && (
          <DataTable
            columns={purchasedUserColoumn}
            data={purchasedUsers}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',
                  background: '#ffffff',
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff',
                },
              },
            }}
          />
        )}
        {ActiveKey === 'Till to Reffer' && (
          <DataTable
            columns={nonRefferalUSerColounm}
            data={nonRefferedUsers}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',
                  background: '#ffffff',
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff',
                },
              },
            }}
          />
        )}
        {ActiveKey === 'Til To Purchase' && (
          <DataTable
            columns={nonpurchsedUserColoumn}
            data={nonpurchasedUsers}
            fixedHeader
            pagination
            customStyles={{
              table: {
                style: {
                  border: '1px solid #ccc',
                  background: '#ffffff',
                },
              },
              rows: {
                style: {
                  backgroundColor: '#f9f9f9',
                },
              },
              header: {
                style: {
                  background: '#333',
                  color: '#fff',
                },
              },
            }}
          />
        )}
      </div>
    </>
  );
}

export default ListUserComponent;







// // import React,{useEffect,useState} from 'react'
// // import '../../../style/SuperAdminDashboard/Influencercomponent.css'
// // import avatar from '../../../Assets/img/avatar.jpg'
// // import AddInfluencer from './AddInfluencer'
// // import DataTable from 'react-data-table-component'
// // import {InfluencerColumn,InfluencerData} from '../../../Constant/SuperAdminDashboard/InfluencerData'
// // import axiosInstance from '../../../config/axios/AxiosConfiguration'

// import React, { useEffect, useState } from 'react'
// import avatar from '../../Assets/img/avatar.jpg'
// import '../../style/SuperAdminDashboard/Organisercomponent.css'
// import DataTable from 'react-data-table-component'
// import { OrganiserColumn, OrganiserData,OrganiserPendingColumn,PendingData } from '../../Constant/SuperAdminDashboard/OrganiserData'
// import AddOrganiser from './OrganiserComponent/AddOrganiser';
// import axiosInstance from '../../config/axios/AxiosConfiguration'
// import Nav from 'react-bootstrap/Nav';
// import { IoMdArrowBack } from "react-icons/io";
// import ApproveAsOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/ApproveAsOrganiser.jsx';
// import RejectOrganiser from '../../component/SuperAdminComponent/ApproveRejectOrganiser/RejectOrganiser.jsx'
// import { nonRefferalUSerColounm, allusercoloumn, nonpurchsedUserColoumn, purchasedUserColoumn } from '../../Constant/SuperAdminDashboard/ListAllUserDetails.jsx'
// function ListUserComponent() {
 
//   const [userprofile, SetUserProfile] = useState([])
//   const [ActiveKey, setActiveKey] = useState('All users')
//   const [allRegistredData,setallRegistredData]=useState([])
//   const [nonRefferedUsers,setnonRefferedUsers]=useState([])
//   const [nonpurchasedUsers,setnonpurchasedUsers]=useState([])
//   const [purchasedUsers,setpurchasedUsers]=useState([])


//   const token = localStorage.getItem('admintoken')
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('userapp/admin/dash/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         SetUserProfile(response.data);
//         if(ActiveKey==='Purchased Users'){
//           const purchasedUserResponse= await axiosInstance.get('product/payed/users',{
//             headers:{
//               'Authorization':`Bearer ${token}`
//             }
//           })
//           console.log('all purchasedUserResponse data',purchasedUserResponse.data);
//           setpurchasedUsers(purchasedUserResponse.data)

//         }else if (ActiveKey === 'All Users'){
//           const allUserResponse= await axiosInstance.get('userapp/all/registred/users/in/admin',{
//             headers:{
//               'Authorization': `Bearer ${token}`
//             }
//           })
//           console.log('allUserResponse',allUserResponse.data);
//           setallRegistredData(allUserResponse.data)
//         }
//         else if (ActiveKey === 'Till to Reffer'){
//           const nonRefferedUserResponse= await axiosInstance.get('userapp/all/non/reffered/users/in/admin',{
//             headers:{
//               'Authorization': `Bearer ${token}`
//             }
//           })
//           console.log('nonRefferedUserResponse',nonRefferedUserResponse.data);
//           setnonRefferedUsers(nonRefferedUserResponse.data)
//         }
//         else if (ActiveKey === 'Til To Purchase'){
//           const nonPurchasedUSerResponse= await axiosInstance.get('userapp/non/product/purchased/users/in/admin',{
//             headers:{
//               'Authorization': `Bearer ${token}`
//             }
//           })
//           console.log('nonPurchasedUSerResponse',nonPurchasedUSerResponse.data);
//           setnonpurchasedUsers(nonPurchasedUSerResponse.data)
//         }

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [ActiveKey,token]);
  
//   // const columnWithButton = [
//   //   ...OrganiserColumn,
//   //   {
      
//   //     name: 'View Influencer',
//   //     cell: (row) => (
//   //       <button className='btn-primary' onClick={handleNavigateToInfluencer}>Influencer</button>

//   //     ),
//   //     sortable: false,

    
//   // }
//   // ]

//   // const handleNavigateToInfluencer=()=>{
//   //   setIsinfluencer(true)
//   // }

//   // const handleNavigateToOrganiser=()=>{
//   //   setIsinfluencer(false)
//   // }

//   // const columnWithApproveButton=[
//   //   ...OrganiserPendingColumn,
//   //   {
      
//   //       name: 'Approve',
//   //       cell: (row) => (
         
//   //         <ApproveAsOrganiser orgid={row.id} setPendingrequest={setPendingrequest}/>
  
//   //       ),
//   //       sortable: false,
  
      
//   //   },
//   //   {
      
//   //     name: 'Reject',
//   //     cell: (row) => (
        
//   //       <RejectOrganiser orgid={row.id} setPendingrequest={setPendingrequest}/>

//   //     ),
//   //     sortable: false,

    
//   // }
//   // ]

//   return (
//     <>
//     <div style={{ display: 'flex', alignItems: 'center' }}>
//       <img src={avatar} style={{ width: '50px', height: '50px', borderRadius: '50%' }} alt="" />
//       <p>Hi <span style={{ color: 'black', fontWeight: '700' }}>{userprofile?.name}</span> Welcome to your admin dashboard</p>
//     </div>
//     <hr style={{ width: '100%', backgroundColor: 'black', boder: '1px' }} />
    
//     <hr />
//     {
//       // isinfluencer ?(
//        <>
//        {/* <button onClick={ handleNavigateToOrganiser} style={{marginBottom:'10px',border:'none'}}><span><IoMdArrowBack/></span>Back</button> */}
//        {/* <DataTable
//           columns={allusercoloumn}
//           data={allRegistredData}
//           fixedHeader
//           pagination
//           customStyles={{
//             table: {
//               style: {
//                 border: '1px solid #ccc',  
                      
//                 background: '#ffffff',    
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: '#f9f9f9',
//               },
//             },
//             header: {
//               style: {
//                 background: '#333',         
//                 color: '#fff',              
//               },
//             },
//           }}
//         />  */}
//        </>
        
//       // ):(
//       //   <>
//       //   <div >
//       // <div className='superadmin-dashboard-add-organiser-container'>
//       //   <h5>ORGANISER</h5>
        
//         {/* <AddOrganiser /> */}
//       </div>

//     </div>
//     <div style={{marginBottom:'10px'}}>
//       <Nav variant="tabs" defaultActiveKey="Organisers" onSelect={(selectedKey) => setActiveKey(selectedKey)}>
//         <Nav.Item>
//           <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="All Users">All Users</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Purchased Users">Purchased Users</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Till to Reffer">Till to Reffer</Nav.Link>
//         </Nav.Item>
//         <Nav.Item>
//           <Nav.Link className='super-admin-dashboard-nav-item-header' eventKey="Til To Purchase">Til To Purchase</Nav.Link>
//         </Nav.Item>

//       </Nav>
//       {
//         ActiveKey   === 'All Users' &&(
//             <DataTable
//             columns={allusercoloumn}
//           data={allRegistredData}
          
//           fixedHeader
//           pagination
//           customStyles={{
//             table: {
//               style: {
//                 border: '1px solid #ccc',
//                 background: '#ffffff',    
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: '#f9f9f9',
//               },
//             },
//             header: {
//               style: {
//                 background: '#333',         
//                 color: '#fff',              
//               },
//             },
//           }}
//         /> 

//         )
//       }
//       {
//            ActiveKey === 'Purchased Users'&&(
//             <DataTable
//             columns={purchasedUserColoumn}
//           data={purchasedUsers}
          
          
//           fixedHeader
//           pagination
//           customStyles={{
//             table: {
//               style: {
//                 border: '1px solid #ccc',  
                       
//                 background: '#ffffff',      
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: '#f9f9f9',  
//               },
//             },
//             header: {
//               style: {
//                 background: '#333',        
//                 color: '#fff',              
//               },
//             },
//           }}
//         /> 

//            )
//       }
//        {
//            ActiveKey === 'Till to Reffer'&&(
//             <DataTable
            
//           columns={nonRefferalUSerColounm}
//           data={nonRefferedUsers}
//           fixedHeader
//           pagination
//           customStyles={{
//             table: {
//               style: {
//                 border: '1px solid #ccc',  
                       
//                 background: '#ffffff',      
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: '#f9f9f9',  
//               },
//             },
//             header: {
//               style: {
//                 background: '#333',        
//                 color: '#fff',              
//               },
//             },
//           }}
//         /> 

//            )
//       }
//        {
//            ActiveKey === 'Til To Purchase'&&(
//             <DataTable
//             columns={nonpurchsedUserColoumn}
//             data={nonpurchasedUsers}
//           fixedHeader
//           pagination
//           customStyles={{
//             table: {
//               style: {
//                 border: '1px solid #ccc',  
                       
//                 background: '#ffffff',      
//               },
//             },
//             rows: {
//               style: {
//                 backgroundColor: '#f9f9f9',  
//               },
//             },
//             header: {
//               style: {
//                 background: '#333',        
//                 color: '#fff',              
//               },
//             },
//           }}
//         /> 

//            )
//       }

     
//     </div>

//         </>
//       )
//     }

    

//   </>
// )
// }

// export default ListUserComponent

