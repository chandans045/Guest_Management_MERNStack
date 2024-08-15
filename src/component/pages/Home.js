import React from "react";
import Navbar from "../module/Navbar";
import Carousel from "../module/Carousel";
import Rooms from "../module/Rooms";
import Poster from "../module/Poster";
import ProductSec from "../module/ProductSec";
import Footer from "../module/Footer";
export default function Home() {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Rooms />
      <Poster />
      <ProductSec />
      <Footer/>
    </div>
  );
}
