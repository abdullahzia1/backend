import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBox from './SearchBox';
import logo from '../assets/logo.png';
import { resetCart } from '../slices/cartSlice';

const Header = () => {
  // Redux state and dispatch setup
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout API call using RTK Query
  const [logoutApiCall] = useLogoutMutation();

  // Logout handler
  const logoutHandler = async () => {
    try {
      // Perform logout API call
      await logoutApiCall().unwrap();
      // Dispatch logout action and reset cart state
      dispatch(logout());
      dispatch(resetCart());
      // Navigate to the login page
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <header>
      {/* Bootstrap Navbar */}
      <Navbar variant='light' expand='lg' collapseOnSelect style={{ background: '#ffffff', color: '#0000', width: '100%', minHeight: "5vh", margin: '0'}}>
        <Container style={{ margin:"auto"}}>
          {/* Brand/logo with link to home */}
          <LinkContainer to='/' style={{  }}>
            <Navbar.Brand  > 
              <img src={logo} alt='CheezBaich' style={{ width: '60px' }}/>
              {/* <p style={{ fontSize: "13px", fontWeight: '800'}}>CHEEZ BAICH</p>  */}
            </Navbar.Brand>
          </LinkContainer>
          
          {/* Navbar toggle button */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />

          {/* Navbar content */}
          <Navbar.Collapse id='basic-navbar-nav' className='lg-d-flex justify-content-between'>
            {/* Search Box Component */}
            <SearchBox style={{  }}/>

            {/* Navigation links */}
            <Nav>
              {/* Cart link with shopping cart icon and item count badge */}
              <LinkContainer to='/cart' style={{ color: '#000000' }}>
                <Nav.Link >
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge pill bg='success' style={{ marginLeft: '5px', color: '#000000' }}>
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {/* User authentication links */}
              {userInfo ? (
                // If user is authenticated
                <>
                  {/* Dropdown menu for user actions */}
                  <NavDropdown title={userInfo.name} id='username' style={{ color: '#000000' }}>
                    <LinkContainer to='/profile' style={{ color: '#000000' }}>
                      <NavDropdown.Item >Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler} style={{ color: '#000000' }}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                // If user is not authenticated
                <LinkContainer to='/login' style={{ color: '#000000' }}>
                  <Nav.Link >
                    <FaUser style={{ color: '#000000' }}/> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}

              {/* Admin links */}
              {userInfo && userInfo.isAdmin && (
                // If user is an admin
                <NavDropdown title='Admin' id='adminmenu' style={{ color: '#000000' }}> 
                  <LinkContainer to='/admin/productlist' style={{ color: '#000000' }}>
                    <NavDropdown.Item style={{ color: '#000000' }}>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist' style={{ color: '#000000' }}>
                    <NavDropdown.Item style={{ color: '#000000' }}>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/userlist' style={{ color: '#000000' }}>
                    <NavDropdown.Item style={{ color: '#000000' }}>Users</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
