import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

const SectionAnalysisResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { image } = location.state || {};

  useEffect(() => {
    const fetchAnalysisData = async () => {
      localStorage.setItem('image', image);

      try {
        if (!localStorage.getItem('id')) {
          localStorage.setItem('id', '1');
        }
        const id = localStorage.getItem('id');
        const response = await axios.get(`user/find/${id}`);
        const userDto = response.data?.data;

        setAnalysisData(userDto);
        console.log('Analysis data:', userDto);
        setLoading(false);
      } catch (error) {
        console.error('분석 데이터 가져오기 오류:', error);
        setLoading(false);
      }
    };

    fetchAnalysisData();
  }, [image]);

  const defaultAnalysisData = {
    skinTone: '쿨톤',
    faceShape: '각진형',
    glassesFrame: '원형 프레임',
    glassesColor: '검정색',
  };

  const goToRecommendationPage = () => {
    navigate('/glassesrecommend');
  };

  const renderImageBasedOnAnalysis = () => {
    const {
      faceShape = defaultAnalysisData.faceShape,
      personalColor = defaultAnalysisData.skinTone,
      glassesFrame = defaultAnalysisData.glassesFrame,
      glassesColor = defaultAnalysisData.glassesColor,
    } = analysisData || {};

    return (
      <div className="d-flex flex-row justify-content-center align-items-center gap-3">
        {/* 얼굴형이 '각진형'일 때만 얼굴형 이미지를 표시 */}
        {(analysisData?.faceShape === '각진형' || (!analysisData?.faceShape && defaultAnalysisData.faceShape === '각진형')) && (
          <div className="text-center" style={{ border: '3px solid blue', borderRadius: '8px', padding: '5px', width: '130px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img src="/angular.png" alt="Angular Shape" className="img-fluid" style={{ width: '60px', margin: '0 auto' }} />
            <p style={{ color: 'blue', fontWeight: 'bold', marginTop: '5px', fontSize: '1.6rem' }}>
              {analysisData?.faceShape || defaultAnalysisData.faceShape}
            </p>
          </div>
        )}
        
        {/* 피부톤이 '쿨톤'일 때만 피부톤 이미지를 표시 */}
        {(analysisData?.personalColor === '쿨톤' || (!analysisData?.personalColor && defaultAnalysisData.skinTone === '쿨톤')) && (
          <div className="text-center" style={{ border: '3px solid blue', borderRadius: '8px', padding: '5px', width: '130px', height: '130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <img src="/cool.png" alt="Cool Tone" className="img-fluid" style={{ width: '60px', margin: '0 auto' }} />
            <p style={{ color: 'blue', fontWeight: 'bold', marginTop: '5px', fontSize: '1.6rem' }}>
              {analysisData?.personalColor || defaultAnalysisData.skinTone}
            </p>
          </div>
        )}
      </div>
    );};
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4" style={{ marginTop: '70px', fontWeight: 'bold', fontSize: '2.5rem' }}>분석 결과</h1>
      {image && (
        <div className="text-center mb-4">
          <img src={image} alt="Captured" className="img-fluid" style={{ width: '600px' }} />
        </div>
      )}
      {loading ? (
        <div className="d-flex flex-column align-items-center">
          <Spinner animation="border" variant="primary" role="status" className="mb-3">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
          <p className="text-center" style={{ fontSize: '2rem' }}>
            잠시만 기다려주세요... <br />
            내게 꼭 맞는 안경 모델을 AI가 찾고 있어요!
          </p>
          <p className="text-muted" style={{ fontSize: '1.8rem' }}>얼굴형 분석 중</p>
          <p className="text-muted" style={{ fontSize: '1.8rem' }}>피부톤 분석 중</p>
          <p className="text-muted" style={{ fontSize: '1.8rem' }}>안경모델과 매칭 중</p>
        </div>
      ) : (
        <Card className="text-center p-4">
          <Card.Body>
            {renderImageBasedOnAnalysis()}
            <Card.Text className="mt-3" style={{ fontSize: '2rem' }}>
              고객님의 얼굴 모양은 <span style={{ color: 'skyblue', fontWeight: 'bold' }}>{analysisData?.faceShape || defaultAnalysisData.faceShape}</span>이고, <br />
              퍼스널 컬러는 <span style={{ color: 'skyblue', fontWeight: 'bold' }}>{analysisData?.personalColor || defaultAnalysisData.skinTone}</span> 입니다.
            </Card.Text>
            <Card.Text className="mt-3" style={{ fontSize: '2rem' }}>
              추천 안경 프레임은 <span style={{ color: 'skyblue', fontWeight: 'bold' }}>{analysisData?.glassesFrame||defaultAnalysisData.glassesFrame}</span>이며, <br />
              추천 색상은 <span style={{ color: 'skyblue', fontWeight: 'bold' }}>{analysisData?.glassesColor||defaultAnalysisData.glassesColor}</span>입니다.
            </Card.Text>
          </Card.Body>
        </Card>
      )}
      <div className="text-center mt-4">
        <Button variant="primary" onClick={goToRecommendationPage} style={{ fontSize: '2rem', marginTop: '20px' }}>
          추천 안경 보기
        </Button>
      </div>
    </Container>
  );
};

export default SectionAnalysisResult;