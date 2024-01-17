import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useLocation, useNavigate } from 'react-router-dom';
import TopNav from '../../component/AdminDashboard/TopNav.jsx';
import '../../style/adminDashboard/registrationform.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useFormik } from 'formik';
import Select from 'react-select';
import { toast } from 'react-toastify';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import AxiosConfiguration from '../../config/axios/AxiosConfiguration.jsx';

function MyVerticallyCenteredModal(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const product_unique_id = searchParams.get('product_id');
    const influencer_uuid = searchParams.get('influ_1');
    const organiser_uuid = searchParams.get('org_2');
    const link_uuid = searchParams.get('li');

    const [stateResponse, setStateResponse] = useState([]);
    const [districtOptions, setDistrictOptions] = useState([]);
    const [subDistrictOptions, setSubDistrictOptions] = useState([]);
    const [localBodyOptions, setLocalBodyOptions] = useState([]);
    const [villageOptions, setVillageOptions] = useState([]);
    const [clickstate, setClickstate] = useState('0');
    const [selectedState, setSelectedState] = useState('KERALA');
    const [showEmailField, setShowEmailField] = useState(true);
    const [loading, setLoading] = useState(false);
    const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
    const [userId, setUserId] = useState(0);
    const [registereduserdata, setRegistereduserdata] = useState([])


    // const [registrationData, setRegistrationData] = useState({
    //   name: '',
    //   email: '',
    //   phone: '',
    //   password: '',
    //   address_line_1: '',
    //   address_line_2: '',
    //   land_mark: '',
    //   state: selectedState,
    //   district: '',
    //   sub_district: '',
    //   local_body: '',
    //   village: '',
    // });                         
    const token = localStorage.getItem('usertoken')

    const fetchDataForState = async (state) => {
        try {

            //   const clickrefresh = await axiosInstance.patch(userapp/user/link/clicked/${product_unique_id}/${link_uuid});
            //   setClickstate(clickrefresh.data.message);

            const response = await axiosInstance.get(`userapp/state/${state}`);
            console.log('state response', response.data);
            setStateResponse(response.data);


            const uniqueDistricts = Array.from(new Set(response.data.map((entry) => entry.district)));
            setDistrictOptions(uniqueDistricts);


            const subDistricts = fetchDataForDistrict(uniqueDistricts[0]);
            setSubDistrictOptions(subDistricts);

            // Extract local bodies and villages based on the selected district
            const districtData = response.data.filter((entry) => entry.district === uniqueDistricts[0]);
            const uniqueLocalBodies = Array.from(new Set(districtData.map((entry) => entry.local_body)));
            setLocalBodyOptions(uniqueLocalBodies);

            const uniqueVillages = Array.from(new Set(districtData.map((entry) => entry.village)));
            setVillageOptions(uniqueVillages);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    };

    useEffect(() => {
        fetchDataForState(selectedState);
    }, [selectedState]);

    const handleStateChange = async (selectedOption) => {
        const newState = selectedOption ? selectedOption.label : '';
        setSelectedState(newState);
    };

    const fetchDataForDistrict = (district) => {

        const districtData = stateResponse.filter((entry) => entry.district === district);
        const uniqueSubDistricts = Array.from(new Set(districtData.map((entry) => entry.sub_district)));
        return uniqueSubDistricts;
    };



    const handleDistrictChange = (selectedOption) => {
        formik.setFieldValue('district', selectedOption ? selectedOption.label : '');

        const uniqueSubDistricts = fetchDataForDistrict(selectedOption.label);
        setSubDistrictOptions(uniqueSubDistricts);
        formik.setFieldValue('sub_district', '');
        formik.setFieldValue('local_body', '');
        formik.setFieldValue('village', '');
    };


    const handleSubDistrictChange = (selectedOption) => {
        formik.setFieldValue('sub_district', selectedOption ? selectedOption.label : '');


        const subdistrictData = stateResponse.filter((entry) => entry.sub_district === selectedOption.label);
        const uniqueLocalBodies = Array.from(new Set(subdistrictData.map((entry) => entry.local_body)));
        setLocalBodyOptions(uniqueLocalBodies);

        const uniqueVillages = Array.from(new Set(subdistrictData.map((entry) => entry.village)));
        setVillageOptions(uniqueVillages);

        formik.setFieldValue('local_body', '');
        formik.setFieldValue('village', '');
    };

    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {


        } catch (error) {
            console.log(error)
            setShowEmailField(false);

            toast.error(error.response.data.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
 

    const formik = useFormik({
        initialValues: {
            name: props.profiledata?.user?.name || '',
            email: props.profiledata?.user?.email || '',
            phone: props.profiledata?.phone || '',
            address_line_1: props.profiledata.address_line_1 || '',
            address_line_2: props.profiledata.address_line_1 || '',
            land_mark: props.profiledata?.local_body || '',
            state: selectedState,
            district: '',
            sub_district: '',
            local_body: '',
            village: '',

        },
        enableReinitialize: true,
        onSubmit: async (values, { resetForm, setErrors }) => {
            try {
               const response= await  axiosInstance.patch(`userapp/edit/user/profile/${props.profiledata?.user?.id}`,values,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
               })

               console.log('response',response.data);

            } catch (error) {
                console.log(error);
                toast.error(error.response.data.message);
            }
        },
    });
console.log('formik values',formik.values);

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Profile
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Card style={{ width: '100%' }} >
                    <Card.Body>
                        <Form id="register" onSubmit={formik.handleSubmit}>
 {/* <p>user{props.profiledata?.user?.id}</p> */}
                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Group controlId="formFirstName">
                                        <Form.Label className="text-secondary">Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            name="name"
                                            isInvalid={formik.touched.name && !!formik.errors.name}
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.name && formik.errors.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formPhone">
                                        <Form.Label className="text-secondary">Phone</Form.Label>
                                        <Form.Control type="tel" value={formik.values.phone} onChange={formik.handleChange} name="phone" isInvalid={formik.touched.phone && !!formik.errors.phone} required pattern="[0-9]{8,15}"
                                            title="Please enter a valid phone number with 8 to 15 digits." />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.phone && formik.errors.phone}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label className="text-secondary">Email</Form.Label>
                                        <Form.Control
                                            type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>

                                    <Form.Group controlId="formState">
                                        <Form.Label className="text-secondary">State</Form.Label>
                                        <Select
                                            value={{ label: selectedState, value: selectedState }}
                                            onChange={handleStateChange}
                                            options={[{ label: 'Kerala', value: 'KERALA' }]}
                                            isSearchable={false}
                                            isDisabled
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                <Col md={6}>
                                    <Form.Group controlId="formAddressLine1">
                                        <Form.Label className="text-secondary">Address Line 1</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={formik.values.address_line_1} onChange={formik.handleChange} name="address_line_1" isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1} required />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.address_line_1 && formik.errors.address_line_1}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="formAddressLine2">
                                        <Form.Label className="text-secondary">Address Line 2</Form.Label>
                                        <Form.Control as="textarea" rows={3} value={formik.values.address_line_2} onChange={formik.handleChange} name="address_line_2" isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1} required />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.address_line_1 && formik.errors.address_line_1}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>


                            <Row className="mb-4">
                                <Col md={6}>


                                    <Form.Group controlId="formLandmark">
                                        <Form.Label className="text-secondary">Landmark</Form.Label>
                                        <Form.Control type="text" value={formik.values.land_mark} onChange={formik.handleChange} name="land_mark" isInvalid={formik.touched.address_line_1 && !!formik.errors.address_line_1} required />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.land_mark && formik.errors.land_mark}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                {/* <Col md={6}>
                                    <Form.Group controlId="formDistrict">
                                        <Form.Label className="text-secondary">District</Form.Label>
                                        <Select
                                            value={{ label: formik.values.district, value: formik.values.district }}
                                            onChange={handleDistrictChange}
                                            options={districtOptions.map((district) => ({ label: district, value: district }))}
                                            isSearchable
                                            placeholder="Search District..."
                                            name="district"
                                            oninvalid="this.setCustomValidity('Please select a district.')"
                                            oninput="setCustomValidity('')"
                                            required
                                            aria-required="true"
                                        />
                                    </Form.Group>
                                </Col> */}
                                <Col md={6}>
                                    <Form.Group controlId="formDistrict">
                                        <Form.Label className="text-secondary">District</Form.Label>
                                        <Select
                                            value={districtOptions.find(option => option.value === formik.values.district)}
                                            onChange={handleDistrictChange}
                                            options={districtOptions.map((district) => ({ label: district, value: district }))}
                                            isSearchable
                                            placeholder="Search District..."
                                            name="district"
                                            onInvalid={() => this.setCustomValidity('Please select a district.')}
                                            onInput={() => this.setCustomValidity('')}
                                            required
                                            aria-required="true"
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row className="mb-4">
                                {/* <Col md={4}>
                                    <Form.Group controlId="formSubDistrict">
                                        <Form.Label className="text-secondary">Sub District</Form.Label>
                                        <Select
                                            value={{ label: formik.values.sub_district, value: formik.values.sub_district }}
                                            onChange={handleSubDistrictChange}
                                            options={subDistrictOptions.map((subDistrict) => ({ label: subDistrict, value: subDistrict }))}
                                            isSearchable
                                            name='sub_district'
                                            placeholder="Search Sub District..."
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.sub_district && formik.errors.sub_district}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col> */}
                                <Col md={4}>
                                    <Form.Group controlId="formSubDistrict">
                                        <Form.Label className="text-secondary">Sub District</Form.Label>
                                        <Select
                                            value={subDistrictOptions.find(option => option.value === formik.values.sub_district)}
                                            onChange={handleSubDistrictChange}
                                            options={subDistrictOptions.map((subDistrict) => ({ label: subDistrict, value: subDistrict }))}
                                            isSearchable
                                            name='sub_district'
                                            placeholder="Search Sub District..."
                                            required
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {formik.touched.sub_district && formik.errors.sub_district}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formLocalBody">
                                        <Form.Label className="text-secondary">Local Body</Form.Label>
                                        <Select
                                            value={{ label: formik.values.local_body, value: formik.values.local_body }}
                                            onChange={(selectedOption) => {
                                                formik.setFieldValue('local_body', selectedOption ? selectedOption.label : '');
                                                const localBodyData = stateResponse.filter((entry) => entry.local_body === selectedOption.label);
                                                const uniqueVillages = Array.from(new Set(localBodyData.map((entry) => entry.village)));
                                                setVillageOptions(uniqueVillages);
                                                formik.setFieldValue('village', '');
                                            }}
                                            options={localBodyOptions.map((localBody) => ({ label: localBody, value: localBody }))}
                                            isSearchable
                                            placeholder="Search Local Body..."
                                            required

                                        />

                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="formVillage">
                                        <Form.Label className="text-secondary">Village</Form.Label>
                                        <Select
                                            value={{ label: formik.values.village, value: formik.values.village }}
                                            onChange={(selectedOption) => {
                                                formik.setFieldValue('village', selectedOption ? selectedOption.label : '');
                                            }}
                                            options={villageOptions.map((village) => ({ label: village, value: village }))}
                                            isSearchable
                                            placeholder="Search Village..."
                                            required
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            {/* <Row className="mb-4">
                    <Col md={6}>
                      <Form.Group controlId="formPassword">
                        <Form.Label className="text-secondary">Password</Form.Label>
                        <Form.Control type="password" value={formik.values.password} onChange={formik.handleChange} name="password" isInvalid={formik.touched.password && !!formik.errors.password} required />
                        <Form.Control.Feedback type="invalid">
                          {formik.touched.password && formik.errors.password}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group controlId="formConfirmPassword">
                        <Form.Label className="text-secondary">Confirm Password</Form.Label>
                        <Form.Control type="password" onChange={formik.handleChange} name="confirmPassword" isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword} required pattern={^${formik.values.password}$} />
                        <Form.Control.Feedback type="invalid">
                          {formik.touched.confirmPassword && formik.errors.confirmPassword}
                          {!formik.touched.confirmPassword && "Please enter the same password as above."}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row> */}

                            {/* <Row>
                    <Col md={12}>
                      <Button variant="primary" form="register" type="submit" className="w-100">
                        Register
                      </Button>
                    </Col>
                  </Row> */}
                        </Form>
                    </Card.Body>
                </Card>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="success" form="register" type="submit" >
                    Save
                </Button>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

function EditProfile() {
    const [modalShow, setModalShow] = React.useState(false);
    const [profiledata, setProfiledata] = useState([])
    const token = localStorage.getItem('usertoken')

    const handlefetchData = async () => {
        const userresponse = await axiosInstance.get('userapp/single/user/dashboard/details', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        console.log('userresponssdsdsdsssddsse', userresponse.data);
        setProfiledata(userresponse.data);
        setModalShow(true)
    }




    return (
        <>
            {/* <Button variant="primary" style={{ backgroundColor: '#081d29' }} >
        Edit Profile
      </Button> */}
            <Button variant="primary" style={{ backgroundColor: '#081d29' }} onClick={handlefetchData} className="mb-3">
                Edit Profile
            </Button>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                profiledata={profiledata}
            />
        </>
    );
}

export default EditProfile