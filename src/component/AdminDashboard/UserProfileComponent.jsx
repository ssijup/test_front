// import React, { useState, useEffect } from 'react';
// import '../../style/adminDashboard/userprofile.css'
// import AddBankAccountComponent from '../../component/AdminDashboard/AddBankAccountComponent.jsx';
// import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
// import ladyimage from '../../Assets/img/avatar.jpg';
// import { useNavigate } from 'react-router-dom';
// import Select from 'react-select';
// import { useFormik } from 'formik';
// import Swal from 'sweetalert2';
// import { Container, ListGroup, Row, Col, Button, Image, Card, Form } from 'react-bootstrap';
// // import ReactApexChart from 'react-apexcharts';
// // import 'chart.js/auto';
// import EditProfile from './EditProfile.jsx';



// function UserProfileComponent({ setIsProfileVisible }) {
//   const navigate = useNavigate()
//   const handleBackButton = () => {
//     setIsProfileVisible(false);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('usertoken')
//     navigate('/user/login')
//   }

//   const [bankAccounts, setBankAccounts] = useState([])
//   const [selectedBankAccount, setSelectedBankAccount] = useState(null);
//   const [primaryBankAccount, setPrimaryBankAccount] = useState(null)

//   const handleBankAccountChange = (selectedOption) => {
//     setSelectedBankAccount(selectedOption);
//   };

//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [image, setImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState('');

//   const [profiledata, setProfiledata] = useState([])
//   const token = localStorage.getItem('usertoken')
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu', response.data)
//         setProfiledata(response.data);
//         // formik.setFieldValue('name', response.data?.user?.name || '')
//         // formik.setFieldValue('email', response.data?.user?.email || '')
//         // formik.setFieldValue('phone', response.data?.phone || '')
//         const bankresponse = await axiosInstance.get('userapp/user/get/all/bank/account', {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         console.log('bank details', bankresponse.data);
//         setBankAccounts(bankresponse.data);
//         const primaryAccount = bankresponse.data.find(account => account.current_primary_account === true);
//         if (primaryAccount) {
//           setPrimaryBankAccount(primaryAccount);
//         }

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [token])

//   useEffect(() => {
//     if (profiledata.user) {
//       formik.setFieldValue('name', profiledata.user.name || '');
//       formik.setFieldValue('email', profiledata.user.email || '');
//       formik.setFieldValue('phone', profiledata.phone || '');
//     }
//   }, [profiledata]);

//   const handleImageChange = (e) => {
//     const selectedImage = e.target.files[0];

//     if (selectedImage) {
//       setImage(selectedImage);
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(selectedImage);
//     } else {
//       setImage(null);
//       setImagePreview('');
//     }
//   };



//   const handlemodal = () => {
//     Swal.fire({
//       title: "Do you want to save the changes?",
//       showDenyButton: true,
//       showCancelButton: true,
//       confirmButtonText: "Save",
//       denyButtonText: "Don't save"
//     }).then((result) => {

//       if (result.isConfirmed) {
//         Swal.fire("Saved!", "", "success");
//         formik.handleSubmit()
//       } else if (result.isDenied) {
//         Swal.fire("Changes are not saved", "", "info");
//       }
//     });
//   }

//   const formik = useFormik({
//     initialValues: {
//       name: '',
//       phone: '',
//       email: '',
//       address_line_1: ''
//     },
//     onSubmit: async (values) => {
//       try {

//         const primaryresponse = await axiosInstance.patch(`userapp/user/set/bank/account/primary/${selectedBankAccount?.id}`, {}, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
//         console.log('primaryresponse', primaryresponse);

//         const response = await axiosInstance.patch('userapp/edit/user/profile', values, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         })
//         console.log('user response', response.data);

//       } catch (error) {
//         console.log('error');
//       }
//     }
//   })

//   const hasProfileImage = true;

//   console.log('formik', formik.values);

//   const [selectedAccount, setSelectedAccount] = useState(null);

