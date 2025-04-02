import { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const ImageGallery = ({ images }) => {
  // console.log(images)
  const [selectedImage, setSelectedImage] = useState(images[0]||"");

  useEffect(() => {
    if (images?.length > 0) {
      setSelectedImage(images[0]);
    }
  }, [images]);

  return (
    <div className="w-full max-w-[300px] mx-auto flex flex-col gap-2">
      {/* Main Image with Zoom */}
      <div className="max-w-[300px]">
        <ReactImageMagnify
          {...{
            smallImage: {
                alt: "Product Image",
                width: 300, // ✅ Set explicit width
                height: 400, // ✅ Set explicit height
                src: selectedImage,
            },
            largeImage: {
              src: selectedImage,
              width: 1200,
              height: 800,
            },
            enlargedImageContainerDimensions: {
                width: "300%", // ✅ Makes sure zoom appears correctly
                height: "100%",
            },
            enlargedImagePosition: "beside",
          }}
        />
      </div>

      {/* Horizontal Thumbnail Slider */}
      <div className="w-full h-full max-w-md">
        <Swiper spaceBetween={0} slidesPerView={5} className="py-2">
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className={`w-10 h-10 object-cover cursor-pointer border-2 ${
                  selectedImage === img ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => setSelectedImage(img)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageGallery;