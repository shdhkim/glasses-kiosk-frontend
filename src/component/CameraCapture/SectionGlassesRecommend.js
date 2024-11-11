import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';

const SectionGlassesRecommend = () => {
  const [glassesData, setGlassesData] = useState([]);
  const [selectedGlasses, setSelectedGlasses] = useState(null);
  const [loading, setLoading] = useState(true);
  const [networkError, setNetworkError] = useState(false);
  const navigate = useNavigate();
  const image = localStorage.getItem("image");

  const defaultGlassesData = [
    {
      productName: 'DAM 01',
      brand: '드드',
      color: '검정색',
      price: '50000',
      image: '/default.png',
      size: 'M'
    },
    {
      productName: 'DAM 02',
      brand: '드드',
      color: '갈색',
      price: '60000',
      image: '/default2.png',
      size: 'L'
    },
    {
      productName: 'DAM 03',
      brand: '드드',
      color: '갈색',
      price: '60000',
      image: '/default2.png',
      size: 'L'
    },   {
      productName: 'DAM 04',
      brand: '드드',
      color: '갈색',
      price: '160000',
      image: '/default2.png',
      size: 'L'
    }
  ];

  const fetchGlassesData = async () => {
    try {
      setLoading(true);
      setNetworkError(false);

      if (!localStorage.getItem('id')) {
        localStorage.setItem('id', '1');
      }
      const id = localStorage.getItem('id');

      const response = await axios.get(`/glasses/find/${id}`);
      const glassesList = response.data.data || [];
      setGlassesData(glassesList);
      setSelectedGlasses(glassesList[0] || defaultGlassesData[0]);
    } catch (error) {
      console.error('안경 데이터 가져오기 오류:', error);
      setNetworkError(true);
      setGlassesData(defaultGlassesData);
      setSelectedGlasses(defaultGlassesData[0]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlassesData();
  }, []);

  const displayGlassesData = networkError || glassesData.length === 0 ? defaultGlassesData : glassesData;

  const handleGlassesSelect = (glasses) => {
    setSelectedGlasses(glasses);
  };

  const navigateToFeedback = () => {
    navigate('/userfeedback');
  };

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" style={{ marginTop: '70px', fontWeight: 'bold', fontSize: '2.5rem' }}>
        모델 추천
      </h1>
      
      {image && (
        <div className="text-center mb-4">
          <img src={image} alt="Captured" className="img-fluid" style={{ width: '600px', borderRadius: '8px' }} />
        </div>
      )}
      
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" role="status" variant="primary" />
        </div>
      ) : (
        <>
          {/* 제품 갤러리 */}
          <Row className="justify-content-center mb-4">
            {displayGlassesData.map((glasses, index) => (
              <Col key={index} md={3} className="mb-3">
                <img
                  src={networkError ? glasses.image : `data:image/jpeg;base64,${glasses.image}`}
                  alt={`Glasses ${index + 1}`}
                  className={`img-fluid ${selectedGlasses === glasses ? 'border border-primary' : ''}`}
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                  }}
                  onClick={() => handleGlassesSelect(glasses)}
                />
              </Col>
            ))}
          </Row>

          {/* 선택한 제품 정보 표시 */}
          {selectedGlasses && (
            <Card className="text-center p-4">
              <Card.Body>
                <Row style={{ marginBottom: '40px' }}>
                  <Col md={5} className="d-flex justify-content-center align-items-center">
                    <img
                      src={networkError ? selectedGlasses.image : `data:image/jpeg;base64,${selectedGlasses.image}`}
                      alt={`Selected Glasses`}
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </Col>
                  <Col md={7}>
                    <h4 style={{ fontWeight: 'bold', fontSize: '2rem' }}>{selectedGlasses.productName}</h4>
                    <Card.Text style={{ fontSize: '1.8rem', color: 'gold' }}>₩{selectedGlasses.price}</Card.Text>
                    <Card.Text style={{ fontSize: '1.8rem' }}>브랜드: {selectedGlasses.brand}</Card.Text>
                    <Card.Text style={{ fontSize: '1.8rem' }}>색상: {selectedGlasses.color}</Card.Text>
                    <Card.Text style={{ fontSize: '1.8rem' }}>크기: {selectedGlasses.size || '정보 없음'}</Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </>
      )}
      
      <div className="text-center mt-4">
        <Button 
          style={{ 
            backgroundColor: 'purple', 
            borderColor: 'purple', 
            fontSize: '1.8rem', 
            padding: '12px 20px', 
          }} 
          onClick={navigateToFeedback}
        >
          다시 추천하기
        </Button>
      </div>
    </Container>
  );
};

export default SectionGlassesRecommend;