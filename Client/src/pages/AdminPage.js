import React,{useState} from 'react'
import Hi from "../img/hi.svg";
import Iphone from "../img/iphone.svg"
const AdminPage = () => {
    if (window.location.pathname === "/admin") {
        document.body.style.backgroundColor = "#F9F8FF";
      }
      const [sideLink, setsideLink] = useState(0)
  return (
    <>
    <div className="admin-page">
        <div className="admin-sidebar">
            <div className="admin-sidebar-list">
                <ul>
                    <li onClick={()=>{setsideLink(1)}} className={sideLink===1?"active-sidelink":null}  >Dashboard</li>
                    <li  onClick={()=>{setsideLink(2)}} className={sideLink===2?"active-sidelink":null} >Dashboard</li>
                    <li  onClick={()=>{setsideLink(3)}} className={sideLink===3?"active-sidelink":null} >All-products</li>
                    <li  onClick={()=>{setsideLink(4)}} className={sideLink===4?"active-sidelink":null} >Dashboard</li>
                    <li  onClick={()=>{setsideLink(5)}} className={sideLink===5?"active-sidelink":null} >Dashboard</li>

                </ul>
            </div>
        </div>
        <div className="admin-page-container">
            <h1>Welcome Dhairya <img src={Hi} alt="" /> </h1>
            <div className="admin-all-products-wrap">
                <h1>Iphones :</h1>
                <div className="admin-all-products-list">
                        <div className="admin-product">
                            <div className="admin-product-wrap">
                                <div className="admin-product-inner">
                                    <div className="admin-product-img">
                                            <img src={Iphone} alt="" />
                                    </div>
                                    <div className="admin-product-details">
                                        <p>Total sales : <span>$ 23000</span> </p>
                                        <p>Per item : <span>$ 999</span> </p>
                                        <p>Orders placed : <span>54</span> </p>
                                        <p>Status :</p>
                                        <div className="admin-status-product">
                                            <p>Processing : <span>44</span> </p>
                                            <p>Shiped : <span>10</span> </p>
                                            <p>Delivered : <span>24</span> </p>
                                        </div>
                                    </div>
                                    <div className="admin-product-btn">
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
                  <p className="absollute-btn-part"  >Expand</p>
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
                        </div>
                </div>
                <div className="admin-all-products-list">
                        <div className="admin-product">
                            <div className="admin-product-wrap">
                                <div className="admin-product-inner">
                                    <div className="admin-product-img">
                                            <img src={Iphone} alt="" />
                                    </div>
                                    <div className="admin-product-details">
                                        <p>Total sales : <span>$ 23000</span> </p>
                                        <p>Per item : <span>$ 999</span> </p>
                                        <p>Orders placed : <span>54</span> </p>
                                        <p>Status :</p>
                                        <div className="admin-status-product">
                                            <p>Processing : <span>44</span> </p>
                                            <p>Shiped : <span>10</span> </p>
                                            <p>Delivered : <span>24</span> </p>
                                        </div>
                                    </div>
                                    <div className="admin-product-btn">
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
                  <p className="absollute-btn-part"  >Expand</p>
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
                        </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default AdminPage