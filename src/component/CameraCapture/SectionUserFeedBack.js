import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

const SectionUserFeedBack = () => {
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const navigate = useNavigate();

  const sendFeedbackToBackend = async (feedbacks) => {
    try {
      if (!localStorage.getItem('id')) {
        localStorage.setItem('id', '1');
      }
      const userId = localStorage.getItem('id');
      const feedback = feedbacks.join(', '); // 피드백을 문자열로 변환

        // 피드백을 userId와 함께 쿼리 파라미터로 전송
        await axios.post(`${process.env.REACT_APP_API}/user/feedback/save`, null, {
          params: {
            userId,
            feedback,
          },
        });
      console.log('피드백이 성공적으로 전송되었습니다.');
    } catch (error) {
      console.error('피드백 전송 오류:', error);
    }
  };

  const handleAddFeedback = () => {
    if (feedback.trim() !== '') {
      setFeedbackList((prevList) => [...prevList, feedback]);
      setFeedback('');
    }
  };

  const handleSubmit = async () => {
    if (feedbackList.length > 0) {
      await sendFeedbackToBackend(feedbackList);
      setFeedbackList([]);
      navigate('/glassesrecommend');
    }
  };

  const handleReset = () => {
    setFeedbackList([]);
  };

  const handleRemoveFeedback = (index) => {
    setFeedbackList((prevList) => prevList.filter((_, i) => i !== index));
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4" style={{ marginTop: '80px',fontWeight: 'bold', fontSize: '2.5rem' }}>사용자 피드백</h1>
      <p className="text-center mb-4" style={{ marginTop: '40px',fontSize: '2rem' }}>당신의 의견을 들려주세요. AI가 더 알맞은 모델을 재추천해드립니다.</p>
      
      <Card className="mb-4">
        <Card.Body>
          <Card.Title style={{ marginTop: '50px',marginBottom: '50px',fontSize: '2rem' }}>🔥 많이 하는 피드백</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item style={{ fontSize: '1.8rem' }}>크기가 커요</ListGroup.Item>
            <ListGroup.Item style={{ fontSize: '1.8rem' }}>재질이 마음에 안들어요</ListGroup.Item>
            <ListGroup.Item style={{ fontSize: '1.8rem' }}>가격이 부담스러워요</ListGroup.Item>
            <ListGroup.Item style={{ fontSize: '1.8rem' }}>안경테가 두꺼워요</ListGroup.Item>
            <ListGroup.Item style={{ fontSize: '1.8rem',marginBottom: '70px' }}>다른 색상으로 추천해주세요</ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      <Form className="mb-3" style={{ marginTop: '70px'}} >
        <Form.Group controlId="feedbackInput">
          <Form.Control
            type="text"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="피드백을 입력하세요..."
            style={{ fontSize: '1.3rem' }}
          />
        </Form.Group>
        <div className="d-flex mt-2">
          <Button variant="primary" onClick={handleAddFeedback} className="me-2" style={{ fontSize: '1.5rem' }}>
            등록
          </Button>
          <Button variant="secondary" onClick={handleReset} style={{ fontSize: '1.5rem' }}>
            초기화
          </Button>
        </div>
      </Form>

      {feedbackList.length > 0 && (
        <Card className="mb-4">
          <Card.Body>
            <Card.Title style={{ fontSize: '1.8rem' }}>등록된 피드백</Card.Title>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px'}}>
              {feedbackList.map((item, index) => (
                <div
                  key={index}
                  className="bg-light border rounded d-flex align-items-center justify-content-center"
                  style={{
                    padding: '8px 12px',
                    minWidth: '160px',
                    maxWidth: '250px',
                    fontSize: '1.2rem',
                    textAlign: 'center'
                  }}
                >
                  {item}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleRemoveFeedback(index)}
                    style={{ marginLeft: '8px', padding: '0 8px', fontSize: '1.1rem' }}
                  >
                    X
                  </Button>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      )}

      <Button
        style={{ backgroundColor: 'purple', borderColor: 'purple', fontSize: '2rem', padding: '12px 18px' }}
        onClick={handleSubmit}
        className="w-100 mt-3"
      >
        다시 추천받기
      </Button>
    </div>
  );
};

export default SectionUserFeedBack;