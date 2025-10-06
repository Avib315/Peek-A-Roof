import React, { useState, useEffect } from 'react';
import img1 from "../../assets/images/roofs1.jpeg";
import img2 from "../../assets/images/roofs2.jpeg";
import img3 from "../../assets/images/roofs3.jpeg";
import img4 from "../../assets/images/roofs4.jpeg";
import img5 from "../../assets/images/roofs5.jpeg";
import img6 from "../../assets/images/roofs6.jpeg";
import img7 from "../../assets/images/roofs7.jpeg";
import img8 from "../../assets/images/roofs8.jpeg";
import img9 from "../../assets/images/roofs9.jpeg";
import img10 from "../../assets/images/roofs10.jpeg";
import img11 from "../../assets/images/roofs11.jpeg";
import "./style.scss";

interface Props {
  columns?: number;
  showLightbox?: boolean;
}

interface ImageData {
  src: string;
  alt: string;
  id: number;
}

const ImagesBrowser: React.FC<Props> = ({ columns = 3, showLightbox = true }) => {
  const [selectedImage, setSelectedImage] = useState<ImageData | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Images array
  const images: ImageData[] = [
    { src: img1, alt: "Roof inspection 1", id: 1 },
    { src: img2, alt: "Roof inspection 2", id: 2 },
    { src: img3, alt: "Roof inspection 3", id: 3 },
    { src: img4, alt: "Roof inspection 4", id: 4 },
    { src: img5, alt: "Roof inspection 5", id: 5 },
    { src: img6, alt: "Roof inspection 6", id: 6 },
    { src: img7, alt: "Roof inspection 7", id: 7 },
    { src: img8, alt: "Roof inspection 8", id: 8 },
    { src: img9, alt: "Roof inspection 9", id: 9 },
    { src: img10, alt: "Roof inspection 10", id: 10 },
    { src: img11, alt: "Roof inspection 11", id: 11 },
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          }
        });
      },
      { threshold: 0.1 }
    );

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  // Handle image click
  const handleImageClick = (image: ImageData) => {
    if (showLightbox) {
      setSelectedImage(image);
      setIsVisible(true);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsVisible(false);
    setTimeout(() => {
      setSelectedImage(null);
      document.body.style.overflow = 'auto';
    }, 300);
  };

  // Navigate between images in lightbox
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedImage) return;

    const currentIndex = images.findIndex((img) => img.id === selectedImage.id);
    let newIndex: number;

    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    }

    setSelectedImage(images[newIndex]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') navigateImage('prev');
      if (e.key === 'ArrowRight') navigateImage('next');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <>
      <div className={`images-browser columns-${columns}`}>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="gallery-item"
              // onClick={() => handleImageClick(image)}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="image-wrapper">
                <img src={image.src} alt={image.alt} loading="lazy" />
                <div className="image-overlay">
                  <span className="zoom-icon">🔍</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className={`lightbox ${isVisible ? 'visible' : ''}`} onClick={closeLightbox}>
          <button className="lightbox-close" onClick={closeLightbox} aria-label="Close">
            ✕
          </button>

          <button
            className="lightbox-nav lightbox-prev"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('prev');
            }}
            aria-label="Previous image"
          >
            ‹
          </button>

          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage.src} alt={selectedImage.alt} />
          </div>

          <button
            className="lightbox-nav lightbox-next"
            onClick={(e) => {
              e.stopPropagation();
              navigateImage('next');
            }}
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
};

export default ImagesBrowser;