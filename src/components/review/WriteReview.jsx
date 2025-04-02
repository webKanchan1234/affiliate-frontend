import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createReviewAction } from "../../redux/actions/reviewAction";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const WriteReview = () => {
  const dispatch = useDispatch()
  const { productName } = useParams(); // Access the dynamic parameter
  const location = useLocation();
  const [productId, setProductId] = useState(location.state?.product.productId || null);
  const { isAuthenticated, user } = useSelector((state) => state.loadUser);



  // console.log(productId)
  // console.log(productName)

  useEffect(() => {
    if (location.hash === '#write_user_review_tab') {
      const reviewSection = document.getElementById('write_user_review_tab');
      if (reviewSection) {
        reviewSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const maxDescriptionLength = 500;

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to write a review.");
      return;
    }

    if (!title.trim() || !description.trim() || rating === 0) {
      toast.error("Please fill out all fields and give a rating.");
      return;
    }
    const reviewData = {
      reviewTitle: title,
      reviewDesc: description,
      rating: rating
    }
    // console.log(reviewData)
    dispatch(createReviewAction({ data: reviewData, productId: productId }))
      .unwrap()
      .then(() => {
        toast.success("Review created successfully!");
        setTitle("");
        setDescription("");
        setRating(0);
      })
      .catch((error) => {
        toast.error(error || "Failed to create reaview.");
      });

  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-lg rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Write a Review</h2>

      {/* Title Input */}
      <input
        type="text"
        placeholder="Enter a title for your review"
        className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 mb-4"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {/* Rating Stars */}
      <div className="flex items-center mb-4">
        <span className="text-gray-700 font-semibold mr-2">Rating:</span>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`cursor-pointer ${star <= (hoverRating || rating) ? "text-yellow-500" : "text-gray-400"}`}
            size={28}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => setRating(star)}
          />
        ))}
      </div>

      {/* Description Box */}
      <textarea
        placeholder="Write your review..."
        className="w-full p-3 border rounded-lg focus:ring focus:ring-indigo-300 h-32 resize-none"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <p className="text-gray-500 text-sm text-right mt-1">{description.length}/{maxDescriptionLength}</p>

      {/* Submit Button */}
      <button
        className="w-full bg-indigo-600 text-white p-3 rounded-lg mt-4 hover:bg-indigo-700 transition cursor-pointer"
        onClick={handleSubmit}
      >
        Submit Review
      </button>
    </div>
  );
};

export default WriteReview;