//   const bank = [
//     { id: 1, accountNumber: '123456789', isPrimary: true },
//     { id: 2, accountNumber: '987654321', isPrimary: false },
//     // Add more bank accounts as needed
//   ];

//   const handleRadioChange = (accountId) => {
//     setSelectedAccount(accountId);
//   };



//   const profileCompletionPercentage = calculateProfileCompletion();
//   const chartOptions = {
//     chart: {
//       type: 'radialBar',
//       height: 80,
//       width: 80,
//     },
//     plotOptions: {
//       radialBar: {
//         hollow: {
//           size: '70%', // Adjust the size of the circular chart
//         },
//         dataLabels: {
//           show: true,
//           name: {
//             show: false,
//           },
//           value: {
//             offsetY: 10,
//           },
//         },
//       },
//     },
//     labels: ['Profile Completion'],
//   };

//   const chartSeries = [profileCompletionPercentage];

//   function calculateProfileCompletion() {
//     // Example: Assuming you have some data to calculate completion percentage
//     const completedFields = 3; // replace with the actual count of completed fields
//     const totalFields = 5; // replace with the total number of fields

//     return (completedFields / totalFields) * 100;
//   }


//   return (

//     // <Container className="mt-4" style={{ width: '100%', maxWidth: '850px' }}>
//     //   <Row>
//     //     <Col md={12}>

//     //       <Card>
//     //         <Card.Body>
//     //           <Card.Title className="mb-4">
//     //             <Row>
//     //               <Col md={6}>
//     //                 Profile Information
//     //               </Col>
//     //               {/* <Col md={6} className="d-flex justify-content-center">
//     //                 <ReactApexChart
//     //                   options={chartOptions}
//     //                   series={chartSeries}
//     //                   type="radialBar"
//     //                   height={150}
//     //                   width={150}
//     //                 />
//     //               </Col> */}
//     //             </Row>
//     //           </Card.Title>
//     //           <Row className="align-items-center">
//     //             <Col md={4} className="text-center">
//     //               <Image src={ladyimage} alt="Profile Image" rounded fluid style={{ maxHeight: '200px', borderRadius: '50%' }} />
//     //             </Col>

//     //             <Col md={8}>
//     //               <div className="mb-3">
//     //                 <strong>Name:</strong> {profiledata?.user?.name}
//     //               </div>
//     //               <div className="mb-3">
//     //                 <strong>Email:</strong> {profiledata?.user?.email}
//     //               </div>

//     //               <div className="mb-3">
//     //                 <strong>Phone:</strong> {profiledata?.phone}
//     //               </div>
//     //             </Col>
//     //           </Row>

//     //           {/* New: Adding the Doughnut Chart */}


//     //           <div className="d-flex justify-content-between mt-5">
//     //             {/* <Button variant="primary" style={{ backgroundColor: '#081d29' }} className="mb-3">
//     //               Edit Profile
//     //             </Button> */}
//     //             {
//     //               <EditProfile/>
//     //             }
//     //             <Button variant="danger" onClick={handleBackButton} className="mb-3">
//     //               Back
//     //             </Button>
//     //           </div>
//     //         </Card.Body>
//     //       </Card>


//     //       <Card className="mt-4">
//     //         <Card.Body>
//     //           <Card.Title className="mb-4">Details</Card.Title>
//     //           <Row>
//     //           <Col md={6}>
//     //               <strong>State:</strong> {profiledata.state}
//     //             </Col>
//     //             <Col md={6}>
//     //               <strong>District:</strong> {profiledata?.district}
//     //             </Col>
//     //             <Col md={6}>
//     //               <strong>Local Body :</strong> District Name
//     //             </Col>
//     //             <Col md={6}>
//     //               <strong>Village:</strong>Village Name
//     //             </Col>
//     //             <Col md={6}>
//     //               <strong>Sub-District:</strong> Sub-District Name
//     //             </Col>
//     //             <Col md={12}>
//     //               <strong>Landmark:</strong> Landmark
//     //             </Col>
//     //             <Col md={12}>
//     //               <strong>Permanent Address:</strong> Permanent Address
//     //             </Col>
//     //             <Col md={12}>
//     //               <strong>Residential Address:</strong> Residential Address
//     //             </Col>
//     //           </Row>
//     //         </Card.Body>
//     //       </Card>
//     //     </Col>

