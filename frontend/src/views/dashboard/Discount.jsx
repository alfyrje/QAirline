import React, { useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "./discount.css";

const DiscountCard = ({ image, title, subtitle, buttonText }) => {
  return (
    <div className="discount-card">
      <div className="discount-card-image">
        <img src={image} alt={title} style={{ width: "100%" }} />
      </div>
      <div className="discount-card-content">
        <div className="discount-card-subtitle">
          <span>{subtitle}</span>
        </div>
        <h2 className="discount-card-title">{title}</h2>
      </div>
    </div>
  );
};

const Discount = () => {
  // Data for discount cards
  const discountData = [
    {
      image: "/images_sale/jeju.jpg",
      card_title: "Giảm tới 20%",
      card_subtitle: "Nhập mã: MIDNIGHT",
      buttonText: "Chi Tiết",
    },
    {
      image: "/images_sale/your_name.jpg",
      card_title: "Bay Thái Giá Yêu",
      card_subtitle: "Hành lý chẳng thiếu",
      buttonText: "Chi Tiết",
    },
    {
      image: "/images_sale/your_name.jpg",
      card_title: "Bay Thái",
      card_subtitle: "Giảm 50% hành lý ký gửi",
      buttonText: "Chi Tiết",
    },
    {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
      {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
      {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
      {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
      {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
      {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
      {
        image: "/images_sale/your_name.jpg",
        card_title: "Bay Thái",
        card_subtitle: "Giảm 50% hành lý ký gửi",
        buttonText: "Chi Tiết",
      },
    // Add more data as needed
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3; // Adjust based on layout

  // Calculate pagination
  const totalPages = Math.ceil(discountData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = discountData.slice(startIndex, endIndex);

  // Handle page navigation
  const goToPreviousPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const goToNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <section className="discount-container">
      <Header />
      <div className="discount-wrapper">
        <div className="discount-head-title">Khuyến mãi</div>
        <div className="discount-list">
          {currentItems.map((discount, index) => (
            <DiscountCard
              key={index}
              image={discount.image}
              title={discount.card_title}
              subtitle={discount.card_subtitle}
              buttonText={discount.buttonText}
            />
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="pagination">
          <button onClick={goToPreviousPage} disabled={currentPage === 1}>
          <img src="/icons/previous.png" alt="Previous Page" />
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button onClick={goToNextPage} disabled={currentPage === totalPages}>
          <img src="/icons/next.png" alt="Next Page" />
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Discount;