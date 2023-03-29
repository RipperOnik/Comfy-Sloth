import React, { useState } from "react";
import styled from "styled-components";
import { Image } from "../context/products_context";
import Loading from "./Loading";
import ZoomedImagesPopup from "./ZoomedImagesPopup";

interface ProductImagesProps {
  images: Image[];
  productName: string;
}

const ProductImages = ({ images, productName }: ProductImagesProps) => {
  const [mainIndex, setMainIndex] = useState(0);
  const [showZoomedImages, setShowZoomedImages] = useState(false);
  if (images && images.length > 0) {
    if (showZoomedImages) {
      return (
        <ZoomedImagesPopup
          images={images}
          hide={() => setShowZoomedImages(false)}
          title={productName}
          mainImageIndex={mainIndex}
        />
      );
    }

    return (
      <Wrapper>
        <img
          src={images[mainIndex].url}
          alt="main"
          className="main"
          onClick={() => setShowZoomedImages(true)}
        />
        <div className="gallery">
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
        </div>
      </Wrapper>
    );
  } else {
    return <Loading />;
  }
};

const Wrapper = styled.section`
  .main {
    height: 600px;
    cursor: zoom-in;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`;

export default ProductImages;