//     //     <Col md={8} lg={3}>

//     //       <Card className="mt-3 mt-md-0">
//     //         <Card.Body>
//     //           <Card.Title className="mb-4">Bank Account</Card.Title>
//     //           <Form>
//     //             <ListGroup>
//     //               {bank.map((account) => (
//     //                 <ListGroup.Item key={account.id}>
//     //                   <Form.Check
//     //                     type="radio"
//     //                     id={radio-${account.id}}
//     //                     name="bankAccountRadio"
//     //                     label={Ac/No: ${account.accountNumber}}
//     //                     checked={selectedAccount === account.id}
//     //                     onChange={() => handleRadioChange(account.id)}
//     //                   />
//     //                   {account.isPrimary && <span className="ms-2">(Primary)</span>}
//     //                 </ListGroup.Item>
//     //               ))}
//     //             </ListGroup>
//     //           </Form>
//     //         </Card.Body>
//     //       </Card>
//     //     </Col>
//     //   </Row>
//     // </Container>
//     <Container className="mt-4" fluid style={{width:'100%',maxWidth:'1100px'}}>
//     <Row>
//       <Col md={8}>
//         <Card className="mb-4">
//           <Card.Body>
//             <Card.Title className="mb-4">Profile Information</Card.Title>
//             <Row className="align-items-center">
//               <Col md={4} className="text-center">
//                 <Image src={ladyimage} alt="Profile Image" rounded fluid style={{ maxHeight: '200px', borderRadius: '50%' }} />
//               </Col>
//               <Col md={8}>
//                 <div className="mb-3">
//                   <strong>Name:</strong> {profiledata?.user?.name}
//                 </div>
               
//                 <div className="mb-3">
//                   <strong>Phone:</strong> {profiledata?.phone?  profiledata?.phone : "Not Given"}
//                 </div>
//                 <div className="mb-3">
//                   <strong>Email:</strong> {profiledata?.user?.email ? profiledata?.user?.email : "Not Given" }
//                 </div>
//               </Col>
//             </Row>

//             {/* New: Adding the Doughnut Chart */}
//             {/* ... (Chart section remains unchanged) */}

//             <div className="d-flex justify-content-between mt-5">
//               <EditProfile />
//               <Button variant="danger" onClick={handleBackButton} className="mb-3">
//                 Back
//               </Button>
//             </div>
//           </Card.Body>
//         </Card>

//         <Card className="mt-4">
//           <Card.Body>
//             <Card.Title className="mb-4">Other Details</Card.Title>
//             <Row>
           
//           <Col md={6}>
//                    <strong>State:</strong> {profiledata.state}
//                  </Col>
//                  <Col md={6}>
//                    <strong>District:</strong> {profiledata?.district}
//                  </Col>
//                  <Col md={6}>
//                    <strong>Local Body :</strong> District Name
//                  </Col>
//                  <Col md={6}>
//                    <strong>Village:</strong>Village Name
//                  </Col>
//                  <Col md={6}>
//                    <strong>Sub-District:</strong> Sub-District Name
//                  </Col>
//                <Col md={12}>
//                    <strong>Landmark:</strong> Landmark
//                  </Col>
//                  <Col md={12}>
//                    <strong>Permanent Address:</strong> Permanent Address
//                  </Col>
//                  <Col md={12}>
//                    <strong>Residential Address:</strong> Residential Address
//                  </Col>
//             </Row>
//           </Card.Body>
//         </Card>
//       </Col>

