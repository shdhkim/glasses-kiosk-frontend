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
  const [glassesData, setGlassesData] = useState([]); // 안경 데이터
  const [mixImages, setMixImages] = useState(null); // 합성 이미지 리스트
  const [selectedIndex, setSelectedIndex] = useState(0); // 선택된 안경의 인덱스
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [mixImageLoading, setMixImageLoading] = useState(true); // 합성 이미지 로딩 상태
  const [networkError, setNetworkError] = useState(false); // 네트워크 오류 상태
  const navigate = useNavigate();

  const defaultUserImage = localStorage.getItem('image') || '/default-user.png'; // 기본 사용자 이미지
  const defaultGlassesData = [
    {
      model: 'DAM 01 dsdssdsd sdsdsdsdds dssdsdsdsddssdsd',
      brand: '드드',
      color: '검정색',
      price: '150000000',
      image_path: '/default.png',
      size: 'M',
    },
    {
      model: 'DAM 02',
      brand: '드드',
      color: '갈색',
      price: '60000',
      image_path: '/default2.png',
      size: 'L',
    },
  ];

  const fetchGlassesData = async () => {
    try {
      setLoading(true);
      setNetworkError(false);

      const id = localStorage.getItem('id') || '1';

      // 안경 정보 가져오기
      const response = await axios.get(`/glasses/find/${id}`);
      const glassesList = response.data.data || [];

      setGlassesData(glassesList.length > 0 ? glassesList : defaultGlassesData);
    } catch (error) {
      console.error('안경 정보 가져오기 오류:', error);
      setNetworkError(true);
      setGlassesData(defaultGlassesData);
    } finally {
      setLoading(false);
    }
  };

  const fetchMixImages = async () => {
    try {
      setMixImageLoading(true);
      const id = localStorage.getItem('id') || '1';

      // 합성 이미지 리스트 가져오기
      const response = await axios.get(`/user/image/send/${id}`);
      const mixImagesList = response.data.data || null;

      setMixImages(mixImagesList);
    } catch (error) {
      console.error('합성 이미지 가져오기 오류:', error);
      setMixImages(null); // 실패 시 null로 설정
    } finally {
      setMixImageLoading(false);
    }
  };

  useEffect(() => {
    fetchGlassesData(); // 안경 데이터 가져오기
    fetchMixImages(); // 합성 이미지 가져오기
  }, []);

  const handleGlassesSelect = (index) => {
    setSelectedIndex(index); // 선택된 인덱스 설정
  };

  const navigateToFeedback = () => {
    navigate('/userfeedback'); // 피드백 페이지로 이동
  };

  return (
    <Container className="my-5">
      <h1
        className="text-center mb-4"
        style={{ marginTop: '70px', fontWeight: 'bold', fontSize: '2.5rem' }}
      >
        모델 추천
      </h1>

      {loading || mixImageLoading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
          <Spinner animation="border" role="status" variant="primary" />
          <p className="ms-3" style={{ fontSize: '1.8rem', color: 'gray' }}>
            추천 안경 정보를 가져오는 중입니다...
          </p>
        </div>
      ) : (
        <>
          {/* 사용자 이미지 및 합성 이미지 표시 */}
          <div className="text-center mb-4">
            <img
              src={
                mixImages && mixImages[selectedIndex]
                  ? `data:image/png;base64,${mixImages[selectedIndex]}`
                  : defaultUserImage // 합성 이미지 없으면 기본 사용자 이미지 표시
              }
              alt="User with Glasses"
              className="img-fluid"
              style={{ width: '600px', borderRadius: '8px' }}
            />
          </div>

          {/* 제품 갤러리 */}
          <Row className="justify-content-center mb-4">
            {glassesData.map((glasses, index) => (
              <Col key={index} md={3} className="mb-3">
                <img
                  src={glasses.image_path} // 기본 안경 이미지
                  alt={`Glasses ${index + 1}`}
                  className="img-fluid"
                  style={{
                    width: '100px',
                    height: '100px',
                    cursor: 'pointer',
                    borderRadius: '8px',
                    border: selectedIndex === index ? '3px solid #007bff' : '2px solid #ccc',
                    boxShadow:
                      selectedIndex === index
                        ? '0 4px 8px rgba(0, 123, 255, 0.4)'
                        : '0 2px 4px rgba(0, 0, 0, 0.1)',
                    transition: 'border 0.3s, background-color 0.3s, box-shadow 0.3s',
                  }}
                  onClick={() => handleGlassesSelect(index)}
                />
              </Col>
            ))}
          </Row>

          {/* 선택된 제품 정보 */}
          {glassesData[selectedIndex] && (
            <Card className="text-center p-4">
              <Card.Body>
                <Row>
                  <Col md={5} className="d-flex justify-content-center align-items-center">
                    <img
                      src={glassesData[selectedIndex].image_path} // 선택된 안경 기본 이미지
                      alt="Selected Glasses"
                      className="img-fluid"
                      style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                    />
                  </Col>
                  <Col md={7}>
                  <h4
  style={{
    paddingRight: '360px',
    fontWeight: 'bold',
    fontSize: '2rem',
  
  }}
>
  {glassesData[selectedIndex].model}
</h4>
<Card.Text style={{ fontSize: '1.8rem', color: 'gold', paddingRight: '360px', whiteSpace: 'nowrap' }}>
  ₩{glassesData[selectedIndex].price}
</Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      브랜드: {glassesData[selectedIndex].brand}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      색상: {glassesData[selectedIndex].color}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      성분: {glassesData[selectedIndex].material || '정보 없음'}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      모양: {glassesData[selectedIndex].shape || '정보 없음'}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      무게: {glassesData[selectedIndex].weight ? `${glassesData[selectedIndex].weight}g` : '정보 없음'}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      렌즈 너비: {glassesData[selectedIndex].width ? `${glassesData[selectedIndex].width}mm` : '정보 없음'}
                    </Card.Text>
                    <Card.Text style={{ fontSize: '1.6rem' }}>
                      렌즈 길이: {glassesData[selectedIndex].length ? `${glassesData[selectedIndex].length}mm` : '정보 없음'}
                    </Card.Text>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </>
      )}

      {/* 피드백 버튼 */}
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