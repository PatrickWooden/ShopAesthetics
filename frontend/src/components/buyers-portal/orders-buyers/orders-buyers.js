/* Created By: Patrick Wooden | 2023-June-19 */
import React, { useState, useEffect } from 'react';
import "../../seller-portal/orders-seller/orders_seller.css";

import { useLocation, NavLink } from "react-router-dom";
import OrderHistoryPage from './orderhistory/order-history';
import TrackOrders from './trackorders/track-orders';
import Favourites from './favourites/favourites';
import RatingAndReviews from './review/ratings-reviews';
import AccountPayments from './payments/payments';
import Cart from './cart/cart';

const OrdersBuyers = () => {
  const [savePageName , setPageName] = useState('#Active');
  const [currentLocation, setCurrentLocation] = useState('#Active');
  const handleLocation = (e) => {
      setCurrentLocation(e);
      setPageName(e);
  }
  return (
      <div className='order-seller-page-main-container'>
          <div className='order-seller-page-section1'>
              
              <br/>
               <nav className="order-seller-page-navbar">
                  <ul className='order-seller-page-nav-list'>
                      <li className={currentLocation === "#order-history" ? "order_seller_page_active_page_navigation" : ""}>
                          <NavLink to="#Order-History" onClick={() => handleLocation("#order-history")}> Order History </NavLink>
                      </li>
                      <li className={currentLocation === "#track-orders" ? "order_seller_page_active_page_navigation" : ""}>
                          <NavLink to="#InActive" onClick={() => handleLocation("#track-orders")}> Track Orders </NavLink>
                      </li>
                      <li className={currentLocation === "#favourites" ? "order_seller_page_active_page_navigation" : ""}>
                          <NavLink to="#Delivered" onClick={() => handleLocation("#favourites")}> Favourites </NavLink>
                      </li>
                      <li className={currentLocation === "#payments" ? "order_seller_page_active_page_navigation" : ""}>
                          <NavLink to="#Canceled" onClick={() => handleLocation("#payments")}> Payments </NavLink>
                      </li>
                      <li className={currentLocation === "#reviews" ? "order_seller_page_active_page_navigation" : ""}>
                          <NavLink to="#Completed" onClick={() => handleLocation("#reviews")}> Reviews </NavLink>
                      </li>
                      <li className={currentLocation === "#cart" ? "order_seller_page_active_page_navigation" : ""}>
                          <NavLink to="#Status" onClick={() => handleLocation("#cart")}> Cart </NavLink>
                      </li>
                     
                  </ul>
              </nav>
          </div>
          {savePageName === "#order-history" ? (
              <div className='order-seller-page-section2'>
                  <OrderHistoryPage/>
              </div>
          ) : savePageName === "#track-orders" ?  (
              <div className='order-seller-page-section2'>
                  <TrackOrders/>
              </div>
          ) : savePageName === "#favourites" ?  (
              <div className='order-seller-page-section2'>
                  <Favourites/>
              </div>
          ) : savePageName === "#payments" ?  (
              <div className='order-seller-page-section2'>
                  <AccountPayments/>
              </div>
          ) : savePageName === "#reviews" ?  (
              <div className='order-seller-page-section2'>
                  <RatingAndReviews/>
              </div>
          ) : savePageName === "#cart" ?  (
              <div className='order-seller-page-section2'>
                  <Cart/>
              </div>
          )  : (
              <div className='order-seller-page-section2'>
                  <h1>ERROR</h1>
              </div>
          )}
      </div>
  );

};

export default OrdersBuyers;