import React, { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import * as faceapi from 'face-api.js';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const SectionCameraCapture = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [capturing, setCapturing] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const navigate = useNavigate();

  const guideSize = 600; 

  useEffect(() => {
    if (!localStorage.getItem('id')) {
      localStorage.setItem('id', '0');
    }

    const loadModels = async () => {
      setLoading(true);
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
          faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
          faceapi.nets.faceRecognitionNet.loadFromUri('/models')
        ]);
        setModelsLoaded(true);
      } catch (error) {
        console.error('모델 로딩 중 오류 발생:', error);
      } finally {
        setLoading(false);
      }
    };
    loadModels();
  }, []);

  const startCapture = () => {
    if (!modelsLoaded) return;
    setCapturing(true);
    setCountdown(5);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          captureImage();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImageSrc(imageSrc);
        recognizeFace(imageSrc);
      } else {
        console.error('이미지 캡처에 실패했습니다.');
      }
    }
  };

  const recognizeFace = async (image) => {
    if (!modelsLoaded) {
      console.warn('모델이 아직 완전히 로드되지 않았습니다.');
      return;
    }

    const img = new Image();
    img.src = image;
    img.onload = async () => {
      const inputSize = 256; 
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold: 0.5 });

      try {
        const detections = await faceapi
          .detectAllFaces(img, options)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, {
          width: img.width,
          height: img.height,
        });

        if (resizedDetections.length > 0) {
          const faceBox = resizedDetections[0].detection.box;
          const guideCenter = {
            x: img.width / 2 - guideSize / 2,
            y: img.height / 2 - guideSize / 2,
          };

         
          if (
            faceBox.x >= guideCenter.x &&
            faceBox.y >= guideCenter.y &&
            faceBox.x + faceBox.width <= guideCenter.x + guideSize &&
            faceBox.y + faceBox.height <= guideCenter.y + guideSize
          ) {
            cropFace(image, faceBox);
          } else {
            console.warn('얼굴이 가이드라인 내에 있지 않습니다.');
            resetToCaptureScreen();
          }
        } else {
          console.warn('얼굴이 감지되지 않았습니다.');
          resetToCaptureScreen();
        }
      } catch (error) {
        console.error('얼굴 인식 중 오류 발생:', error);
        resetToCaptureScreen();
      }
    };
  };

  const cropFace = (image, box) => {
    const img = new Image();
    img.src = image;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      
      canvas.width = box.width;
      canvas.height = box.height;
      
      context.drawImage(
        img,
        box.x,
        box.y,
        box.width,
        box.height,
        0,
        0,
        box.width,
        box.height
      );
      
      const croppedImageUrl = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedImageUrl); 
    };
  };

  const resetToCaptureScreen = () => {
    setImageSrc(null);
    setCroppedImage(null);
    setCapturing(false);
  };

  const retakePhoto = () => {
    resetToCaptureScreen();
  };

  const goToAnalysisResult = async () => {
    if (croppedImage) {
      try {
        const id = parseInt(localStorage.getItem('id')) + 1;
        localStorage.setItem('id', id.toString());

        const formData = new FormData();
        const blob = await fetch(croppedImage).then((res) => res.blob());
        formData.append('image', blob, 'captured_image.jpg');

        await axios.post(`user/image/save/${id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log('이미지가 성공적으로 전송되었습니다. ID:', id);

        navigate('/analysisresult', { state: { image: croppedImage } });
      } catch (error) {
        console.error('이미지 전송 오류:', error);
        navigate('/analysisresult', { state: { image: croppedImage } });
      }
    }
  };

  return (
    <div className="vh-100 vw-100 position-relative d-flex justify-content-center align-items-center">
      {loading ? (
        <Spinner animation="border" variant="primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : croppedImage ? (
        <div className="text-center">
          <h1 className="position-fixed start-50 translate-middle-x" style={{ top: '10%', fontWeight: 'bold', fontSize: '2.5rem', zIndex: 10 }}>
            촬영 사진
          </h1>
          <img
            src={croppedImage}
            alt="인식된 얼굴 이미지"
            className="img-fluid"
            style={{ marginTop: '100px', width: '650px', height: '650px' }}
          />
          <div className="mt-3">
          <p style={{ fontSize: '2rem', marginTop: '50px', color: 'skyblue', fontWeight: 'bold' }}>
              얼굴이 흔들렸거나 다시 찍고 싶다면 재촬영 버튼을 눌러주세요.
            </p>
            <Button variant="secondary" className="me-2" style={{ fontSize: '1.5rem', marginTop: '50px' }} onClick={retakePhoto}>다시 찍기</Button>
            <Button variant="primary" style={{ fontSize: '1.5rem', marginTop: '50px' }} onClick={goToAnalysisResult}>분석 결과 보기</Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="position-fixed start-50 translate-middle-x" style={{ top: '10%', color: 'white', fontWeight: 'bold', fontSize: '2.5rem', zIndex: 10 }}>
            사진 촬영
          </h1>
          <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" style={{ width: '100vw', height: '100vh', objectFit: 'cover' }} />
          
          
          <div
            className="position-absolute"
            style={{
              border: '3px solid white',
              width: `${guideSize}px`,
              height: `${guideSize}px`,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          ></div>

          {countdown !== null && (
            <h2 className="position-absolute top-50 start-50 translate-middle text-danger" style={{ fontSize: '4rem', fontWeight: 'bold' }}>
              {countdown}
            </h2>
          )}
           <p style={{ fontSize: '2rem', marginTop: '20px',  marginBottom: '50px',color: 'skyblue', fontWeight: 'bold', position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)', textAlign: 'center', zIndex: 10 }}>
            가이드라인에 얼굴을 맞추고 정면을 바라봐주세요.
          </p>
          
          <Button
            className="position-absolute bottom-0 mb-5 start-50 translate-middle-x"
            style={{ backgroundColor: 'purple', borderColor: 'purple', fontSize: '1.5rem' }}
            size="lg"
            onClick={startCapture}
            disabled={capturing || imageSrc || !modelsLoaded}
          >
            {capturing ? '촬영 준비 중...' : '사진 촬영 시작'}
          </Button>
        </>
      )}
    </div>
  );
};

export default SectionCameraCapture;