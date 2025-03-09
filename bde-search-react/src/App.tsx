import { useState, useMemo, ChangeEvent } from "react";
import products from "../src/top-1000-products.json";

// define product type
type Product = {
  name: string;
  category: string;
};

export const App = () => {
  // state for user search tracking
  const [userSearchQuery, setUserSearchQuery] = useState("");

  // Filter products based on search query
  const productSearchResults = useMemo(() => {
    return products.filter((product: Product) =>
      product.name
        .toLocaleLowerCase()
        .includes(userSearchQuery.toLocaleLowerCase())
    );
  }, [userSearchQuery]);

  // List of all categories from matching products
  const categorySearchResults = useMemo(() => {
    return productSearchResults.map((product) => product.category);
  }, [productSearchResults]);

  // Cheap trick to show some type of "Suchvorschlag"
  const searchSuggestions = useMemo(() => {
    if (!userSearchQuery) return [] as string[];
    // If we got products related to the search query, just show the first product as search result
    // Just for the sake of showing something, in a live production I would obviously try to show a more relevant product ;)
    if (productSearchResults.length > 0) {
      return [productSearchResults[0].name];
    }
    return [];
  }, [userSearchQuery, productSearchResults]);

  // Update the search result whenever the user types something through our setter function
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserSearchQuery(e.target.value);
    console.log(userSearchQuery);
    console.log("===============");
    console.log(productSearchResults);
    console.log("===============");
    console.log(categorySearchResults);
    console.log("===============");
    console.log(searchSuggestions);
  };

  return (
    <>
      <input
        value={userSearchQuery}
        onChange={handleInputChange}
        type="text"
        placeholder="test"
      />
    </>
  );
};
