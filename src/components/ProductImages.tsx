import React, { useState } from "react";
import styled from "styled-components";
import { Image } from "../context/products_context";
import Loading from "./Loading";

interface ProductImagesProps {
  images: Image[];
}

const ProductImages = ({ images }: ProductImagesProps) => {
  const defaultImage = !images || images.length === 0 ? { url: "" } : images[0];
  const [main, setMain] = useState(defaultImage);
  if (images && images.length > 0) {
    return (
      <Wrapper>
        <img src={main.url} alt="main" className="main" />
        <div className="gallery">
          {images.map((image, index) => {
            return (
              <img
                src={image.url}
                alt={image.filename}
                key={index}
                onClick={() => setMain(images[index])}
                className={`${image.url === main.url ? "active" : null}`}
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
