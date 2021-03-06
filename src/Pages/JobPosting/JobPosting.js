import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./JobPosting.css";
import axios from "axios";

const JobPosting = () => {
  const [imgData, setImgData] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const handleImageUpload = (e) => {
    const logoData = new FormData();
    logoData.set("key", "bb996e7457cab7b5b10c725d84190723");
    logoData.append("image", e.target.files[0]);

    axios
      .post("https://api.imgbb.com/1/upload", logoData)
      .then(function (response) {
        setImgData(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <section id="about" className="about section">
      <div className="my-container">
        <div className="form-section ">
          <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-area">
                <label>Job title *</label> <br />
                <input {...register("jobTitle", { required: true })} />
                {errors.jobTitle && <p>jobTitle is required.</p>}
              </div>
              <div className="input-area">
                <label>Company *</label> <br />
                <input {...register("company", { required: true })} />
                {errors.company && <p>company name is required.</p>}
              </div>
              <div className="input-area">
                <label>Experience *</label> <br />
                <input {...register("experience", { required: true })} />
                {errors.experience && <p>Experience is required.</p>}
              </div>

              <div className="input-area">
                <label>Description</label>
                <br />
                <textarea
                  {...register("description", { required: true })}
                ></textarea>
                {errors.description && <p>description is required</p>}
              </div>
              <div className="input-area">
                <label>Company logo</label>
                <input type="file" onChange={handleImageUpload} />
              </div>
              <div className="input-area">
                <select
                  className="form-select form-select-sm"
                  aria-label=".form-select-sm example"
                  {...register("type", { required: true })}
                >
                  <option value='' >Select Job type</option>
                  <option value="part time">part time</option>
                  <option value="full time">full time</option>
                  <option value="internship">internship</option>
                </select>
                <br />
                <input type="submit" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobPosting;