import axios from "../axios";
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Col, Row } from "react-bootstrap";
import categories from '../categories';
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { updateProducts } from "../features/productSlice";
import ProductPreview from "../components/ProductPreview";

function Home() {
  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
  const lastProducts = products.slice(0, 8)
  useEffect(() => {
    axios.get('/products').then(({ data }) => dispatch(updateProducts(data)) )
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <img src="https://res.cloudinary.com/youngdeveloper/image/upload/v1660479428/ecommerce/Pink_Online_Shopping_Tips_Youtube_Thumbnail_qpbrse.gif" style={{borderRadius: "20px"}} alt="" className="home-banner"/>
      <div classname="featured-products-container container mt-4">
          <h2>Last products</h2>
          {/* last products here */}
          <div className="d-flex justify-content-center flex-wrap">
            {lastProducts.map((product) => (
              <ProductPreview {...product} />
            ))}
          </div>
          <div>
            <Link to="/category/all" style={{textDecoration: "none"}}>See more</Link>
          </div>
      </div>
      {/* sale banner */}
      <div className="sale__banner--container mt-4">
        <img src="https://res.cloudinary.com/youngdeveloper/image/upload/v1660478943/ecommerce/Yellow_Orange_Modern_Marketing_Courses_YouTube_Thumbnail_kcqyfq.gif" style={{borderRadius: "20px"}} alt="" />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) =>(
            <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
            <Col md={4}>
            <div style={{backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px"}} className="category-tile">{category.name}
            </div>
            </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  )
}

export default Home