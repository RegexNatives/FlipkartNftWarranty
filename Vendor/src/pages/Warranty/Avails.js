import React, { useContext,useEffect,useState } from "react";
import { BasicContext } from "../../context/BasicContext";
import { useNavigate } from "react-router-dom";
import * as animationData2 from "../../animation/empty.json";
import Lottie from "react-lottie";
import Button from "../../component/Button";
import { useDispatch,useSelector } from "react-redux";
import { getAllAvailRequests } from "../../actions/avail.actions";

const Avails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { allAvailRequests } = useSelector(state => state.warranty);
  const [ allAvails, setAvails] = useState([]);
  const defaultOptions2 = {
    loop: true,

    autoplay: true,
    animationData: animationData2,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    setAvails(allAvailRequests);
  }, [allAvailRequests]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getProducts = async () => {
        dispatch(getAllAvailRequests())
      }
      getProducts();
    }
    return () => {
      mounted = false;
    }
  },[])


  return (
    <>
      <div className="admin-page">
        <div className="admin-page-container">
          <h1>
            Claimed Warranties 
          </h1>
          <div className="admin-all-products-wrap">
            <div className="admin-all-products-list">
              {allAvails?.length > 0 ? (
                allAvails?.map((ord) => (
                  <div className="admin-product">
                    <div className="admin-product-wrap">
                      <div className="admin-product-inner">
                        <div className="details-and-button">
                        <div className="admin-product-details">
                          <h1>{ord?.warrantyName}</h1>
                          <p>
                            Buyer : <span> {ord?.buyerName}</span>{" "}
                          </p>
                          <p>
                            Status : <span> {ord?.status}</span>{" "}
                          </p>
                          <p>
                            Email : <span>{ord?.email}</span>{" "}
                          </p>
                          <p>
                            Phone : <span>{ord?.phone}</span>{" "}
                          </p>
                           
                        </div>
                        <div className="admin-product-btn">
                          <Button 
                            onClickFunction = {()=>{navigate(`/warranties/${ord?.token}`)}}
                            text={"Grant "}
                          />
                        </div>
  
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ):(
                <>
                <div className="no-orders-found-lottie">
                      <Lottie options={defaultOptions2} />
                      </div>
                </>
                )}
              {/* ))} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Avails;
