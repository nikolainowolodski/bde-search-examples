<script setup lang="ts">
import { ref, computed } from "vue";
import products from "../top-1000-products.json";

// set the reactive variable
const userSearchQuery = ref("");

// Filter products based on search query
const productSearchResults = computed(() => {
  if (!userSearchQuery.value) return [];
  return products.filter((product) =>
    product.name.toLowerCase().includes(userSearchQuery.value.toLowerCase())
  );
});

// List of all unique categories from matching products
const categorySearchResults = computed(() => {
  const categories = productSearchResults.value.map(
    (product) => product.category
  );
  return [...new Set(categories)];
});

// Show the first item in the results as suggestion
const searchSuggestions = computed(() => {
  if (!userSearchQuery.value) return [];

  // Use optional chaining so typescript stops crying
  const firstProductName = productSearchResults.value[0]?.name;
  return firstProductName ? [firstProductName] : [];
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold text-bde-blue mb-4 text-center">
      Deutschlands beliebter Preisvergleich
    </h1>
    <h3 class="text-center mb-4">Es geht immer billiger.de</h3>

    <input
      v-model="userSearchQuery"
      type="text"
      placeholder="Wonach Suchen Sie?"
      class="w-full p-2 border border-bde-highlight rounded mb-4 focus:outline-none focus:ring-2 focus:ring-bde-orange"
    />

    <div v-if="userSearchQuery">
      <div class="grid grid-cols-2 gap-4">
        <div class="bg-white">
          <h2
            class="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3"
          >
            Produkte
          </h2>
          <ul>
            <!-- Slicing here so we don't display to many entries at once -->
            <li
              v-for="(product, index) in productSearchResults.slice(0, 10)"
              :key="index"
              class="p-2 border-b last:border-none hover:bg-bde-highlight"
            >
              <div>{{ product.name }}</div>
              <div class="text-sm text-gray-600">{{ product.category }}</div>
            </li>
            <!-- {/* In case we don't have any results, display a basic message to the user -->
            <li
              v-if="productSearchResults.length === 0"
              class="p-2 text-gray-500"
            >
              Keine passenden Produkte gefunden.
            </li>
          </ul>
        </div>
        <div class="bg-white">
          <h2
            class="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3"
          >
            Kategorien
          </h2>
          <ul>
            <li
              v-for="(category, index) in categorySearchResults.slice(0, 10)"
              :key="index"
              class="p-2 border-b last:border-none hover:bg-bde-highlight"
            >
              {{ category }}
            </li>
            <li
              v-if="categorySearchResults.length === 0"
              class="p-2 text-gray-500"
            >
              Keine passenden Kategorien
            </li>
          </ul>
        </div>
      </div>
      <div class="bg-white mt-4">
        <h2 class="uppercase font-bold text-bde-blue mb-2 bg-bde-highlight p-3">
          Suchvorschläge
        </h2>
        <ul>
          <li
            v-for="(suggestion, index) in searchSuggestions"
            :key="index"
            class="p-2 border-b last:border-none hover:bg-bde-highlight"
          >
            {{ suggestion }}
          </li>
          <li v-if="searchSuggestions.length === 0" class="p-2 text-gray-500">
            Keine Vorschläge verfügbar
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
