import React, { useContext,useEffect,useState } from "react";
import { BasicContext } from "../../context/BasicContext";
import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import RequestImg from "../../img/requestimg.svg";
import WatchesImg from "../../img/watches.svg";
import PhonesImg from "../../img/phones.svg";
import { useDispatch,useSelector } from "react-redux";
import { getAllWarrantyRequests } from "../../actions/warranty.actions";

const Warranties = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { allWarrantyRequests } = useSelector(state => state.warranty);
  const [ allWarranty, setWarranties] = useState([]);

  useEffect(() => {
    setWarranties(allWarrantyRequests);
  }, [allWarrantyRequests]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getProducts = async () => {
        dispatch(getAllWarrantyRequests())
      }
      getProducts();
    }
    return () => {
      mounted = false;
    }
  },[])

  // console.log(allWarranty)


  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <h1>
          Requested Warranties
          </h1>
          <div className="warranty-page-header-img-cont">

          <div className="warranty-page-header-img">
            <img src={RequestImg} alt="" />
          </div>
          </div>
          <div className="warranty-page-cards">
          {allWarranty?.length > 0 ? (
                allWarranty?.map((item,idx) => (
                  // <div className="request-single" key={idx} onClick={()=>navigate(`/warranty-requests/${item?._id}`)}>
                  //     <div className="request-card">
                  //       <span className="number-badge">{item?.requests?.length}</span>
                  //       <p>Warranty : {item?.warrantyPeriod} Days</p>
                  //       <h3>{item?.name}</h3>
                  //       <a>View all</a>
                  //       <br />
                  //       <img className="request-img" src={item?.image} />
                  //     </div>
                  // </div>
                  <div className="request-card" key={idx} onClick={()=>navigate(`/warranty-requests/${item?._id}`)}>
                    <div className="request-ward-details">
                      <span>{item?.requests?.length}</span>
                      {/* category */}
                      <p>WARRANTY : {item?.warrantyPeriod} Days</p>
                      <h3>{item?.name}</h3>
                      <a>View all</a>
                      {item.category==="Watch" ?(<img src={WatchesImg}/>):null}
                      {item.category==="Phone" ?(<img src={PhonesImg}/>):null}
                      {item.category==="Laptop" ?(<img src={PhonesImg}/>):null}
                    </div>
                  </div>
                ))
              ):('No Warranty Requests Found!')}
              {/* ))} */}
          </div>
          {/* <div className="admin-all-products-wrap">
            <div className="admin-all-products-list">
              <div className="all-requests-container">
              {allWarranty?.length > 0 ? (
                allWarranty?.map((item,idx) => (
                  <div className="request-single" key={idx} onClick={()=>navigate(`/warranty-requests/${item?._id}`)}>
                      <div className="request-card">
                        <span className="number-badge">{item?.requests?.length}</span>
                        <p>Warranty : {item?.warrantyPeriod} Days</p>
                        <h3>{item?.name}</h3>
                        <a>View all</a>
                        <br />
                        <img className="request-img" src={item?.image} />
                      </div>
                  </div>
                ))
              ):('No Warranty Requests Found!')}
            
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Warranties;