//       <Col md={4}>
//         {/* <Card className="mt-3 mt-md-0">
//           <Card.Body>
//             <Card.Title className="mb-4">Bank Account</Card.Title>
//             <Form>
//               <ListGroup>
//                 {bank.map((account) => (
//                   <ListGroup.Item key={account.id}>
//                     <Form.Check
//                       type="radio"
//                       id={`radio-${account.id}`}
//                       name="bankAccountRadio"
//                       label={`Ac/No: ${account.accountNumber}`}
//                       checked={selectedAccount === account.id}
//                       onChange={() => handleRadioChange(account.id)}
//                     />
//                     {account.isPrimary && <span className="ms-2">(Primary)</span>}
//                   </ListGroup.Item>
//                 ))}
//               </ListGroup>
//             </Form>
//           </Card.Body>
//         </Card> */}
//       </Col>
//     </Row>
//   </Container>
//   );
// }

// export default UserProfileComponent;















import React, { useState, useEffect } from 'react';
import '../../style/adminDashboard/userprofile.css'
import AddBankAccountComponent from '../../component/AdminDashboard/AddBankAccountComponent.jsx';
import axiosInstance from '../../config/axios/AxiosConfiguration.jsx';
import avatar from '../../Assets/img/avatar.jpg';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useFormik } from 'formik';
import Swal from 'sweetalert2'


