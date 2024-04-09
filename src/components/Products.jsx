import React, { useEffect, useState } from "react";
import { BsChevronDown } from "react-icons/bs";
import ProductList from "./ProductList";
import Pagination from "./Pagination";

const Products = ({ productInfo, category, subCategory }) => {
  const filteredProductsByCategory = subCategory
    ? productInfo?.items?.filter(
        (product) => product.subCategory === subCategory
      )
    : productInfo?.items;

  console.log(filteredProductsByCategory);

  const productLength = filteredProductsByCategory?.length;

  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  console.log("currentPageNumber : " + currentPageNumber);
  const itemsPerpage = 6;
  const startIndex = (currentPageNumber - 1) * itemsPerpage;
  const endIndex = currentPageNumber * itemsPerpage;
  const totalpages = Math.ceil(productLength / itemsPerpage);

  useEffect(() => {
    setCurrentPageNumber(1);
  }, [category]);

  return (
    <section>
      {/* Product Title */}
      <h1 className="text-4xl sml:text-6xl text-primary font-semibold pb-10">
        {productInfo?.title}
      </h1>

      {/* Product Description */}
      <p className="leading-7 text-justify sml:text-left">
        {productInfo?.description}
      </p>
      <div>
        <div className="flex justify-between py-6 text-gray-800">
          <h4>
            {productLength > 7
              ? `Showing ${
                  startIndex + 1
                }–${endIndex} of ${productLength} results`
              : `Showing all ${productLength} results`}
          </h4>
          <h4 className="hidden sml:flex items-center gap-2">
            <span>Default Sorting</span>
            <BsChevronDown className="" />
          </h4>
        </div>
        <div className="flex flex-wrap ">
          {filteredProductsByCategory
            ?.slice(startIndex, endIndex)
            ?.map(
              ({
                itemId,
                itemTitle,
                itemImage,
                isSale,
                actualPrice,
                discountPrice,
                discountPercentage,
              }) => (
                <ProductList
                  cardSize="THREE"
                  category={category}
                  key={itemId}
                  itemId={itemId}
                  itemTitle={itemTitle}
                  itemImage={itemImage}
                  isSale={isSale}
                  actualPrice={actualPrice}
                  discountPrice={discountPrice}
                  discountPercentage={discountPercentage}
                />
              )
            )}
        </div>
      </div>
      {productLength >= 7 && (
        <Pagination
          totalpages={totalpages}
          itemsPerpage={itemsPerpage}
          currentPageNumber={currentPageNumber}
          setCurrentPageNumber={setCurrentPageNumber}
        />
      )}
    </section>
  );
};

export default Products;

// const [filteredProductsByCategory, setFilteredProductsByCategory] = useState(
//   []
// );

// useEffect(() => {
//   subCategory
//     ? setFilteredProductsByCategory((prevState) => [
//         ...prevState,
//         productInfo?.items?.filter(
//           (product) => product.subCategory === subCategory
//         ),
//       ])
//     : setFilteredProductsByCategory(productInfo?.items);
// }, [subCategory]);
