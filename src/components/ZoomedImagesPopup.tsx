import React, { useEffect, useRef, useState } from "react";
import { Image } from "../context/products_context";
import styled from "styled-components";
import { FaTimes, FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface ZoomedImagesPopupProps {
  images: Image[];
  hide: () => void;
  title: string;
  mainImageIndex: number;
}
interface MainImage {
  url: string;
}

export default function ZoomedImagesPopup({
  images,
  hide,
  title,
  mainImageIndex,
}: ZoomedImagesPopupProps) {
  const [mainIndex, setMainIndex] = useState(mainImageIndex);

  function scrollRight() {
    setMainIndex((prevIndex) => {
      let newIndex = prevIndex + 1;
      if (newIndex >= images.length) {
        newIndex = 0;
      }
      return newIndex;
    });
  }
  function scrollLeft() {
    setMainIndex((prevIndex) => {
      let newIndex = prevIndex - 1;
      if (newIndex < 0) {
        newIndex = images.length - 1;
      }
      return newIndex;
    });
  }

  useEffect(() => {
    function keypressListener(event: KeyboardEvent) {
      const { key } = event;
      switch (key) {
        case "ArrowLeft":
          scrollLeft();
          break;
        case "ArrowRight":
          scrollRight();
          break;
        case "Escape":
          hide();
          break;
      }
    }
    document.body.addEventListener("keydown", keypressListener);
    return () => {
      document.body.removeEventListener("keydown", keypressListener);
    };
  }, []);

  return (
    <Wrapper>
      <section className="header">
        <h4>{title}</h4>
        <button className="close-btn" type="button" onClick={hide}>
          <FaTimes />
        </button>
      </section>
      <section className="content">
        <button type="button" className="swipe-btn" onClick={scrollLeft}>
          <FaArrowLeft />
        </button>
        <div className="main-image-container">
          <img src={images[mainIndex].url} alt="main" className="main-image" />
        </div>
        <button type="button" className="swipe-btn" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </section>
      <section className="gallery">
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMainIndex(index)}
              className={`${
                image.url === images[mainIndex].url ? "active" : null
              }`}
            />
          );
        })}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  height: 100svh;
  width: 100%;
  background-color: white;
  h4 {
    margin: 0;
  }
  .header {
    display: flex;
    background-color: #f9f9f9;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--clr-grey-10);
    padding: 1rem;
    height: 50px;
  }
  .close-btn {
    display: flex;
    align-items: center;
    font-size: 1rem;
    background: transparent;
    border-color: transparent;
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-grey-3);
  }
  .content {
    display: flex;
    flex-grow: 1;
    height: calc(100svh - 200px);
    .swipe-btn {
      display: flex;
      border-color: transparent;
      background-color: transparent;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      width: 100px;
    }
    .swipe-btn:hover {
      background-color: var(--clr-grey-10);
    }
    .main-image-container {
      flex-shrink: 1;
      flex-grow: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      .main-image {
        flex-shrink: 1;
        height: 100%;
        max-width: 90%;
      }
    }
  }
  .gallery {
    position: relative;
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    padding: 1rem;
    height: 150px;
    img {
      height: 100%;
      width: 150px;
      cursor: pointer;
      flex-shrink: 0;
    }
  }
  img {
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 992px) {
    .content {
      height: calc(100svh - 150px);
      .swipe-btn {
        display: none;
      }
    }
    .header {
      height: 50px;
    }
    .gallery {
      height: 100px;
      padding: 0.5rem;
      img {
        width: 100px;
      }
    }
  }
`;
