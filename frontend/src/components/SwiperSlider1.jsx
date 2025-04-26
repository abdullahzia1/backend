import React from "react";
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
import banner4 from '../assets/images/banner4.png';


const SwiperSlider1 = () => {
  return (
    <>
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 my-auto animate-from-top">
            <p style={{ fontSize: '70px', fontWeight: '900', color: '#000', textAlign: 'start', marginTop: '30px'}}>Flash Sale</p>
            <p style={{ fontSize: '35px', fontWeight: '300', color: '#ffff', textAlign: 'center', border: '1px Solid black', background: 'black', display: 'inline-block', padding: '0px 20px'}}>New Gadget Collection</p>
            <p style={{ fontSize: '20px', fontWeight: '300', color: '#000', textAlign: 'start'}}>An exciting place for the whole family! to shop.</p>
            <button style={{ fontSize: '35px', fontWeight: '300', color: '#ffff', textAlign: 'center', border: '1px Solid black', background: 'black', borderRadius: '200px', margin: '20px 0px', padding: '10px 30px'}}>Shop Now</button>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12  animate-from-bottom">
            <img src={banner1} alt="" style={{ objectFit: 'cover'}}/>
          </div>
        </div>
      </div>
    </>
  );
};

export default SwiperSlider1;
