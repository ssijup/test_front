import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React,{useState} from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import axiosInstance from '../../config/axios/AxiosConfiguration';
import { useNavigate } from 'react-router-dom';
import avatar from '../../Assets/img/ihdclogo.jpg'
import { FaLock } from "react-icons/fa";

function MyVerticallyCenteredModal(props) {
   
    const navigate = useNavigate();

    const token=localStorage.getItem('usertoken')
    const complete_order = (paymentID, orderID, signature) => {
      const url = `product/subcription/sucessfull/completed/${paymentID}/${orderID}/${signature}`
      axiosInstance.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
            
            navigate('/user/success/');
            // const propsToPass = { \props };

          // navigate(/advocate/success?message=${encodeURIComponent(message)});
          // navigate(/user/success/${encodeURIComponent(JSON.stringify(propsToPass))});

        })
        .catch((error) => {
          console.log('ooooooooooooooooooooooooooooooo')
          console.log(error.response.data);
        });
    };
    
  
  
   const handlePayment = (id) =>{
      console.log(id,'sijuuuwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwuu')
      axiosInstance.post(`product/service/payment/request/initiation/${id}`,null,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log('Response:', response);
      const redirectUrl = response.data.message;
      window.location.href = redirectUrl;

      
  
        
      })
      .catch((error) => {
        console.log(error)
        console.log('erorrrrrr')
        console.log(error.response.data)
      });
  
    }



  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {/* <button onClick={paymentStart}> </button> */}
        <b>SITE VISIT</b>
   
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Container className="mt-5">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={avatar} alt="User Avatar" />
            <Card.Body>
              <Card.Title className='text-center'>{props.ProductDetails.name}</Card.Title>
              <Card.Text> </Card.Text>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>We will come and measure your site </Card.Title>
              <Card.Text>
              <ul>
<li>SITE SURVEY</li>
{/* <li>0.5-1.5% Lower interest fee payments</li>
<li>10 year interest free Payments</li>
<li>Access to experts & Community</li> */}
</ul>
              </Card.Text>
            </Card.Body>
          </Card>

          {/* Additional Sections */}
          <Card className="mt-3">
            <Card.Body>
              <Card.Title>Subcription Amount</Card.Title>
              <Card.Text className='text-danger'>
              <span style={{fontFamily:"arial"}}>₹ </span>{
                    
                    props.ProductDetails.subcription_fee  
                }
              </Card.Text>
              
              <Card.Title>Note:</Card.Title>
              <Card.Text>
                By making payment site survey
              </Card.Text>
            </Card.Body>
          </Card>
      
        </Col>
      </Row>
      <Row>
      {/* <Card className="mt-3">
            <Card.Body>
              <Card.Title>Contact Information</Card.Title>
              <Card.Text>
                
                Name :<span>{props.ProductDetails?.created_by?.name}</span><br/>
                Email:<span>{props.ProductDetails?.created_by?.email}</span>

              </Card.Text>
            </Card.Body>
          </Card> */}
      </Row>
    </Container>
        
      </Modal.Body>
      <Modal.Footer className='d-flex align-items-center justify-content-center justify-content-around'>
        <Button onClick={props.onHide} className='btn btn-danger'>Close</Button>
        <Button className='btn-success ' onClick={() => handlePayment(props.ProductDetails.id)}>Activate</Button>
      </Modal.Footer>
    </Modal>
  );
}

function FeaturePaymentModal({productid}) {
  const [modalShow, setModalShow] = useState(false);
  const [ProductDetails,setProductDetails]=useState([])
  const token=localStorage.getItem('usertoken')
const handleFetchData=async()=>{
  try {
    
    const singleproductid=await axiosInstance.get(`product/details/${productid}`,{
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
console.log('singleproductid',singleproductid.data);
  setProductDetails(singleproductid.data)
  setModalShow(true)
  } catch (error) {
    
  }
}
  return (
    <>
      {/* <Button  variant='success' onClick={handleFetchData}>
        unlock features
      </Button> */}
      <Button className='btn  btn-sm' style={{backgroundColor:'green',border:'none'}}onClick={handleFetchData}>Activate Now</Button> 
      

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        ProductDetails={ProductDetails}
        productid={productid}
      />
    </>
  );
}

export default FeaturePaymentModal

