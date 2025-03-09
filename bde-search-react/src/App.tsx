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
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-bde-blue mb-4 text-center">
          Deutschlands beliebter Preisvergleich
        </h1>
        <h3 className="text-center mb-4">Es geht immer billiger.de</h3>

        <input
          value={userSearchQuery}
          onChange={handleInputChange}
          type="text"
          placeholder="Wonach Suchen Sie?"
          className="w-full p-2 border border-bde-highlight rounded mb-4 focus:outline-none focus:ring-2 focus:ring-bde-orange"
        />

        {userSearchQuery && (
          <>
            <div className="container">
              <div className="bg-white">
                <h2 className="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3">
                  Produkte
                </h2>
                <ul>
                  {productSearchResults.map((product, index) => (
                    <li
                      key={index}
                      className="p-2 border-b last:border-none hover:bg-bde-highlight"
                    >
                      <div>{product.name}</div>
                      <div className="text-sm text-gray-600">
                        {product.category}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white">
                <h2 className="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3">
                  Kategorien
                </h2>
                <ul>
                  {categorySearchResults.map((category, index) => (
                    <li
                      key={index}
                      className="p-2 border-b last:border-none hover:bg-bde-highlight"
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white">
                <h2 className="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3">
                  Suchvorschläge
                </h2>
                <ul>
                  {searchSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="p-2 border-b last:border-none hover:bg-bde-highlight"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
