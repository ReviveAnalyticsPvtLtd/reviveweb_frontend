import React, { useEffect, useState } from "react";
import Link from 'next/link';
import axios from "axios";

const SOCIALTHING = () => {

  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    axios.get("https://revive-production.up.railway.app/contents/socials/")

      .then(response => {
        setSocialLinks(response.data)
      })
  }, [])


  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd547460a4400521626bf9c1138e5506ef584172fad311d00e72bb4c24d94c43?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 1",
      name: "FACEBOOK"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f62d5684fff20df1ea3cc8d2a0a4e84cf91ef5ef71b01152641a09fb7a809885?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 2",
      name: "TWITTER"

    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3758dd998c615380b18c26a4252ad38c6b2e51ef3f6f916c6888b41080d7e590?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 3",
      name: "LINKEDIN"
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e8b0905bc119d55ece09921e276d0496b4597bc5ff65c1f825d1e533bc0774f7?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 4",
      name: "INSTAGRAM"
    },
  ];

  const handleOnclick = (link) => {

    const socialLink = socialLinks?.find(socialLink => socialLink.platform === link)
    if(typeof window !== "undefined") {
      window.open(socialLink.url, "_blank")
    }
  }



  return (
    <>
      <div className=" flex gap-2 self-start mt-10">
        {socialIcons?.map((icon, index) => (
          <>
            <div onClick={() => { handleOnclick(icon.name) }} className="cursor-pointer flex justify-center items-center p-3 w-11 h-11 rounded-md bg-white bg-opacity-10">
              <img loading="lazy" src={icon.src} className="w-5 aspect-square" />
            </div>
          </>
        ))}
      </div>
    </>
  )
}


function SocialIcon({ src, alt }) {
  return (
    <div className="flex justify-center items-center p-3 w-11 h-11 rounded-md bg-white bg-opacity-10">
      <img loading="lazy" src={src} alt={alt} className="w-5 aspect-square" />
    </div>
  );
}
const fieldsName = [
  {
    first_name: "First Name",
    last_name: "Last Name",
    email: "Email",
    phone_number: "Phone Number",
    job_role: "Job Role",
    resume: "Resume",
  },
];

function CareersForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [jobs, setJobs] = useState([]);
  const [errors, setErrors] = React.useState({});
  const [fields, setFields] = React.useState({
    resume: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    job_role: "",
    privacyNotice: false,
  });

  useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/jobs/jobs/")
      .then((response) => {
        setJobs(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching jobs", error);
      });
  }, []);

  const handleSubmit = (e) => {
    setErrors({})
    e.preventDefault();

    if (!fields.privacyNotice) {
      return alert("Please agree to the privacy notice");
    }
    const formData = new FormData();
    formData.append("resume", fields.resume);
    formData.append("first_name", fields.first_name);
    formData.append("last_name", fields.last_name);
    formData.append("email", fields.email);
    formData.append("phone_number", fields.phone_number);
    setIsLoading(true);

    axios
      .post(
        `https://revive-production.up.railway.app/jobs/jobs/${fields?.job_role}/apply/`,
        formData
      )
      .then((response) => {
        console.log("Application submitted successfully", response);
        setIsLoading(false);
        // alert("Application submitted successfully");
        setIsSubmitted(true)

        //empty
        setFields({
          resume: null,
          first_name: "",
          last_name: "",
          email: "",
          phone_number: "",
          job_role: "none",
        });
      })
      .catch((error) => {
        setIsLoading(false);

        console.error("Error submitting application", error);
        if (error.response && error.response.data) {
          const flattenedErrors = Object.entries(error.response.data).flatMap(
            ([key, value]) =>
              value.map((error) => `${fieldsName[key] || key}: ${error}`)
          );
          setErrors(flattenedErrors);
        }
        setIsLoading(false);
      });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFields({ ...fields, resume: file });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
    setErrors([]);
  };

  const socialIcons = [
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/fd547460a4400521626bf9c1138e5506ef584172fad311d00e72bb4c24d94c43?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 1",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/f62d5684fff20df1ea3cc8d2a0a4e84cf91ef5ef71b01152641a09fb7a809885?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 2",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/3758dd998c615380b18c26a4252ad38c6b2e51ef3f6f916c6888b41080d7e590?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 3",
    },
    {
      src: "https://cdn.builder.io/api/v1/image/assets/TEMP/e8b0905bc119d55ece09921e276d0496b4597bc5ff65c1f825d1e533bc0774f7?apiKey=7b91412e16384e1384258b56fe71fd0b&",
      alt: "Social media icon 4",
    },
  ];

  return (
    <div className="pr-10 rounded-3xl border border-solid bg-stone-50 border-stone-950 max-md:pr-5">
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <section className="hidden lg:block flex flex-col w-6/12  max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow px-10 py-12 w-full rounded-3xl bg-slate-900 max-md:px-5 max-md:mt-10 max-md:max-w-full">
            <h1 className="text-6xl font-medium text-white leading-[97px] max-md:max-w-full max-md:text-4xl max-md:leading-[40px]">
              Send You Profile
            </h1>
            <h1 className="text-6xl font-medium text-white leading-[97px] max-md:max-w-full max-md:text-4xl max-md:leading-[40px]">
              to Revive Analytics{" "}
            </h1>
            <p className="mt-14 text-4xl text-white leading-[54px] max-md:mt-10 max-md:max-w-full">
              Find the best role you're looking for
            </p>
            <p className="self-start mt-72 text-4xl tracking-tighter leading-10 text-white max-md:mt-10">
              Get in touch
            </p>
          <SOCIALTHING/>
          </div>
        </section>
        <section className=" flex flex-col ml-5 w-6/12 max-md:ml-0 max-md:w-full">
          <div>
            {errors.length > 0 && (
              <div>
                <h3>Errors:</h3>
                {errors.map((error, index) => (
                  <p key={index} style={{ color: "red" }}>
                    {error}
                  </p>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col mt-10 rounded-3xl max-md:max-w-full">

          {isSubmitted && <span style={{color: 'rgb(17,94,89)', fontSize: '26px', paddingBottom: '4rem'}}> Thank you! Your Application has been submitted succesfully. </span>}


          {!isSubmitted && <> 
          <form onSubmit={handleSubmit}>
              <label
                htmlFor="resume"
                className="mt-5 mr-9 text-lg leading-6 text-zinc-800 max-md:mr-2.5 max-md:max-w-full"
              >
                Resume/CV*{" "}
                <span className="ml-2 text-blue-600">
                  {fields?.resume?.name}
                </span>
              </label>
              <div className="flex gap-2.5 self-start mt-1.5 mb-5 max-md:flex-wrap">
                <label
                  htmlFor="resume-upload"
                  className="justify-center px-5 py-4 text-base leading-6 text-blue-600 rounded-md border border-blue-600 border-solid cursor-pointer"
                >
                  SELECT RESUME
                </label>
                <input
                  onChange={handleFileUpload}
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".doc,.docx,.pdf"
                />
                <p className="my-auto text-xs leading-5 text-zinc-800">
                  Upload in either DOC, DOCX or PDF file format (file size not
                  more than 2MB)
                </p>
              </div>
              <div className="flex flex-col mt-2">
                <div className="flex gap-5 max-md:flex-wrap">
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="first_name"
                      className="text-lg leading-6 text-zinc-800"
                    >
                      First Name*
                    </label>
                    <input
                      onChange={handleOnChange}
                      name="first_name"
                      type="text"
                      id="first_name"
                      placeholder="First Name"
                      aria-label="First Name"
                      className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <label
                      htmlFor="last_name"
                      className="text-lg leading-6 text-zinc-800"
                    >
                      Last Name*
                    </label>
                    <input
                      onChange={handleOnChange}
                      name="last_name"
                      type="text"
                      id="last_name"
                      placeholder="Last Name"
                      aria-label="Last Name"
                      className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="email"
                  className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                >
                  Email*
                </label>
                <input
                  onChange={handleOnChange}
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  aria-label="Email Address"
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                />
              </div>
              <div className="flex flex-col ">
                <label
                  htmlFor="phone"
                  className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                >
                  Number*
                </label>
                <input
                  onChange={handleOnChange}
                  name="phone_number"
                  type="tel"
                  id="phone_number"
                  placeholder="Phone Number"
                  aria-label="Phone Number"
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                />
              </div>

              <div className="flex flex-col ">
                <label
                  htmlFor="phone"
                  className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                >
                  Job Role*
                </label>
                <select
                  name="job_role"
                  onChange={handleOnChange}
                  className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                >
                  <option value="none">Select Job Role</option>
                  {jobs?.map((job) => (
                    <option key={job.pk} value={job.pk}>
                      {job.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-1.5 mt-5 text-lg leading-6 text-blue-600 max-md:flex-wrap">
                <input
                  onChange={handleOnChange}
                  type="checkbox"
                  name="privacyNotice"
                  id="privacyNotice"
                  className="shrink-0 my-auto border-2 border-gray-200 border-solid h-[19px] w-[19px]"
                />
                <label htmlFor="privacyNotice" className="max-md:max-w-full">
                  By Clicking This You Agree The{" "}
                  <span className="text-blue-600">
                    'Privacy Notice' of Revive Analytics
                  </span>
                </label>
              </div>
              <Link href={'/careers'}>
              <p className="mt-5 text-lg leading-6 underline bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] text-zinc-800 max-md:max-w-full">
                <span className="text-zinc-800">To view Current openings,</span>{" "}
                Click here
              </p>
              </Link>
              <button
                onClick={handleSubmit}
                type="submit"
                className="justify-center self-start px-6 py-3.5 mt-9 text-base leading-6 whitespace-nowrap bg-teal-400 rounded-[40px] text-zinc-800 max-md:px-5"
              >
                                          {isLoading ? "Please wait..." : " Submit"}

              </button>
            </form>
            </>}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CareersForm;
