import React, { useContext, useState } from "react";
import PreviewImageUpload from "../../components/imagePreview/PreviewImageUpload";
import { AuthContext } from "../../context/authContext";
import "./createPost.scss";

const CreatePost = () => {
  const { currentUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    description: ""
  });

  const [fileInput, setFileInput] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [uploadedUrls, setUploadedUrls] = useState([]);
  const [submitProdError, setSubmitProdError] = useState(null);

  const handleFileInput = e => {
    const file = e.target.files[0];
    previewFile(file);
    setSelectedFile(file);
    setFileInput(e.target.value);
  };

  const handleSubmitFile = e => {
    e.preventDefault();
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };

    reader.onerror = () => {
      console.log("Error");
    };
  };

  const uploadImage = async image => {
    try {
      const response = await fetch("/api/cloud/upload", {
        method: "POST",
        body: JSON.stringify({ data: image }),
        headers: {
          "Content-Type": "application/json",
          withCredentials: true
        }
      });
      setFileInput("");
      setPreviewSource("");

      const urlData = await response.json();
      console.log(urlData);
      setUploadedUrls(oldData => [...oldData, urlData]);
      console.log(uploadedUrls);
    } catch (error) {
      console.log(error);
    }
  };

  const previewFile = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const onChange = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    console.log(formData);
  };

  const submitProductData = async e => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/posts/create`, {
        method: "POST",
        body: JSON.stringify({
          description: formData.description,
          img: uploadedUrls[0],
          user_id: currentUser.user_id
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const data = await response.json();

      if (response.ok) {
        window.location.assign("/");
      } else throw new Error(data.error);
    } catch (error) {
      setSubmitProdError(error.message);
    }
  };

  return (
    <div className="outer-container">
      <div className="upload-container">
        <h2 className="">Image Upload</h2>

        <form onSubmit={handleSubmitFile} className="">
          <input
            type="file"
            name="image"
            onChange={handleFileInput}
            value={fileInput}
            className=""
          />
          <button
            type="submit"
            className={selectedFile ? "selected" : "not-selected"}
          >
            Upload
          </button>
        </form>
        <div className="w-full bg-slate-300 flex justify-center p-6 rounded-sm max-w-lg sm:ml-12">
          <PreviewImageUpload source={previewSource} />
        </div>
      </div>

      <div className="post-container">
        <h2 className="">Submit Product Details</h2>
        <form className="">
          <div className="description">
            <label for="description " className="">
              What Do You Want To Say?
            </label>
            <textarea
              rows="4"
              cols="50"
              name="description"
              onChange={onChange}
              required
              className=""
            />
            
          </div>
          <button
              onClick={submitProductData}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Submit
            </button>
        </form>
      </div>

      <div className="">
        <h2 className="">Images To Submit</h2>
        <div className="">
          {uploadedUrls
            ? uploadedUrls.map((url, index) =>
                <PreviewImageUpload source={url} key={index} />
              )
            : false}
        </div>
      </div>

      {submitProdError &&
        <p className="">
          {submitProdError}
        </p>}
    </div>
  );
};

export default CreatePost;
