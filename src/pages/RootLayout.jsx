import React, { useEffect } from "react";
import {
  Outlet,
  ScrollRestoration,
  useRouteLoaderData,
} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { userActions } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./LoginPage";
import { auth } from "../config/Firebase";
import Menubar from "../components/Menubar";
import Head from "../components/Head";
import { productActions } from "../store/productSlice";

const Rootlayout = () => {
  const dispatch = useDispatch();
  const allProducts = useRouteLoaderData("products");
  const userIsLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    auth.onAuthStateChanged(
      (userAuth) => userAuth && dispatch(userActions.loginUser())
    );
  }, []);

  useEffect(() => {
    allProducts && dispatch(productActions.addProducts(allProducts));
  }, []);

  return (
    <div className="h-[100vh] relative">
      <ScrollRestoration />
      {userIsLogin ? (
        <div className="h-screen  relative">
          {/* <Head /> */}
          <Header />
          <Menubar />
          <Outlet />
          <Footer />
        </div>
      ) : (
        <LoginPage />
      )}
    </div>
  );
};

export default Rootlayout;