function UserProfileComponent({ setIsProfileVisible }) {
  const navigate = useNavigate()
  const handleBackButton = () => {
    setIsProfileVisible(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('usertoken')
    navigate('/user/login')
  }

  const [bankAccounts, setBankAccounts] = useState([])
  const [selectedBankAccount, setSelectedBankAccount] = useState(null);
  const [primaryBankAccount, setPrimaryBankAccount] = useState(null)

  const handleBankAccountChange = (selectedOption) => {
    setSelectedBankAccount(selectedOption);
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  const [profiledata, setProfiledata] = useState([])
  const token = localStorage.getItem('usertoken')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get('userapp/single/user/dashboard/details', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu',response.data)
        setProfiledata(response.data);
        // formik.setFieldValue('name', response.data?.user?.name || '');
        // formik.setFieldValue('email', response.data?.user?.email || '');
        // formik.setFieldValue('phone', response.data?.phone || '')
        const bankresponse = await axiosInstance.get('userapp/user/get/all/bank/account', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        console.log('bank details', bankresponse.data);
        setBankAccounts(bankresponse.data);
        const primaryAccount = bankresponse.data.find(account => account.current_primary_account === true);
        if (primaryAccount) {
          setPrimaryBankAccount(primaryAccount);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [token])

  useEffect(() => {
    if (profiledata.user) {
      formik.setFieldValue('name', profiledata.user.name || '');
      formik.setFieldValue('email', profiledata.user.email || '');
      formik.setFieldValue('phone', profiledata.phone || '');
    }
  }, [profiledata]);

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setImage(selectedImage);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImage(null);
      setImagePreview('');
    }
  };


  // const handleSubmit = async () => {
  //   try {
  //     const response = await axiosInstance.patch(userapp/user/set/bank/account/primary/${selectedBankAccount?.id}, {}, {
  //       headers: {
  //         'Authorization': Bearer ${token}
  //       }
  //     })
  //     console.log(response.data);

  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  const handlemodal=()=>{
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: `Don't save`
    }).then((result) => {
      
      if (result.isConfirmed) {
        Swal.fire("Saved!", "", "success");
        formik.handleSubmit()
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    });
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      address_line_1 :''
    },
    onSubmit: async (values) => {
      try {
        
        const primaryresponse = await axiosInstance.patch(`userapp/user/set/bank/account/primary/${selectedBankAccount?.id}`, {}, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log('primaryresponse',primaryresponse);

        const response= await axiosInstance.patch('userapp/edit/user/profile',values,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        console.log('response',response.data);
        
      } catch (error) {
        console.log('error');
      }
    }
  })

console.log('formik',formik.values);
  return (
    <div className="container mt-2" style={{ width: '100%', maxWidth: '600px' }}>
      <div>
        <div>

          <div>
            <nav className="navbar navbar-expand-sm">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar-list-4" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbar-list-4">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img src={avatar} width="40" height="40" className="rounded-circle" alt="User Avatar" />
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                      <a className="dropdown-item" id="profileLink">Profile</a>
                      <a className="dropdown-item" onClick={handleLogout} id='logoutLink' >Log Out</a>
                    </div>
                  </li>
                </ul>
              </div>
            </nav>

          </div>
        </div>

      </div>

      <div className="card" style={{ width: '100%', maxWidth: '800px' }}>
        <div className="card-header" style={{ backgroundColor: 'white', display: 'flex', justifyContent: 'center' }}>
          <p>Hi <span style={{ fontWeight: '900' }}>{profiledata?.user?.name}</span> Update your profile or account password below</p>
        </div>
        <div className="card-body">
          <form id='edituser' onSubmit={formik.handleSubmit}>

            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='name'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  required
                />
              </div>
              <div className="col-md-6 ">
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  // placeholder="Enter your phone number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3 row">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  // placeholder="Enter your email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="email" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  name='address_line_1'
                  value={formik.values.address_line_1}
                  onChange={formik.handleChange}
                  required
                />
              </div>

              {/* <div className="col-md-6">
                <label htmlFor="phone" className="form-label">
                  Address
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  // placeholder="Enter your phone number"
                  value={profiledata?.user?.date_joined ? new Date(profiledata.user.date_joined).toLocaleDateString() : ''}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div> */}
            </div>
            {/* <div className="mb-3 row align-items-center">
              <div className="col-md-6">
                <label htmlFor="image" className="form-label">
                  Upload Image
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="image"
                  onChange={handleImageChange}
                  
                />
              </div>
              <div className="col-md-6">
                {imagePreview ? (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '100%', maxHeight: '150px', marginTop: '10px' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '150px',
                      border: '1px dashed #ccc',
                      textAlign: 'center',
                      lineHeight: '150px',
                      marginTop: '10px',
                    }}
                  >
                    No Image Selected
                  </div>
                )}
              </div>
            </div> */}
            <div className="mb-3 row">

              <div className="col">
                <label htmlFor="phone" className="form-label">
                  Choose primary account
                </label>

                <Select
                  value={selectedBankAccount}
                  onChange={handleBankAccountChange}
                  options={bankAccounts}
                  getOptionLabel={(option) => `${option.bank_name}`}
                  // getOptionLabel={(option) => `${option.account_number} - ${option.bank_name}`}

                  getOptionValue={(option) => option.id}
                  isSearchable
                  placeholder="Search Bank..."
                />
              </div>
              <div className="col">
                <label className="form-label">
                  Current Primary account
                </label>

                <div className="selected-account-box p-3 border rounded">
                  {selectedBankAccount ? (
                    <>
                      <div className="mb-2">
                        <strong></strong> {selectedBankAccount.bank_name}
                      </div>
                      {/* <div className="mb-2">
                        <strong>Name:</strong> {selectedBankAccount.account_holder_name}
                      </div>
                      <div>
                        <strong>IFSC Code:</strong> {selectedBankAccount.ifsc_code}
                      </div> */}
                    </>
                  ) : (
                    <>
                      {primaryBankAccount && (
                        <>
                          <div className="mb-2">
                            <strong></strong> {primaryBankAccount.bank_name}
                          </div>
                          {/* <div className="mb-2">
                            <strong>Name:</strong> {primaryBankAccount.account_holder_name}
                          </div>
                          <div>
                            <strong>IFSC Code:</strong> {primaryBankAccount.ifsc_code}
                          </div> */}
                        </>
                      )}
                    </>
                  )}
                </div>

              </div>

            </div>
            <AddBankAccountComponent />
            <button type="submit" form='edituser' onClick={handlemodal} className="btn btn-primary ml-3">
              Save Profile
            </button> 
            <button type="submit" onClick={handleBackButton} className="btn btn-danger ml-3">
              Go Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserProfileComponent;







