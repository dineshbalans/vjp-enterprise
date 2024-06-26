import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useRouteLoaderData } from "react-router-dom";
import { productActions } from "../../store/productSlice";
import { cartActions } from "../../store/cartSlice";
import { ProductRating } from "../../components/Rating";
import JsonDisplay from "../../components/JsonDisplay";

const ProductDetailsPage = () => {
  const [product, setProduct] = useState({});
  // {
  //   itemId,
  //   itemTitle,
  //   itemImage,
  //   itemDescription,
  //   isSale,
  //   actualPrice,
  //   discountPrice,
  //   discountPercentage,
  //   subCategory
  //   highlights
  // },
  const [productQuantity, setProductQuantity] = useState(1);
  const [productCategory, setProductCategory] = useState("");
  const [productImageIndex, setProductImageIndex] = useState(0);
  const dispatch = useDispatch();
  const data = useRouteLoaderData("products");
  const { productId, category } = useParams();
  const products = useSelector((state) => state.product.products);

  console.log(product);

  useEffect(() => {
    data && dispatch(productActions.addProducts(data));

    if (category === "all-products") {
      (data || products).forEach((product) =>
        product.items.forEach((item) => {
          if (item.itemId === productId) {
            setProduct(item);
            setProductCategory(product.title);
          }
        })
      );
      return;
    }
    const categoryProduct = (data || products)?.filter((product) =>
      product.category === category ? product : null
    );
    setProductCategory(categoryProduct[0].title);

    const filteredProduct = categoryProduct[0]?.items.filter((item) =>
      item.itemId === productId ? item : null
    );
    setProduct(filteredProduct[0]);
  }, []);

  const addToCartHandler = () => {
    const price = product?.discountPrice;
    // .replace(/,/g, "").slice(1);
    const cartData = {
      id: product?.itemId,
      title: product?.itemTitle,
      image: product?.itemImage,
      price,
      productQuantity,
      category: product?.subCategory,
    };
    dispatch(cartActions.addProduct(cartData));
  };

  return (
    <section className="p-5 md:p-10 2xl:container mx-auto space-y-12 min-h-[80vh] ">
      <div className="flex flex-wrap lg:flex-nowrap justify-between items-center gap-5">
        <div className="sml:hidden pt-6 pb-3">
          <span className="text-gray-500 text-sm">
            <Link to="/">Home</Link> / <Link to="..">{productCategory}</Link> /{" "}
            {product?.itemTitle}
          </span>
        </div>
        <div className="w-full lg:w-1/2 flex justify-center items-center relative h-[500px] p-1">
          {product?.itemImage ? (
            <img
              src={product?.itemImage[productImageIndex]}
              alt=""
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <h1 className=" w-1/2 flex justify-center items-center">
              <div className="border-t-2 border-primary w-40 h-40 rounded-full animate-spin" />
            </h1>
          )}
          <ul className="absolute z-10 bottom-0 flex gap-2 pb-4 h-full justify-center items-end py-2">
            {product?.itemImage?.map((image, index) => (
              <li
                key={index}
                onClick={() => setProductImageIndex(index)}
                className={`w-12 sml:w-14 h-12 relative cursor-pointer border rounded ${
                  productImageIndex !== index && "bg-black/30 border-0"
                }`}
              >
                <img
                  src={image}
                  alt=""
                  className="object-cover h-full w-full object-center absolute -z-20"
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-[47%] space-y-5 text-ternary">
          <div className="hidden sml:block">
            <span className="text-gray-500 text-sm">
              <Link to="/">Home</Link> / <Link to="..">{productCategory}</Link>{" "}
              / {product?.itemTitle}
            </span>
          </div>
          <h1 className="text-gray-800 text-xl sml:text-2xl lg:text-3xl font-semibold text-justify sml:text-left">
            {product?.itemTitle}
          </h1>
          <p className="text-justify md:text-left">{`${
            product?.itemDescription?.split(".")[0]
          }.`}</p>
          <h6 className="text-primary">
            Special Price : {`${product?.discountPercentage} % Off`}
          </h6>
          {/* <h5></h5> */}
          <div className="flex space-x-3 text-2xl items-baseline">
            <span>{`₹${product?.discountPrice}`}</span>
            <span className="line-through text-gray-400 text-lg ">
              {`₹${product?.actualPrice}`}
            </span>
          </div>

          <JsonDisplay data={product?.highlights} />

          <div className="flex flex-wrap sml:flex-nowrap border-b pb-4 gap-5 justify-center sml:justify-start">
            <div className="border flex">
              <button
                className="px-4 disabled:cursor-not-allowed"
                disabled={productQuantity < 2}
                onClick={() => setProductQuantity((prevState) => prevState - 1)}
              >
                -
              </button>
              <input
                type="number"
                className="flex w-12 h-full outline-none pl-5 border-x"
                value={productQuantity}
                onChange={(event) => {
                  if (+event.target.value < 1) {
                    return;
                  }
                  setProductQuantity(+event.target.value);
                }}
              />
              <button
                className="px-4"
                onClick={() => setProductQuantity((prevState) => prevState + 1)}
              >
                +
              </button>
            </div>
            <button
              className="text-white bg-ternary font-semibold px-5 py-[6px] hover:bg-primary transition-all ease-linear"
              onClick={addToCartHandler}
            >
              Add to cart
            </button>
          </div>
          <h4 className="text-center sml:text-left">
            Category:{" "}
            <span className="capitalize text-primary">{productCategory}</span>
          </h4>
        </div>
      </div>
      <div className="space-y-2 w-[85%] mx-auto">
        <h1 className="text-gray-500 text-lg font-semibold">
          Product Description:{" "}
        </h1>
        <p className="text-justify md:text-left">{product?.itemDescription}</p>
      </div>
      {/* <ProductRating
        category={productCategory}
        price={product?.discountPrice}
      /> */}
    </section>
  );
};

export default ProductDetailsPage;
