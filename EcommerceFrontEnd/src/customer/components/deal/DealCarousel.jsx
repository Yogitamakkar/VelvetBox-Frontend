import React, { useRef } from "react";
import Slider from "react-slick";
import DealCard from "./DealCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Arrows from "../carousel/Arrows";
import { motion, useInView } from 'motion/react'



const sampleDeals = [
  {
    id: 1,
    title: "Premium Headphones",
    description: "Noise cancelling wireless headphones",
    price: 149.99,
    originalPrice: 249.99,
    images: [
      "https://imgs.search.brave.com/LKKoC6Gmlvaoj6BKKFog6aFL6PKV4hoSh3C4uYQM1SI/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tYWdl/c2xhbmQuY29tL3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDIyLzA4/L01hZ2VzMDA0MTYt/MTAyNHg2ODEuanBn",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 2,
    title: "Smartwatch",
    description: "Latest model with health tracking",
    price: 199.99,
    originalPrice: 299.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 3,
    title: "Portable Speaker",
    description: "Waterproof bluetooth speaker",
    price: 79.99,
    originalPrice: 129.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 4,
    title: "Wireless Earbuds",
    description: "True wireless with charging case",
    price: 89.99,
    originalPrice: 149.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 5,
    title: "Digital Camera",
    description: "4K video with 24MP photos",
    price: 399.99,
    originalPrice: 599.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 6,
    title: "Gaming Console",
    description: "Next-gen gaming experience",
    price: 499.99,
    originalPrice: 599.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 7,
    title: "Tablet",
    description: "10-inch display with all-day battery",
    price: 329.99,
    originalPrice: 429.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  },
  {
    id: 8,
    title: "Fitness Tracker",
    description: "Advanced activity and sleep tracking",
    price: 59.99,
    originalPrice: 99.99,
    images: [
      "/api/placeholder/400/320",
      "/api/placeholder/400/320",
      "/api/placeholder/400/320"
    ],
    discount: 10
  }
];

const DealCarousel = ({title}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

   const ref = useRef(null);
   const isInView = useInView(ref, { once:true, margin: "-100px" }); 
  return (
    <div className="p-4 px-6 sm:px-3 md:px-9" ref={ref}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <Slider {...settings} className="flex gap-4">
          {sampleDeals.map((deal) => (
            <div key={deal.id} className="p-2">
              <DealCard deal={{ ...deal, image: deal.images?.[0] || "" }} />
            </div>
          ))}
        </Slider>
      </motion.div>
    </div>
  );
};

export default DealCarousel;

//add previous and next arrows to it
