import React from "react";
import { categoryItems } from "../data/heroData";
import { NavLink, Outlet, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../store/productSlice";

const ProductLayout = () => {
  const dispatch = useDispatch();
  const { category } = useParams();
  const allProducts = useSelector((state) => state.product.products);

  const categorizedProducts = allProducts.find((product) =>
    product.category === category ? product : null
  );

  const categorizedProductsSubCategorys =
    categorizedProducts?.subCategorys.filter((item) => item);

  console.log(categorizedProductsSubCategorys);

  return (
    <section className="2xl:container mx-auto bg-white flex text-gray-500 px-5 mdl:px-10 pt-10 group">
      <div className="border-r w-1/4 h-screen sticky top-0 hidden lg:block overflow-y-scroll ">
        <div className="space-y-4 p-4">
          <h3 className="font-semibold text-2xl">Categories</h3>
          <ul className="space-y-3">
            {categoryItems.map(({ id, link_to, title }) => (
              <li key={id}>
                <NavLink
                  to={link_to}
                  className={({ isActive }) =>
                    isActive
                      ? "text-primary"
                      : "text-gray-500 hover:text-primary transition-all"
                  }
                >
                  {title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4 p-4">
          <h3 className="font-semibold text-2xl">Filter by SubCategory</h3>
          <div>
            {categorizedProductsSubCategorys?.length === 0 ? (
              <h1>OOPS! Not Available At this Moment</h1>
            ) : (
              <div className="space-y-2">
                <h1
                  className="text-primary cursor-pointer"
                  onClick={() => dispatch(productActions.setSubCategory(null))}
                >
                  Clear Filter
                </h1>
                <ul className="space-y-2">
                  {categorizedProductsSubCategorys?.map(
                    (subCategory, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2"
                        onClick={() =>
                          dispatch(productActions.setSubCategory(subCategory))
                        }
                      >
                        <input type="checkbox" />
                        <h1>{subCategory}</h1>
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="space-y-4 p-4">
          <h3 className="font-semibold text-2xl">Average rating</h3>
          <div>
            <h1>OOPS! Not Available At this Moment</h1>
          </div>
        </div>
      </div>
      <div className="w-full lg:pl-10 lgl:pl-12 xl:pl-16 py-10">
        <Outlet />
      </div>
    </section>
  );
};

export default ProductLayout;

{
  /* <div className="space-y-4 p-4">
  <h3 className="font-semibold text-2xl">Filter by price</h3>
  <div>
    <h1>OOPS! Not Available At this Moment</h1>
  </div>
</div>; */
}
