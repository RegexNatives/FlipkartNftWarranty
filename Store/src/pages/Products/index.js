import React, { useState, useEffect, useContext } from "react";
import Rect2 from "../../img/rect2.svg";
import Rect from "../../img/rect.svg";
import { Link, useNavigate } from "react-router-dom";
// import { products } from "../constants/products";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../actions/products.actions";
import { useDispatch } from "react-redux";
import Button from "../../component/Button";

const Products = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const { products } = useSelector((state) => state.products);


  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getProducts = async () => {
        dispatch(getAllProducts())
      }
      getProducts();
    }

    return () => {
      mounted = false;
    }
  },[])



  return (
    <div >
      <div className="all-orders-page">
        <h1>Products we think you’d like</h1>
        <div className="products-container">
          {/* {products?.map((product,index) => (
            <div key={index}>
              <div className="new-product" >
                <img src={Rect} alt="" />
                <img className="rect2" src={Rect2} alt="" />
                <div className="product-img">
                  <img src={product.image} alt="" />
                </div>
                <div className="new-product-inner">
                  <div className="new-product-inner-layer">
                    <div className="product-text">
                      <p>{product.name}</p>
                      <div className="price-product">
                        <p>
                          Price <span>{product.price}</span>
                        </p>
                      </div>
                      <Button
                        onClickFunction={()=> navigate(`/products/${product?._id}`)}
                        text={'Buy Now'}
                      />
                    </div>
                  </div>
                </div>
                <div className="new-product-background"></div>
              </div>
            </div>
          ))} */}



          {products?.map((product,index) => (
            <div key={index}>
              <div className="new-product-card" >
                <div className="new-product-price">
                  <p>₹{product.price}</p>
                </div>
                <div className="new-product-card-img">
                  <img src={product.image} alt="" />
                </div>
                <div className="product-details-card">
                <div className="new-productcard-details">
                  
                  <p>{product.name}</p>
                </div>
                <div className="new-productcard-button">
                      <Button
                        onClickFunction={()=> navigate(`/products/${product?._id}`)}
                        text={'Buy Now'}
                      />
                  </div>
                  </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Products;
