import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Line, Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const AnalyticalDashboard = () => {
  // Dummy data for sold items with reviews
  const soldItems = [
    {
      id: 1,
      name: "Product 1",
      rating: 4.5,
      review: "Great product! Highly recommended.",
    },
    {
      id: 2,
      name: "Product 2",
      rating: 3.8,
      review: "Decent product. Could be better.",
    },
    // Add more sold items with reviews
  ];

  const averageRating =
    soldItems.reduce((sum, item) => sum + item.rating, 0) / soldItems.length;
  const [selectedItem, setSelectedItem] = useState("Item 1");

  const itemData = {
    "Item 1": {
      clicksData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Clicks on Listings",
            data: [100, 200, 150, 300, 250, 400],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      savesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Saves",
            data: [50, 100, 80, 120, 90, 150],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      sharesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Shares",
            data: [20, 30, 40, 50, 60, 70],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
    "Item 2": {
      clicksData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Clicks on Listings",
            data: [200, 250, 300, 350, 400, 450],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      savesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Saves",
            data: [80, 120, 150, 100, 130, 160],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      sharesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Shares",
            data: [30, 40, 50, 60, 70, 80],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
    "Item 3": {
      clicksData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Clicks on Listings",
            data: [300, 350, 400, 450, 500, 550],
            backgroundColor: "rgba(54, 162, 235, 0.5)",
            borderColor: "rgba(54, 162, 235, 1)",
            borderWidth: 1,
          },
        ],
      },
      savesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Saves",
            data: [120, 150, 180, 200, 220, 250],
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          },
        ],
      },
      sharesData: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
          {
            label: "Listing Shares",
            data: [40, 50, 60, 70, 80, 90],
            backgroundColor: "rgba(75, 192, 192, 0.5)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
    },
  };

  const handleChangeItem = (item) => {
    setSelectedItem(item);
  };

  const renderGraphs = () => {
    if (!itemData[selectedItem]) {
      return null;
    }

    const { clicksData, savesData, sharesData } = itemData[selectedItem];

    return (
      <>
        <div className="graph-container">
          <h3 className="graph-subtitle">Clicks on Listings</h3>
          <Line data={clicksData} />
        </div>
        <div className="graph-container">
          <h3 className="graph-subtitle">Listing Saves</h3>
          <Bar data={savesData} />
        </div>
        <div className="graph-container">
          <h3 className="graph-subtitle">Listing Shares</h3>
          <Pie data={sharesData} />
        </div>
      </>
    );
  };

  return (
    <div className="app">
      <div className="section-overview">
        <div className="section-overview-header">
          <h2>Overview</h2>
        </div>
        <Link
          to="/analytics/chat"
          className="sub-section-overview-chats link-unstyled"
        >
          <h2>2 </h2>
          <p>Chats to answer</p>
        </Link>
        <Link
          to="/analytics/seller-rating"
          className="sub-section-overview link-unstyled"
        >
          <div>
            <h2>
              2{" "}
              <span className="stars">
                {/* Render stars based on average rating */}
                {Array.from(Array(Math.floor(averageRating)), (_, index) => (
                  <i key={index} className="fas fa-star"></i>
                ))}
                {/* Render half star if average rating is not a whole number */}
                {averageRating % 1 !== 0 && (
                  <i className="fas fa-star-half-alt"></i>
                )}
              </span>
            </h2>
          </div>

          <p>Seller Rating</p>
          <p>2 Reviews</p>
        </Link>
      </div>
      <div className="section-listings">
        <div className="section-listings-header">
          <h2>Your Listings</h2>
        </div>

        <Link
          to="/analytics/active-ads"
          className="sub-section-overview link-unstyled"
        >
          <h2>25</h2>
          <p>Active Ads</p>
        </Link>
        <Link
          to="/analytics/sold"
          className="sub-section-listings link-unstyled"
        >
          <h2>2</h2>
          <p>Sold & out of stock</p>
        </Link>
        <Link
          to="/analytics/draft-ads"
          className="sub-section-listings link-unstyled"
        >
          <h2>2</h2>
          <p>Drafts</p>
        </Link>
        <Link
          to="/analytics/renew"
          className="sub-section-listings link-unstyled"
        >
          <h2>3</h2>
          <p>To renew</p>
        </Link>
        <Link
          to="/analytics/delete-ads"
          className="sub-section-listings link-unstyled"
        >
          <h2>2</h2>
          <p>To delete & relist</p>
        </Link>
        <div className="sub-section-listings">
          <h2>0</h2>
          <p>Need attention</p>
        </div>
      </div>
      <div className="section-insights">
        <div className="graphs-page">
          <h2 className="graphs-title">Insights</h2>
          <div className="item-selector">
            <label htmlFor="item-select">Select Item:</label>
            <select
              id="item-select"
              value={selectedItem}
              onChange={(e) => handleChangeItem(e.target.value)}
            >
              <option value="Item 1">Item 1</option>
              <option value="Item 2">Item 2</option>
              <option value="Item 3">Item 3</option>
            </select>
          </div>
          <div className="graphs-container">{renderGraphs()}</div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticalDashboard;
