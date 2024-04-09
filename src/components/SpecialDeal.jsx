import React from "react";
import { Link } from "react-router-dom";
import wmDealImg from "../assets/heroPage/hero-deal2.jpg";

const SpecialDeal = () => {
  return (
    <div className="mb-16 bg-white flex flex-wrap w-full">
      <div className="w-full mdl:w-1/2 p-5 mdl:p-10 space-y-6">
        <h4 className="text-gray-400/95 font-semibold tracking-widest ">
          BRAND’S DEAL
        </h4>
        <h2 className="font-semibold text-xl lgl:text-3xl text-ternary leading-tight">
          Save up to 50% on every Kitchen Accessories
        </h2>
        <h3 className="text-gray-600">
          Huge discounts on top-brand Kitchen Accessories today!
        </h3>
        <h6>
          <Link
            to="/products/kitchen-accessories"
            className="text-primary font-semibold"
          >
            Shop now
          </Link>
        </h6>
      </div>
      <div className="w-full mdl:w-1/2">
        <img src={wmDealImg} alt="" className="h-60 mdl:h-96 w-full object-contain" />
      </div>
    </div>
  );
};

export default SpecialDeal;
