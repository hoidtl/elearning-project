import { useState, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Dữ liệu slides
  const slides = [
    {
      id: 1,
      title: 'Rất nhiều lợi ích',
      description: 'Thăng tiến sự nghiệp với những kỹ năng mới. Khám phá các khóa học từ ₫219,000 đến ₫2,779,000',
      buttonText: 'Khám phá ngay',
      buttonLink: '/products',
      bgColor: '#a8dadc',
      image: '/images/slidebar1.jpg',
    },
    {
      id: 2,
      title: 'Học tập không giới hạn',
      description: 'Truy cập hơn 10,000 khóa học chất lượng cao từ các chuyên gia hàng đầu',
      buttonText: 'Bắt đầu học',
      buttonLink: '/products',
      bgColor: '#f1faee',
      image: '/images/slidebar2.jpg',
    },
    {
      id: 3,
      title: 'Nâng cao kỹ năng',
      description: 'Đầu tư vào bản thân với các khóa học được đánh giá cao nhất',
      buttonText: 'Xem khóa học',
      buttonLink: '/products',
      bgColor: '#e9c46a',
      image: null, // Chưa có ảnh slide 3
    },
  ];

  // Auto slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="hero-slider">
      <div className="slider-container">
        {/* Slides */}
        <div 
          className="slides-wrapper"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="slide"
              style={{ backgroundColor: slide.bgColor }}
            >
              <div className="container">
                <div className="slide-content">
                  <div className="slide-text">
                    <h1>{slide.title}</h1>
                    <p>{slide.description}</p>
                    <Link to={slide.buttonLink} className="slide-btn">
                      {slide.buttonText}
                    </Link>
                  </div>
                  <div className="slide-image">
                    {slide.image ? (
                      <img src={slide.image} alt={slide.title} />
                    ) : (
                      <div className="image-placeholder">
                        <span>🎓</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="slider-arrow slider-arrow-left" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <FiChevronLeft size={24} />
        </button>
        <button 
          className="slider-arrow slider-arrow-right" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
