import React,{useState} from 'react'
import Iphone from "../img/iphone.svg"
import Color from "../img/color.svg";
import Edit from "../img/edit.svg";
const AdminOrderDetails = () => {
  if (window.location.pathname === "/adminorderdetails") {
    document.body.style.backgroundColor = "#F9F8FF";
  }
  const [sideLink, setsideLink] = useState(0)
  return (
    <div className="admin-page">
    <div className="admin-sidebar">
        <div className="admin-sidebar-list">
            <ul>
                <li onClick={()=>{setsideLink(1)}} className={sideLink===1?"active-sidelink":null}  >Dashboard</li>
                <li  onClick={()=>{setsideLink(2)}} className={sideLink===2?"active-sidelink":null} >Dashboard</li>
                <li  onClick={()=>{setsideLink(3)}} className={sideLink===3?"active-sidelink":null} >All-products</li>
                <li  onClick={()=>{setsideLink(4)}} className={sideLink===4?"active-sidelink":null} >Dashboard</li>
                <li  onClick={()=>{setsideLink(5)}} className={sideLink===5?"active-sidelink":null} >Dashboard</li>
                <li  onClick={()=>{setsideLink(6)}} className={sideLink===6?"active-sidelink":null} >Settings</li>

            </ul>
        </div>
    </div>
      <div className="admin-product-open-page">
        <h1>All-products &gt; Iphone</h1>
        <div className="admin-product-open-order-list">
          <div className="admin-product-open-order-wrap">
            <div className="admin-product-open-order-inner">
                <div className="admin-product-open-order-img">
                    <img src={Iphone} alt="" />
                    <div className="color-order-open">
                      <h1>Colour</h1>
                      <img src={Color} alt="" />
                    </div>
                </div>
                <div className="admin-product-open-order-details">
                  <div className="order-status-open-order">
                      <p>Order Status : </p>
                      <select name="" id="">
                        
                        <option value="">Processing</option>
                        <option value=""> Shiped</option>
                        <option value="">Delivered</option>
                      </select>
                      <img src={Edit} alt="" />
                  </div>
                  <p>Customer Address : <span> 16 Rajpur Road, DehraDun India</span></p>
                  <p>Wallet Address : <span> 0xDF0A39EF6593F3A3b9a05404Ade53Fd1c78188d2</span></p>
                  <p>Product ID : <span> 62dd5d9c23ed77d3be77e849</span></p>
                  <p>Customer Name : <span> Vansh Patpatia</span></p>
                  <p>Phone Number : <span> 7037484499</span></p>
                  <p>email : <span> vansh10patpatia@gmail.com </span></p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminOrderDetails