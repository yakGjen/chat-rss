import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

const Layout = (props) => (
  <>
    <Header log={props.log} closeConnection={props.closeConnection}/>
    {props.children}
    <Footer/>
  </>
);

export default Layout;