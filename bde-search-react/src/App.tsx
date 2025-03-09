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
    if (!userSearchQuery) return [] as Product[];
    return products.filter((product: Product) =>
      product.name.toLowerCase().includes(userSearchQuery.toLowerCase())
    );
  }, [userSearchQuery]);

  // List of all categories from matching products
  const categorySearchResults = useMemo(() => {
    const categories = productSearchResults.map((product) => product.category);
    // Make sure to return unique categories and get rid of dupes
    return Array.from(new Set(categories));
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
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white">
                <h2 className="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3">
                  Produkte
                </h2>
                <ul>
                  {/* Slicing here so we don't display to many entries at once */}
                  {productSearchResults.slice(0, 10).map((product, index) => (
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
                  {/* In case we don't have any results, display a basic message to the user */}
                  {productSearchResults.length === 0 && (
                    <li className="p-2 text-gray-500">
                      Keine passenden Produkte gefunden.
                    </li>
                  )}
                </ul>
              </div>
              <div className="bg-white">
                <h2 className="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3">
                  Kategorien
                </h2>
                <ul>
                  {categorySearchResults.slice(0, 10).map((category, index) => (
                    <li
                      key={index}
                      className="p-2 border-b last:border-none hover:bg-bde-highlight"
                    >
                      {category}
                    </li>
                  ))}
                  {categorySearchResults.length === 0 && (
                    <li className="p-2 text-gray-500">
                      Keine passenden Kategorien gefunden.
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="bg-white mt-4">
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
                {searchSuggestions.length === 0 && (
                  <li className="p-2 text-gray-500">
                    Keine passenden Vorschläge verfügbar.
                  </li>
                )}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};
