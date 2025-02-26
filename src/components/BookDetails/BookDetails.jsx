import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/CoverNotAvailable.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const URL = "https://www.googleapis.com/books/v1/volumes/";
const API_KEY = "AIzaSyDzfiCMdEHjMAQL3KOzXd-7T989k5h6Tes";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}?key=${API_KEY}`);
        const data = await response.json();
        console.log(data);

        if (data) {
          const volumeInfo = data.volumeInfo;
          const {
            description,
            title,
            authors,
            publishedDate,
            categories,
            imageLinks,
          } = volumeInfo;

          const newBook = {
            description: description || "No description found",
            title: title || "Title not found",
            authors: authors ? authors.join(", ") : "Authors not found",
            publishedDate: publishedDate || "Date not found",
            categories: categories
              ? categories.join(", ")
              : "No categories found",
            cover_img: imageLinks ? imageLinks.thumbnail : coverImg,
          };

          setBook(newBook);
        } else {
          setBook(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    getBookDetails();
  }, [id]);

  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/navadobooks-react/book")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <div dangerouslySetInnerHTML={{ __html: book?.description }} />
            </div>
            <div className="book-details-item">
              <span className="fw-6">Authors: </span>
              <span>{book?.authors}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Published Date: </span>
              <span>{book?.publishedDate}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Categories: </span>
              <span>{book?.categories}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;
