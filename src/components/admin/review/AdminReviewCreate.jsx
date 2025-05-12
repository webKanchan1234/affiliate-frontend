import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { createAdminReviewAction, uploadAdminReviewImageAction } from "../../../redux/actions/reviewAction";
import { useParams } from "react-router-dom";
import { FiTrash } from "react-icons/fi";
import { toast } from "react-toastify";

const AdminReviewCreate = () => {
  const dispatch = useDispatch();
  const { productId } = useParams();
  const [sections, setSections] = useState([{ type: "text", content: "" }]);
  const [loading, setLoading] = useState(false);

  // Add Section (Text or Image)
  const addSection = (type) => {
    setSections([...sections, { type, content: "" }]);
  };

  // Handle Text Change
  const handleChange = (index, value) => {
    const updatedSections = [...sections];
    updatedSections[index].content = value;
    setSections(updatedSections);
  };

  // Handle Image Selection & Preview
  const handleImageSelection = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const updatedSections = [...sections];
      updatedSections[index].content = URL.createObjectURL(file); // Show preview
      updatedSections[index].file = file; // Store file for upload
      setSections(updatedSections);
    }
  };

  // Handle Single Image Upload
  const handleImageUpload = async (index) => {
    const file = sections[index]?.file;
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const uploadedImage = await dispatch(uploadAdminReviewImageAction(formData)).unwrap();
      const updatedSections = [...sections];
      updatedSections[index].content = uploadedImage.imageUrl; // Store uploaded URL
      delete updatedSections[index].file; // Remove file reference
      setSections(updatedSections);
    } catch (error) {
      console.error("Image upload failed:", error);
    }
  };

  // Delete Section
  const deleteSection = (index) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  // Drag & Drop Handling
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setSections(items);
  };

  // Upload all images before submitting
  const uploadAllImages = async () => {
    const updatedSections = [...sections];
    for (let i = 0; i < updatedSections.length; i++) {
      if (updatedSections[i].type === "image" && updatedSections[i].file) {
        const formData = new FormData();
        formData.append("image", updatedSections[i].file);

        try {
          const uploadedImage = await dispatch(uploadAdminReviewImageAction(formData)).unwrap();
          updatedSections[i].content = uploadedImage.imageUrl; // Replace preview with actual URL
          delete updatedSections[i].file; // Remove file reference
        } catch (error) {
          console.error("Image upload failed:", error);
          return null; // Stop submission if upload fails
        }
      }
    }
    return updatedSections;
  };

  // Submit Review after uploading all images
  const handleSubmit = async () => {
    setLoading(true);
    const updatedSections = await uploadAllImages();
    if (!updatedSections) {
      setLoading(false);
      return;
    }

    try {
      await dispatch(createAdminReviewAction({ 
        data: { sections: updatedSections }, 
        productId 
      })).unwrap();
      
      toast.success("Review created successfully!");
      // Reset form to initial state
      setSections(sections.map(section => ({
        type: section.type,
        content: section.type === "text" ? "" : null,
        // Clear any file references for image sections
        ...(section.type === "image" && { file: undefined })
      })));
    } catch (error) {
      toast.error(error.message || "Failed to create review");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="sections">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {sections.map((section, index) => (
                <Draggable key={index} draggableId={String(index)} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-4 p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <div {...provided.dragHandleProps} className="p-2 bg-gray-100 rounded-lg cursor-move">🟰 Drag</div>
                        <button onClick={() => deleteSection(index)} className="p-2 bg-red-500 text-white rounded-lg">
                          <FiTrash size={16} />
                        </button>
                      </div>

                      {section.type === "text" ? (
                        <ReactQuill
                          value={section.content}
                          onChange={(value) => handleChange(index, value)}
                          className="bg-white rounded-lg"
                          placeholder="Write content..."
                        />
                      ) : (
                        <div>
                          {/* Image Upload Input */}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageSelection(index, e)}
                            className="w-full border p-2 rounded-lg mb-2"
                          />

                          {/* Preview Before Upload */}
                          {section.file && (
                            <div className="relative w-full mt-2">
                              <img src={section.content} alt="Preview" className="w-full h-[300px] object-cover rounded-lg shadow-sm" />
                              <button
                                type="button"
                                onClick={() => deleteSection(index)}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full"
                              >
                                <FiTrash size={16} />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleImageUpload(index)}
                                className="mt-2 p-2 bg-blue-500 text-white rounded-lg w-full"
                              >
                                Confirm Upload
                              </button>
                            </div>
                          )}

                          {/* Display Uploaded Image */}
                          {section.content && !section.file && (
                            <img src={section.content} alt="Uploaded" className="mt-2 w-full h-[300px] object-cover rounded-lg shadow-sm" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Buttons */}
      <div className="flex gap-2 mt-4">
        <button onClick={() => addSection("text")} className="p-2 bg-blue-500 text-white rounded-lg cursor-pointer">Add Text</button>
        <button onClick={() => addSection("image")} className="p-2 bg-green-500 text-white rounded-lg cursor-pointer">Add Image</button>
        <button onClick={handleSubmit} className={`p-2 bg-purple-500 text-white rounded-lg cursor-pointer ${loading ? "opacity-50 cursor-not-allowed" : ""}`} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default AdminReviewCreate;
