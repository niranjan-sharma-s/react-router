import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes, useParams } from "react-router-dom";

const ImageList = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await fetch("https://picsum.photos/v2/list");
      const data = await response.json();
      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  return (
    <div>
      <h1>Image Gallery</h1>
      {images.map((image) => (
        <Link key={image.id} to={`/image/${image.id}`}>
          <img
            key={image.id}
            src={image.download_url}
            alt='image'
            style={{ width: "200px", height: "150px", margin: "10px" }}
          />
        </Link>
      ))}
    </div>
  );
};

const ImageDetails = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);

  useEffect(() => {
    fetchImageDetails();
  }, []);

  const fetchImageDetails = async () => {
    try {
      const response = await fetch(`https://picsum.photos/id/${id}/info`);
      const data = await response.json();
      setImage(data);
    } catch (error) {
      console.error("Error fetching image details:", error);
    }
  };

  return (
    <div>
      {image ? (
        <div>
          <h2>Image Details</h2>
          <img src={image.download_url} alt='image' style={{width:'300px' , height:'300px'}} />
          <p>Author: {image.author}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<ImageList/>} />
        <Route path="/image/:id" element={<ImageDetails/>} />
      </Routes>
    </Router>
  );
};

export default App;


