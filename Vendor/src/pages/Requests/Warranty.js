import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { getAllWarrantyRequests } from "../../actions/warranty.actions";
import User from "../../img/user-icon.svg";

const Warranty = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allWarrantyRequests } = useSelector((state) => state.warranty);
  const [product, setProduct] = useState(null);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    let mounted = true;

    const getRequests = async () => {
      if (mounted) {
        let current = allWarrantyRequests?.find((item) => item?._id == id);
        console.log(current);
        setProduct(current);
        setRequests(current?.requests);
      }
    };
    getRequests();
    return () => {
      mounted = false;
    };
  }, [id]);

  useEffect(() => {
    let mounted = true;

    const getRequests = async () => {
      if (mounted && allWarrantyRequests.length == 0) {
        dispatch(getAllWarrantyRequests());
      }
    };
    getRequests();
    return () => {
      mounted = false;
    };
  }, [allWarrantyRequests]);
  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <div className="warranty-page-all-warranty">
            <div className="warranty-page-all-warranty-header">
              <div className="warranty-page-all-warranty-header-text">
                <h3>Requested Warranties</h3>
                <svg
                  width="13"
                  height="15"
                  viewBox="0 0 13 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.16227 14.3664C0.892162 14.3664 0.641343 14.2506 0.409817 14.0191C0.197586 13.7683 0.0914702 13.5078 0.0914702 13.2377C0.0914702 13.0255 0.139705 12.8518 0.236174 12.7168C0.351936 12.5817 0.52558 12.4467 0.757105 12.3116L10.9732 6.63924L11.06 8.14416L0.699224 2.21132C0.52558 2.09556 0.390524 1.97015 0.294055 1.83509C0.197586 1.68074 0.149352 1.49745 0.149352 1.28522C0.149352 0.97652 0.255467 0.706407 0.467699 0.474882C0.699224 0.243357 0.940396 0.137242 1.19122 0.156535C1.34557 0.156535 1.49992 0.195123 1.65427 0.272298C1.80862 0.349473 1.97261 0.436295 2.14626 0.532764L12.0729 6.20513C12.2851 6.3209 12.4491 6.47525 12.5649 6.66818C12.7 6.86112 12.7675 7.07335 12.7675 7.30488C12.7675 7.5557 12.7192 7.77758 12.6228 7.97051C12.5263 8.14416 12.3623 8.29851 12.1308 8.43356L2.08838 14.0481C1.93403 14.1252 1.77968 14.2024 1.62533 14.2796C1.47098 14.3375 1.31662 14.3664 1.16227 14.3664Z"
                    fill="black"
                  />
                </svg>
                <p>{product?.name}</p>
              </div>
              <div className="warranty-page-details">
                <img src={product?.image} alt="product" />
                <div className="warranty-page-details-text">
                  <h2>{product?.name}</h2>
                  <p>{product?.description}</p>
                </div>
                {/* <div className="warranty-page-details-price">
              <p>{product?.price}</p>
          </div> */}
              </div>
            </div>
            <div className="warranty-page-all-warranty-search">
              <div className="warranty-page-all-warranty-search-text">
                <p>Requested Warranties by users</p>
              </div>
              <div className="warranty-page-all-warranty-search-feild">
                <input type="text" placeholder="Search" />
              </div>
              <svg
                width="31"
                height="31"
                viewBox="0 0 31 31"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_672_1862)">
                  <path
                    d="M11.2922 24.1515C10.7004 24.7433 9.68856 24.3242 9.68856 23.4873V2.87689C9.68856 2.35808 9.26798 1.9375 8.74917 1.9375H8.69046C8.17164 1.9375 7.75106 2.35808 7.75106 2.87689V23.4873C7.75106 24.3242 6.7392 24.7433 6.14742 24.1515L4.58875 22.5929C4.2219 22.226 3.6271 22.226 3.26025 22.5929L3.21894 22.6342C2.85208 23.001 2.85208 23.5958 3.21894 23.9627L8.03491 28.7787C8.21657 28.9603 8.46294 29.0623 8.71981 29.0623C8.97669 29.0623 9.22305 28.9603 9.40472 28.7787L14.2207 23.9627C14.5875 23.5958 14.5875 23.001 14.2207 22.6342L14.1794 22.5929C13.8125 22.226 13.2177 22.226 12.8509 22.5929L11.2922 24.1515ZM27.7832 8.36581C28.15 7.99896 28.15 7.40417 27.7832 7.03731L22.9672 2.22134C22.7856 2.03973 22.5392 1.93771 22.2823 1.93771C22.0254 1.93771 21.7791 2.03973 21.5974 2.22134L16.7814 7.03731C16.4146 7.40417 16.4146 7.99896 16.7814 8.36581L16.8227 8.40712C17.1896 8.77398 17.7844 8.77398 18.1513 8.40712L19.7099 6.84846C20.3017 6.25667 21.3136 6.6758 21.3136 7.51271V28.1231C21.3136 28.6419 21.7341 29.0625 22.253 29.0625H22.3117C22.8305 29.0625 23.2511 28.6419 23.2511 28.1231V7.51271C23.2511 6.6758 24.2629 6.25667 24.8547 6.84846L26.4134 8.40712C26.7802 8.77398 27.375 8.77398 27.7419 8.40712L27.7832 8.36581Z"
                    fill="#383838"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_672_1862">
                    <rect width="31" height="31" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>
        <div className="admin-all-products-list">
              <div className="all-requests-container">
              {requests?.length > 0 ? (
                requests?.map((item,idx) => (
                  <div className="request-single" key={idx} >
                      <div className="request-card">
                        <img src={User} />
                        <h3>{item?.buyerName}</h3>
                        <p>{item?.email}</p>
                        <p>{item?.phone}</p>
                        <div className="mynft-logout-btn" onClick={()=>{navigate(`/order/${item?.orderId}`)}}>
                            <button className="primary">Open</button>
                        </div>
                      </div>
                  </div>
                ))
              ):('No Warranty Requests Found!')}
    
              </div>
            </div>
        </div>
        {/* <div className="admin-page-container">
          <h1>
            Warranty Requests
          </h1>
          <div className="product-info">
            <div className="image-container">
                <img className='product-img' src={product?.image} />
            </div>
            <div className="description">
                <h3>{product?.name}</h3>
                <p>{product?.description}</p>
            </div>
            <div className="price">
                <p>{product?.price}</p>
            </div>
          </div>
          <div className="admin-all-products-wrap">
            <div className="admin-all-products-list">
              <div className="all-requests-container">
              {requests?.length > 0 ? (
                requests?.map((item,idx) => (
                  <div className="request-single" key={idx} >
                      <div className="request-card">
                        <img src={User} />
                        <h3>{item?.buyerName}</h3>
                        <p>{item?.email}</p>
                        <p>{item?.phone}</p>
                        <div className="mynft-logout-btn" onClick={()=>{navigate(`/order/${item?.orderId}`)}}>
                            <button className="primary">Open</button>
                        </div>
                      </div>
                  </div>
                ))
              ):('No Warranty Requests Found!')}
    
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Warranty;
