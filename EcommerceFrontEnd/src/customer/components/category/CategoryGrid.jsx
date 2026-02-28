const CategoriesGrid = ({ onCategoryClick }) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 px-9">
        
        <div
          onClick={() => onCategoryClick?.("cakes")}
          className="cursor-pointer overflow-hidden rounded-xl "
        >
          <img
            src="https://cdn.igp.com/f_auto,q_auto,t_pnopt15prodlp/banners/birthday_cakes_d_split_illustration_5_20240524115505.jpg"
            alt="Birthday Cakes"
            className="w-full h-45 object-cover md:object-contain  md:h-55 rounded-xl"
          />
        </div>

        <div
          onClick={() => onCategoryClick?.("flowers")}
          className="cursor-pointer overflow-hidden rounded-xl "
        >
          <img
            src="https://cdn.igp.com/f_auto,q_auto,t_pnopt15prodlp/banners/floral_delight_d_split_illustration_5_20240621195345.jpg"
            alt="Flowers"
            className="w-full h-45 object-cover md:object-contain md:h-55"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 px-9">
        <div
          onClick={() => onCategoryClick?.("gifts")}
          className="cursor-pointer overflow-hidden rounded-xl "
        >
          <img
            src="https://cdn.igp.com/f_auto,q_auto,t_pnopt7prodlp/banners/caricatures_d_split_illustration_5_20240524115616.jpg"
            alt="Gifts"
            className="w-full h-36 object-contain md:h-70"
          />
        </div>

        <div
          onClick={() => onCategoryClick?.("plants")}
          className="cursor-pointer overflow-hidden rounded-xl "
        >
          <img
            src="https://cdn.igp.com/f_auto,q_auto,t_pnopt7prodlp/banners/name_gifts_d_split_illustration_5_1725623967530"
            alt="Plants"
            className="w-full h-36 object-contain md:h-70"
          />
        </div>

        <div
          onClick={() => onCategoryClick?.("hampers")}
          className="cursor-pointer overflow-hidden rounded-xl "
        >
          <img
            src="https://cdn.igp.com/f_auto,q_auto,t_pnopt7prodlp/banners/plants_d_split_illustration_5_20240524115700.jpg"
            alt="Hampers"
            className="w-full h-36 object-contain md:h-70"
          />
        </div>

        <div
          onClick={() => onCategoryClick?.("gifts")}
          className="cursor-pointer overflow-hidden rounded-xl "
        >
          <img
            src="https://cdn.igp.com/f_auto,q_auto,t_pnopt7prodlp/banners/hampers_d_split_illustration_5_20240524115716.jpg"
            alt="Gifts"
            className="w-full h-36 object-contain md:h-70"
          />
        </div>
      </div>
    </>
  );
};

export default CategoriesGrid;
