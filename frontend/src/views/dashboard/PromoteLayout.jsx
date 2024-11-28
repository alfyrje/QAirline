import React from "react";
import PromoteCard from "./PromoteCard";
import "./promoteLayout.css";

const PromoteLayout = () => {
  const promoData = [
    {
      image: "/images_sale/jeju.jpg",
      title: "Giảm tới 20%",
      subtitle: "Nhập mã: MIDNIGHT",
      buttonText: "Chi Tiết",
    },
    {
      image: "/images_sale/your_name.jpg",
      title: "Bay Thái Giá Yêu",
      subtitle: "Hành lý chẳng thiếu",
      buttonText: "Chi Tiết",
    },
    {
      image: "/images_sale/your_name.jpg",
      title: "Bay Thái",
      subtitle: "Giảm 50% hành lý ký gửi",
      buttonText: "Chi Tiết",
    },
  ];

  return (
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
  );
};

export default PromoteLayout;
