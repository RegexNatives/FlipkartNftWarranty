import React, { useState, useEffect, useRef } from "react";
import Globe from "vanta/dist/vanta.globe.min";
import Cards from "../img/cards.svg";
import PhoneCards from "../img/landing-phone-cards.svg";
import Nft1 from "../img/nft1.svg";
import Nft2 from "../img/nft2.svg";
import { useNavigate } from "react-router";
import Navbar from "../component/Navbar";
import Button from "../component/Button";
// import Cards from "."

const Home = () => {
  const navigate = useNavigate();
  const [vantaEffect, setVantaEffect] = useState(0);
  const myRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        Globe({
          el: myRef.current,
          mouseControls: true,
          touchControls: true,
          minHeight: 200.0,
          Height: 100.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          color: 0x0,
          color2: 0x0,
          backgroundColor: 0xF9F8FF,
          size: 1.3,
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div style={{ backgroundColor: "#F9F8FF" }}>
      <div ref={myRef} style={{ height: "100vh", minHeight: "700px" }}>
      <div className="navbar">
          <div className="nav-logo" onClick={()=>navigate('/')}>
            <svg
              width="71"
              height="32"
              viewBox="0 0 71 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 0H13.248C16.896 0 19.776 0.288 21.888 0.864C24 1.408 25.552 2.368 26.544 3.744C27.536 5.12 28.032 7.024 28.032 9.456V22.128C28.032 24.496 27.568 26.336 26.64 27.648C25.712 28.928 24.192 29.84 22.08 30.384C19.968 30.896 17.04 31.152 13.296 31.152H0V0ZM12.96 25.824C15.008 25.824 16.544 25.744 17.568 25.584C18.624 25.392 19.376 25.04 19.824 24.528C20.304 24.016 20.544 23.216 20.544 22.128V9.312C20.544 7.84 19.952 6.816 18.768 6.24C17.616 5.632 15.76 5.328 13.2 5.328H7.488V25.824H12.96Z"
                fill="black"
              />
              <path
                d="M34.0781 0H44.7341L52.4141 22.272L59.9981 0H70.0301V31.152H63.2621V8.112H63.1181L55.2461 31.152H49.2461L41.1341 8.112H40.9421V31.152H34.0781V0Z"
                fill="black"
              />
            </svg>
          </div>
        </div>
        <div className="landing-page-1">
          <div className="landing-page-text">
            <h1>
              A NFT Based <br />
              Web Store
            </h1>
            <p>
              Ensure the authenticity of your products with NFT-based warranty
              cards.
            </p>
          </div>
          <Button
            text={'Go to Store'}
            onClickFunction={() => navigate("/products")}
          />
        </div>
      </div>
      <div className="landing-2-section">
        <div className="landing-2-section-text">
          <p>NFT Warranty System</p>
          <h1>
            We Provide An <span>NFT</span> Warranty To Your Products
          </h1>
        </div>
        <div className="landnig-2-cards-img">
          <img style={{transform:"scale(1.08)"}} src={Cards} alt="" />
        </div>
        <div className="landnig-2-cards-img-phone">
          <img src={PhoneCards} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
