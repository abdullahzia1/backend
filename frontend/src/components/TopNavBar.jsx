import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TopNavBar = () => {
  const [alertVisible, setAlertVisible] = useState(true);
  const closeAlert = () => {
    setAlertVisible(false);
  };


  const navigate = useNavigate();


  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);


  return (
    <>
      {alertVisible && (
        <div className="alert alert-dismissible fade show m-0" role="alert" style={{ background: 'black', width: '100%', minHeight: "5vh", boxShadow: 'rgba(0, 0, 0, 0.3) 0px 19px 38px', borderRadius: 'none',   }}>
          <p className='m-0 text-center' style={{ fontWeight: '500', fontSize: '11px', color: 'white' }}>
            Sign up and get <strong style={{ fontWeight: '900', textDecoration: 'underline' }}>20% off</strong> on your first order. <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            <strong style={{ fontWeight: '900', fontSize: '11px', color: 'white', textDecoration: 'underline' }}>Sign Up Now</strong>
          </Link>  
          </p>
          <button type="button" className="btn-close" onClick={closeAlert} aria-label="Close" style={{ color: 'white', opacity: 1, padding: '5px', margin: '0 auto', fontSize: '25px' }}>X</button>
        </div>
      )}
    </>
  );
}

export default TopNavBar;
