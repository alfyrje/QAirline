import React, { useEffect, useState } from "react";
import PromoteCard from "./PromoteCard";
import "./promoteLayout.css";

const PromoteLayout = () => {
  const [promoData, setPromoData] = useState([]);

  useEffect(() => {
    const fetchPromo = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/voucher/");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Take first 3 vouchers and transform them
        const firstThreeVouchers = data.slice(0, 3);
        const formattedData = firstThreeVouchers.map((voucher) => ({
          image: voucher.voucher_picture,
          title: voucher.voucher_description,
          subtitle: voucher.voucher_code,
          buttonText: "Chi Tiết",
        }));
        setPromoData(formattedData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPromo();
  }, []);

  return (
    <div className="promo-layout-container">
      <div className="promo-text-introduction">Ưu đãi</div>
      <div className="promo-layout">
        {promoData.map((promo, index) => (
          <PromoteCard
            key={index}
            image={promo.image}
            title={promo.title}
            subtitle={promo.subtitle}
            buttonText={promo.buttonText}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoteLayout;
