import React from 'react';
import './App.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import VendorSigninScreen from './screens/VendorSigninScreen';
import VendorRegisterScreen from './screens/VendorRegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';
import logout from './components/Logout';
import { useSelector } from 'react-redux';
function App() {

  const userSignin = useSelector(state=>state.userSignin);
  const { userInfo } = userSignin;
  const openMenu = () => {
    document.querySelector('.sidebar').classList.add('open');
  };
  const closeMenu = () => {
    document.querySelector('.sidebar').classList.remove('open');
  };

  return (
  <BrowserRouter>
    <div id="root">
         <div className="grid-container">
<header className="header">
<div className="brand">
 <button onClick={openMenu}>
   &#9776;
 </button>
<Link to ="/">Vendor Management</Link>
</div>
<div className="header-links">
 <a href="cart.html">Cart</a>
 {
   userInfo ? (<Link to="/profile">{userInfo.name}</Link>) : (<Link to="/signin">Sign In</Link>) 
 }
      {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#">Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/createProduct">Products</Link>
                    <Link to="/logout" class="logout_btn">Logout</Link>
                  </li>
                </ul>
              </div>
            )}
</div>
</header>
<aside className="sidebar">
<h3>Shopping Categories</h3>
<button className="sidebar-close-button" onClick={closeMenu}>x</button>
<ul className="categories">
 <li>
 <Link to="/category/Detugent">Deturgant</Link>
 </li>

 <li>
 <Link to="/category/Soap">Soap</Link>
 </li>
 <li>
 <Link to="/category/oil">Oil</Link>
 </li>
 <li>
 <Link to="/category/paste">ToothPaste</Link>
 </li>

</ul>
</aside>
<main className="main">
<div className="content">
<Route path="/signIn" component={SigninScreen}/>
<Route path="/vendorSignin" component={VendorSigninScreen}/>
<Route path="/products/:id" component={ProductScreen} />
<Route path="/createProduct" component={ProductsScreen} />
<Route path="/" exact={true} component={HomeScreen} />
<Route path="/register" component={RegisterScreen}/>
<Route path="/vendorRegister" component={VendorRegisterScreen}/>
<Route path="/logout" component={logout}/>
<Route path="/cart/:id?" component={CartScreen } />

</div>
</main>
<footer className="footer">
All right reserved.
</footer>
</div>
</div>
</BrowserRouter>
  );
}
export default App;
