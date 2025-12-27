import { useEffect, useState, useMemo } from "react";
import ReactImageMagnify from "react-image-magnify";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

const ImageGallery = ({ images = [] }) => {
  console.log("images in ImageGallery:", images);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    if (images.length > 0) {
      setSelectedImage(images[0].url);
    }
  }, [images]);

  const handleThumbnailClick = (img) => {
    if (img !== selectedImage) {
      setSelectedImage(img);
    }
  };

  const memoizedThumbnails = useMemo(
    () =>
      images.map((img, index) => (
        <SwiperSlide key={`${img}-${index}`}>
          <img
            src={img.url}
            alt={`Thumbnail ${index + 1}`}
            loading="lazy"
            className={`w-12 h-12 object-cover cursor-pointer border-2 rounded ${
              selectedImage === img ? "border-blue-500" : "border-gray-300"
            }`}
            onClick={() => handleThumbnailClick(img.url)}
          />
        </SwiperSlide>
      )),
    [images, selectedImage]
  );

  if (!selectedImage) return null;

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-3">
      {/* Zoomable Image */}
      <div className="max-w-sm">
        <ReactImageMagnify
          {...{
            smallImage: {
              alt: "Product Image",
              width: 300,
              height: 400,
              src: selectedImage,
              isFluidWidth: false,
            },
            largeImage: {
              src: selectedImage,
              width: 1200,
              height: 800,
            },
            enlargedImageContainerDimensions: {
              width: "300%",
              height: "100%",
            },
            enlargedImagePosition: "beside",
          }}
        />
      </div>

      {/* Thumbnail Slider */}
      {images.length > 1 && (
        <div className="w-full max-w-md">
          <Swiper spaceBetween={8} slidesPerView={5} className="py-2">
            {memoizedThumbnails}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
