import React, { useState, useEffect } from "react";
import { getDataFromAPI } from "../../services/apiCalls";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Meals.css";

const Foodsearch = () => {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");

  const inputSearchHandler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const bring = setTimeout(() => {
      getDataFromAPI(search)
        .then((foodResults) => {
          setMeals(foodResults.meals);
        })
        .catch((error) => console.log(error));
    }, 500);

    return () => clearTimeout(bring);
  }, [search]);

  useEffect(() => {
    if (meals.length > 0) {
      console.log("we have this meals...", meals);
    }
  }, [meals]);

  const selectFood = (food) => {
    console.log(food);
  };

  return (
    <div className="searchDiv">
      <input
        name="food"
        placeholder="search your favorite meal"
        className="searchInput"
        onChange={(e) => inputSearchHandler(e)}
      />

      {meals.length > 0 && (
        <div className="mealsContainer">
          {meals.map((food) => {
            return (
              <div
                className="mealsDesign"
                key={food.idMeal}
                onClick={() => selectFood(food)}
              >
                {food.strMeal} {food.strCategory} {food.strArea}{" "}
                {food.strInstructions} {food.strMealTumb} {food.strTags}{" "}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Foodsearch;

{
  /* 
// const Meals = () => {
//   useEffect(() => {
//     getDataFromAPI();
//   }, []); */
}
