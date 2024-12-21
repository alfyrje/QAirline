import React, { useEffect, useState } from "react";
import Header from "../partials/Header";
import Footer from "../partials/Footer";
import "./discount.css";
import ImageSeparator from "../partials/ImageSeparator";

const DiscountCard = ({ image, title, subtitle, buttonText }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(subtitle)
      .then(() => {
        // Optional: Add feedback like alert or toast
        alert('Copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy:', err);
      });
  };
 
  return (

    <div className="discount-card">
      <div className="discount-card-image">
        <img src={image} alt={title} style={{ width: "100%" }} />
      </div>
      <div className="discount-card-content">
        <div className="discount-card-subtitle">
          <span>
            <span>Nhập mã</span>
            <span className = "discount-subtitle"> {subtitle}</span>
            <button className="copy-button" onClick={handleCopy}>
              Copy
            </button>
            </span> 
        </div>
        <h2 className="discount-card-title">{title}</h2>
      </div>
    </div>
  );
};

const Discount = () => {
  const [discountData, setDiscountData] = useState([]);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/voucher/'); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        
        // Transform API data to match card format
        const formattedData = data.map(discount => ({

          image: discount.voucher_picture,
          card_title: `${discount.voucher_description}`,
          card_subtitle: `${discount.voucher_code}`, /// này là nhập mã 
          buttonText: "Chi Tiết",
          description: discount.voucher_description,
          flightCode: discount.voucher_flight_code
        }));
        // console.log("This is IMAGE------------------",image);

        setDiscountData(formattedData);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchDiscounts();
  }, []);

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
      <ImageSeparator imagePath="/separator/separator_travel_info.jpg" />
      <div className="discount-wrapper">
        <div className="discount-list">
        <div className="discount-head-title">Khuyến mãi</div> 
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
            Trang {currentPage} of {totalPages}
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