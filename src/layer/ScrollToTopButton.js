import React, { useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import styled from 'styled-components';

const ScrollToTopButtonWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 10px;
  background-color: ${props => props.isVisible ? '#6e6e72' : 'transparent'};
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${props => props.isVisible ? '#0056b3' : 'transparent'};
  }
`;

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <ScrollToTopButtonWrapper isVisible={isVisible} onClick={scrollToTop}>
            <FaArrowUp />
        </ScrollToTopButtonWrapper>
    );
}

export default ScrollToTopButton;
