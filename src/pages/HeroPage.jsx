import React, { useEffect, useState } from "react";
import heroImage from "../assets/heroPage/hero-tile5.png";
import supportTeam from "../assets/heroPage/support-team.png";
import vjpLogo from "../assets/img/vjp_logo_color.png";
import { ReviewStar } from "../components/Rating";
import {
  benefitItems,
  deal49Items,
  topBrands,
  customerReview,
  supportItems,
} from "../data/heroData";
import { db } from "../config/Firebase";
import { getDocs, collection } from "firebase/firestore";
import { Link } from "react-router-dom";
import { Adtile1, Adtile2, Adtiles } from "../components/AdTile";
import SpecialDeal from "../components/SpecialDeal";
import NewsLetter from "../components/NewsLetter";
import { useSelector } from "react-redux";

const HeroPage = () => {
  const [storeItems, setStoreItems] = useState([]);

  const allProducts = useSelector((state) => state.product.products);
  console.log(allProducts.slice(1));

  const getStoreItems = async () => {
    const storeItemCollectionRef = collection(db, "shopItems");
    const storeItemData = await getDocs(storeItemCollectionRef);
    const filteredData = storeItemData.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setStoreItems(filteredData);
  };

  useEffect(() => {
    getStoreItems();
  }, []);
  return (
    <section>
      <section
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
        className=" h-[670px] object-contain bg-center bg-cover xl:object-center 
        flex items-end mdl:items-center px-5 py-16 "
      >
        <div className="md:container md:mx-auto flex justify-end">
          <div
            className="w-full md:w-1/2 lg:w-[45%] lgl:w-[42%] xl:w-[33%]
            bg-white text-[#27323F] p-6 space-y-5"
          >
            <img src={vjpLogo} alt="" className="object-contain w-40" />
            <h1
              className="text-3xl sml:text-4xl xl:text-[41px]  font-bold 
            sml:font-semibold sml:leading-tight"
            >
              From floors to faucets
            </h1>
            <h2 className="xxl:text-lg text-gray">
              Find everything to make your house a home, all in one place.
            </h2>
            <h3>
              <Link
                to="/products/all-products"
                className="text-primary font-semibold"
              >
                Shop now
              </Link>
            </h3>
          </div>
        </div>
      </section>
      <section className="2xl:container 2xl:mx-auto mx-4 md:mx-10 flex flex-col items-center">
        <div
          className="relative md:absolute m-auto left-0 right-0 top-0 md:top-[680px] lg:top-[740px] lgl:top-[760px]  
                      py-2 md:px-10 flex justify-center "
        >
          <div className="flex flex-wrap justify-center md:justify-between border mt-4 bg-white divide-y-2 md:divide-y-0 lg:divide-x-2 px-2 py-[10px] border-gray-300">
            {benefitItems.map(({ id, Icon, title, subTitle }) => (
              <div
                key={id}
                className="flex items-center justify-center gap-7 p-5 bg-white w-full md:w-1/2 lg:w-1/4"
              >
                <Icon className="text-primary scale-[2]" />
                <div>
                  <h1 className="text-sm font-semibold text-ternary">
                    {title}
                  </h1>
                  <h1 className="text-sm text-gray">{subTitle}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Adtiles style="mt-6 md:mt-48 lg:mt-28 mb-16" />
        <div
          className="bg-white text-center border-gray-300 mb-16 py-5 md:py-16 
        flex flex-wrap justify-center  gap-3"
        >
          {allProducts.slice(1).map(({ id, title, items, category }) => (
            <div
              className="uppercase w-[47%] sm:w-[48%] sml:w-[31%] mdl:w-[23%] pb-3 flex flex-col justify-between space-y-3 border"
              key={id}
            >
              <div className="h-44 md:h-80 w-full p-4 flex justify-center items-center">
                <img
                  className="object-contain"
                  src={items[0].itemImage[0]}
                  alt=""
                />
              </div>
              <div className="border-t pt-2">
                <Link
                  to={`/products/${category}`}
                  className="text-sm sm:text-base font-bold text-ternary"
                >
                  {title}
                </Link>
                <h3 className="font-semibold text-xs text-gray-400 ">
                  {`${items.length} Products`}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap lg:flex-nowrap hidden w-full justify-between gap-12 lgl:gap-4 mb-16">
          {deal49Items.map(({ id, bgColor, imgURL, title }) => (
            <div
              key={id}
              className={`w-full bg-[${bgColor}] p-7 flex justify-end h-[260px] group`}
            >
              <div className="w-full z-50">
                <h1 className="text-4xl font-semibold">{title}</h1>
                <h3 className="py-4 text-gray-400  md:text-xl lgl:text-lg">
                  Starting at ₹999
                </h3>
                <button className="text-primary font-medium">Shop now</button>
              </div>
              <div className="flex absolute">
                <img
                  src={imgURL}
                  alt=""
                  className="object-contain group-hover:scale-110 transition-all ease-linear"
                />
              </div>
            </div>
          ))}
        </div>
        <Adtile1 />
        <SpecialDeal />
        <Adtile2 />
        <div className="mb-16 space-y-24 w-full">
          {/* TOP BRANDS */}
          <div className="space-y-5">
            <h2 className="title text-center lg:text-left">Top Brands</h2>
            <div className="flex flex-wrap justify-center items-center bg-white ">
              {topBrands.map(({ id, logo }) => (
                <img
                  key={id}
                  src={logo}
                  className="w-full sml:w-1/2 md:w-1/3 lgl:w-1/6 h-28 object-contain px-4 border"
                />
              ))}
            </div>
          </div>
          {/* REVIEW */}
          <div className="space-y-5">
            <h2 className="title text-center lg:text-left leading-10">
              What is everyone saying?
            </h2>
            <div className="flex flex-wrap gap-5 justify-center">
              {customerReview.map(({ crId, crName, crPhoto, crReview }) => (
                <div
                  className="w-full md:w-[48%] lg:w-[31%] bg-white p-8 space-y-5 shadow-lg "
                  key={crId}
                >
                  <ReviewStar />
                  <h4 className="text-ternary">{crReview}</h4>
                  <div className="flex items-center gap-5">
                    <img
                      src={crPhoto}
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <h2 className="font-semibold text-ternary">{crName}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap-reverse lgl:flex-nowrap items-end w-full justify-center gap-3 lgl:gap-0">
          <div className="flex flex-wrap-reverse md:flex-nowrap border-t h-fit w-full justify-between p-5 gap-5">
            {supportItems.map(({ id, title, subTitle }) => (
              <div
                className="space-y-1 w-full flex flex-col items-center md:items-start"
                key={id}
              >
                <h4 className="underline text-gray-600">{title}</h4>
                <h6 className="title">{subTitle}</h6>
              </div>
            ))}
          </div>
          <div>
            <img src={supportTeam} alt="" className="" />
          </div>
        </div>
      </section>
      <NewsLetter />
    </section>
  );
};

export default HeroPage;

// {storeItems.map(
//   ({ id, itemName, itemPath, itemPicURL, itemQuantity }) => (
//     <div
//       className="uppercase w-1/2 sml:w-1/3 mdl:w-1/4 py-3"
//       key={id}
//     >
//       <img className="scale-100  mx-auto" src={itemPicURL} />
//       <Link
//         to={`/products/${itemPath}`}
//         className="text-sm sm:text-base font-bold text-ternary"
//       >
//         {itemName}
//       </Link>
//       <h3 className="font-semibold text-xs text-gray-400 ">
//         {`${itemQuantity} Products`}
//       </h3>
//     </div>
//   )
// )}
