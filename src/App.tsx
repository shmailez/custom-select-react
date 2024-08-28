// import "./App.css";
// import { SeletFor } from "./components/SelectFor";
// import { CustomSelect } from "./components/"

// // const options = ["Apple", "Banana", "Orange", "Grapes", "Pineapple", "Mango"];

// function App() {
//   return (
//     <>
//       <h1>REACT SELECT</h1>
//       <SeletFor />
//       <CustomSelect />
//     </>
//   );
// }

// export default App;

import React from "react";
import CustomSelect from "./components/CustomSelector.tsx";
import "./App.css";
import { options } from "./data/data.ts";

// const options = [
//   {
//     value: "apple",
//     title: "Apple",
//     avatar: "https://via.placeholder.com/30?text=A",
//     description: "A delicious red fruit",
//   },
//   {
//     value: "banana",
//     title: "Banana",
//     avatar: "https://via.placeholder.com/30?text=B",
//     description: "A yellow tropical fruit",
//   },
//   {
//     value: "orange",
//     title: "Orange",
//     avatar: "https://via.placeholder.com/30?text=O",
//     description: "A juicy citrus fruit",
//   },
//   // Добавьте больше опций по необходимости
// ];

const App: React.FC = () => (
  <div className="App">
    <h1>Custom Select</h1>
    <CustomSelect options={options} multiple />
  </div>
);

export default App;
