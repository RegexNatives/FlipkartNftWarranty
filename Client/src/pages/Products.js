import React, { useState, useEffect, useContext } from "react";
import Rect2 from "../img/rect2.svg";
import Rect from "../img/rect.svg";
import { Link } from "react-router-dom";
// import { products } from "../constants/products";
import { BasicContext } from "../context/BasicContext";
import { getAllProducts } from "../api/products";

const Products = () => {
  const { cart, setCart } = useContext(BasicContext);
  const [products,setProducts] = useState([]);
  const addToCart = (product) => {
    if (cart?.length > 0) {
      let newCart = [...cart];
      let index = newCart.findIndex((item) => item.product.id === product.id);
      if (index > -1) {
        newCart[index].quantity += 1;
      } else {
        newCart.push({
          product,
          quantity: 1,
        });
      }
      setCart(newCart);
    } else {
      setCart([
        {
          product,
          quantity: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    getAllProducts()
      .then((res) => {
        console.log(res);
        setProducts(res.data);
        console.log(products);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finally");
      });
  }, []);

  const checkInCart = (product) => {
    let prod = cart?.find((item) => item.product.id === product.id);
    if (prod) {
      return prod.quantity;
    }
    return 0;
  };
  return (
    <div  >
      
      <div className="all-orders-page">
        <h1>Products we think you’d like</h1>
        <div className="products-container">
          {products?.map((product) => (
            <Link to={`/product/${product.id}`}>
              <div className="new-product">
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
                      <div className="connect-btn">
                        <div className="button-container">
                          <svg
                            width="150"
                            height="49"
                            viewBox="0 0 150 49"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M149 1L5.49848 1L1 8.83333L1 27.2115L1 47.53H6.37607L149 48V1Z"
                              fill="white"
                              stroke="black"
                              stroke-width="0.909721"
                            />
                          </svg>
                        </div>

                        <p
                          className="absollute-btn-part"
                          onClick={() => addToCart(product)}
                        >
                          {checkInCart(product) != 0
                            ? `Add More Item ${checkInCart(product)}`
                            : "Add to Cart"}
                        </p>

                        {/* <button>Connect Wallet</button> */}
                        <div className="absollute-btn-part button-background">
                          <svg
                            width="148"
                            height="47"
                            viewBox="0 0 148 47"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M148 0L4.49848 0L0 7.83333L0 26.2115L0 46.53H5.37607L148 47V0Z"
                              fill="black"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="new-product-background"></div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
