import axios from "axios";
import React, { Fragment, useState } from "react";
import { FaFacebook, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { v4 } from "uuid";
import { useAlertDispatch } from "../../context/alertContext";
import { useProfileDispatch } from "../../context/profileContext";
import {
  CLEAR_PROFILE,
  GET_PROFILE,
  REMOVE_ALERT,
  SET_ALERT,
} from "../../context/types";
import { axiosConfig } from "../../utils/axiosConfig";

const CreateProfile = () => {
  const id = v4();
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    githubusername: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
  });

  const [displaySocial, toggleDisplaySocial] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
  } = formData;

  const profileDispatch = useProfileDispatch();
  const alertDispatch = useAlertDispatch();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await axios.post(
        "/api/profile/create-profile",
        formData,
        axiosConfig
      );
      console.log(res);
      profileDispatch({ type: GET_PROFILE, payload: res.data.profile });
      navigate("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;
      if (errors) {
        errors.forEach((e) => {
          alertDispatch({
            type: SET_ALERT,
            payload: { id, msg: e.msg, alertType: "danger" },
          });
          setTimeout(() => {
            alertDispatch({ type: REMOVE_ALERT, payload: id });
          }, 3000);
        });
      }
      profileDispatch({
        type: CLEAR_PROFILE,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  return (
    <div className="app__container">
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => handleSubmit(e)}>
        <div className="form-group">
          <select
            name="status"
            value={status}
            onChange={(e) => handleChange(e)}
          >
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            value={company}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Could be your own or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            value={skills}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="githubusername"
            value={githubusername}
            onChange={(e) => handleChange(e)}
          />
          <small className="form-text">
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="A short bio of yourself"
            name="bio"
            value={bio}
            onChange={(e) => handleChange(e)}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button
            type="button"
            className="btn btn-dark"
            onClick={() => toggleDisplaySocial(!displaySocial)}
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocial && (
          <Fragment>
            <div className="form-group social-input">
              <FaTwitter className="twitter icons" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FaFacebook className="facebook icons" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FaYoutube className="youtube icons" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <FaLinkedin className="linkedin icons" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </Fragment>
        )}

        <div className="buttons d-flex justify-content-center">
          <input
            type="submit"
            className="btn btn-primary my-1"
            style={{
              display: "inline-block",
              width: "25%",
              padding: "1rem",
              marginRight: "1rem",
            }}
          />
          <Link
            to="/dashboard"
            className="btn btn-dark my-1"
            style={{
              width: "25%",
              display: "inline-block",
              padding: "1rem",
            }}
          >
            Go Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateProfile;
