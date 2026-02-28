import React from "react";
import CategoriesList from "../../components/category/CategoryList";
import Carousel from "../../components/Carousel";
import DealCarousel from "../../components/deal/DealCarousel";
import CategoriesDemo from "../../components/category/CategoriesDemo";
import CategoriesGrid from "../../components/category/CategoryGrid";
import CategoryBar from "../../components/category/CategoryBar";

export default function Home(){
    return(
       <>
            <CategoryBar/>
            <Carousel/>
            <DealCarousel/>
            <CategoriesDemo/>
            <CategoriesGrid/>
       </>
    );
}