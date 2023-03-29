import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import { Loading, Error, AddToCart, Stars, PageHero } from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { HomeRoute } from "../App";
import ZoomedImagesPopup from "../components/ZoomedImagesPopup";

const SingleProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    singleProductLoading: loading,
    singleProductError: error,
    singleProduct: product,
    fetchSingleProduct,
  } = useProductsContext();
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
  }, [id]);
  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error]);
  const [mainIndex, setMainIndex] = useState(0);
  const [showZoomedImages, setShowZoomedImages] = useState(false);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  if (product && product.images && product.images.length > 0) {
    const {
      name,
      price,
      description,
      stock,
      stars,
      reviews,
      id: sku,
      company,
      images,
    } = product;

    if (showZoomedImages) {
      return (
        <ZoomedImagesPopup
          images={images}
          hide={() => setShowZoomedImages(false)}
          title={name}
          mainImageIndex={mainIndex}
        />
      );
    }

    return (
      <HomeRoute>
        <Wrapper>
          <PageHero title={name} product />
          <div className="section section-center page">
            <Link to="/products" className="custom-btn">
              back to products
            </Link>
            <div className="product-center">
              <ProductImages>
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
              </ProductImages>

              <section className="content">
                <h2>{name}</h2>
                <Stars stars={stars} reviews={reviews} />
                <h5 className="price">{formatPrice(price)}</h5>
                <p className="desc">{description}</p>
                <p className="info">
                  <span>Available : </span>
                  {stock > 0 ? "In stock" : "Out of stock"}
                </p>
                <p className="info">
                  <span>SKU : </span>
                  {sku}
                </p>
                <p className="info">
                  <span>Brand : </span>
                  {company}
                </p>
                <hr />
                {stock > 0 && <AddToCart product={product} />}
              </section>
            </div>
          </div>
        </Wrapper>
      </HomeRoute>
    );
  }
  return <div className="section-centered">Product not found</div>;
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

const ProductImages = styled.section`
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

export default SingleProductPage;
