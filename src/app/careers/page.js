"use client";
import * as React from "react";
import FooterComponent from "@/components/Footer";
import NavBar from "@/components/header/Navbar";
import CustomCursor from "../../components/CustomCursor";
import axios from "axios";
import Link from "next/link";
import { formatDate } from "@/utils";


// const jobs = [
//     {
//         title: "Senior Backend Engineer",
//         description: "Dummy text one line description Dummy text one line description Dummy text one line description",
//         location: "United States",
//         experience: "1-5 years",
//         postedAt: "15 hours ago",
//         remote: true,
//     },

// ];

function BenefitItem({ title, children }) {
  return (
    <div>
      <div className="font-bold mb-1">{title}</div>
      {children}

    </div>
  );
}

function JobCard({ job }) {
  return (
    <div className="flex flex-col grow pb-6 mx-auto w-full rounded-3xl bg-neutral-50 text-zinc-800 max-md:mt-5">
      <h3 className="justify-center items-start px-8 py-9 text-lg font-bold leading-6 underline border-b border-solid border-b-gray-200 max-md:px-5">
        {job.title}
      </h3>
      {/* <p
            dangerouslySetInnerHTML={{ __html: job.body }}
            className="mx-7 mt-5 text-sm leading-5 max-md:mx-2.5
            
            
            "></p> */}
      <div
        className="flex gap-5 justify-between px-8 pt-4 pb-4 mt-5 text-sm leading-5
             
             max-md:px-5"
      >
        <span className="font-bold">Location</span>
        <span className="font-light">{job.location}</span>
      </div>
      <div className="flex gap-5 justify-between px-8 pt-4 pb-4 text-sm leading-5 border-t border-gray-200 border-solid max-md:px-5">
        <span className="font-bold">Experience</span>
        <span className="font-light">{job.experience}</span>
      </div>
      <div className="flex gap-5 justify-between pt-4 pr-8 pb-4 pl-8 border-t border-gray-200 border-solid max-md:px-5">
        <time className="pt-2.5 pb-1 text-sm font-light leading-5">
          {formatDate(job.created)}
        </time>
        {job.of_type === "REMOTE" && (
          <span className="justify-center self-start px-1.5 text-xs leading-5 whitespace-nowrap rounded border border-solid border-neutral-800 border-opacity-30">
            REMOTE
          </span>
        )}
      </div>
    </div>
  );
}

function JobLayout() {
  const [jobs, setJobs] = React.useState();
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [jobClicked, setJobClicked] = React.useState(false);
  const [selectedJob, setSelectedJob] = React.useState(null);
  const [singleJob, setSingleJob] = React.useState(null);
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [jobCategory, setJobCategory] = React.useState([]);
  const [location, setLocation] = React.useState([]);
  const [jobType, setJobType] = React.useState("");
  const [selectedJobCategory, setSelectedJobCategory] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [filteredJobs, setFilteredJobs] = React.useState([]);

  const fetchJobfilters = () => {
    axios
      .get(`https://revive-production.up.railway.app/jobs/categories/`)
      .then((response) => {
        setJobCategory(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs", error);
      });

    axios
      .get(`https://revive-production.up.railway.app/jobs/locations/`)
      .then((response) => {
        setLocation(response.data);
      })
      .catch((error) => {
        console.error("Error fetching jobs", error);
      });
  };

  const [fields, setFields] = React.useState({
    resume: null,
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    job_role: "none",
  });

  const handleJobClick = (id) => {

    let selectedJob = jobs?.find((job) => job?.pk === id);
    setSelectedJob(id);
    setSingleJob(selectedJob);
    setJobClicked(true);
  };

  const handleBackClick = () => {
    setJobClicked(false);
    setSelectedJob(null);
    setSingleJob(null);

  }

  React.useEffect(() => {
    axios
      .get("https://revive-production.up.railway.app/jobs/jobs/")
      .then((response) => {
        setJobs(response.data.results);
        setFilteredJobs(response.data.results);
      })
      .catch((error) => {
        console.error("Error fetching jobs", error);
      });
    fetchJobfilters();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setFields({ ...fields, resume: file });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
    setErrors([]);
  };

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

  const handleSubmit = (e) => {
    setErrors({});
    let id = selectedJob || selectedJob?.pk;
    e.preventDefault();
    const formData = new FormData();
    formData.append("resume", fields.resume);
    formData.append("first_name", fields.first_name);
    formData.append("last_name", fields.last_name);
    formData.append("email", fields.email);
    formData.append("phone_number", fields.phone_number);
    formData.append("job_role", fields.job_role);
    setIsLoading(true);

    axios
      .post(
        `https://revive-production.up.railway.app/jobs/jobs/${id}/apply/`,
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
        console.error("Error submitting application", error);
        if (error?.response && error.response?.data) {
          const flattenedErrors = Object.entries(error.response.data).flatMap(
            ([key, value]) =>
              value.map((error) => `${fieldsName[key] || key}: ${error}`)
          );
          setErrors(flattenedErrors);
        }
        setIsLoading(false);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedJobCategory(e.target.value);
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    setErrors({})

    e.preventDefault();
    const filtered = jobs.filter((job) => {
      const matchesSearchTerm = job.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      const matchesCategory =
        selectedJobCategory === "" ||
        job.category.toLowerCase().trim() ===
          selectedJobCategory.toLowerCase().trim();
      const matchesLocation =
        selectedLocation === "" ||
        job.location.toLowerCase().trim() ===
          selectedLocation.toLowerCase().trim();

      return matchesSearchTerm && matchesCategory && matchesLocation;
    });
    setFilteredJobs(filtered);
  };
  return (
    <>
      <div className="mx-auto container flex flex-col items-start px-5">
        <h1 className="mt-10 self-center text-7xl font-bold text-center leading-[97.2px] text-zinc-800 max-md:max-w-full max-md:text-4xl">
          Explore our Open Positions
        </h1>

        <div className="flex flex-col items-start self-stretch py-12 pr-20 pl-8 mt-12 w-full rounded-xl bg-neutral-50 max-md:px-5 max-md:mt-10 max-md:max-w-full">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col justify-center items-start px-3 py-4 max-w-full text-lg leading-6 text-gray-400 bg-blue-100 rounded-xl border-2 border-gray-400 border-solid w-[816px] max-md:pr-5"
          >
            <div className="flex gap-3">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c0ce0984d72d5bd9dc940f6d1a53ebbbec1978df7b29879883f190d601b63d2f?apiKey=7b91412e16384e1384258b56fe71fd0b&"
                alt=""
                className="shrink-0 self-start w-6 aspect-square"
              />
              <label htmlFor="search" className="sr-only">
                Search for jobs or keywords
              </label>
              <input
                type="search"
                id="search"
                placeholder="Search for jobs or keywords"
                aria-label="Search for jobs or keywords"
                value={searchTerm}
                onChange={handleSearchChange}
                className="bg-transparent outline-none"
              />
            </div>
          </form>
          <div className="flex gap-5 justify-between mt-4 max-w-full text-zinc-800 w-[816px] max-md:flex-wrap">
            <div className="flex gap-5 self-start text-xl font-bold max-md:flex-wrap">
              <div className="flex flex-col justify-center px-3 py-4 rounded-xl border-2 border-gray-400 border-solid">
                <div className="flex gap-5 justify-between pl-6 max-md:pl-5">
                  <select
                    onChange={handleCategoryChange}
                    id="jobCategory"
                    value={selectedJobCategory}
                    className="bg-transparent outline-none"
                  >
                    <option value="">Job Category</option>
                    {jobCategory?.length &&
                      jobCategory?.map((cat) => {
                        return (
                          <option key={cat.name + cat.id} value={cat.name}>
                            {cat.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
              <div className="flex flex-col justify-center px-3 py-4 whitespace-nowrap rounded-xl border-2 border-gray-400 border-solid">
                <div className="flex gap-5 justify-between pl-6 max-md:pl-5">
                  <select
                    onChange={handleLocationChange}
                    id="location"
                    value={selectedLocation}
                    className="bg-transparent outline-none"
                  >
                    <option value="">Location</option>
                    {location?.length &&
                      location?.map((loc) => {
                        return (
                          <option key={loc.name + loc.id} value={loc.name}>
                            {loc.name}
                          </option>
                        );
                      })}
                  </select>
                </div>
              </div>
            </div>
            <button
              onClick={handleSearchSubmit}
              disabled={isLoading}
              type="submit"
              className="justify-center px-6 py-3 text-2xl font-medium leading-8 whitespace-nowrap bg-teal-400 rounded-[40px] max-md:px-5"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex max-md:flex-col">
        
        <div className="w-7/12 p-4 max-md:w-full">
  {!jobClicked && (
    <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1 max-md:gap-0">
      {filteredJobs?.map((job, index) => (
        <div
          onClick={() => {
            handleJobClick(job.pk);
          }}
          key={index}
          className="cursor-pointer flex flex-col"
        >
          <JobCard job={job} />
        </div>
      ))}
    </div>
  )}
  {jobClicked && singleJob && (
    <div className="flex gap-5 max-md:flex-col max-md:gap-0">
      <div className="flex flex-col px-5 text-zinc-800">
        <div className="flex items-center justify-between w-full max-md:max-w-full">
          <div
            onClick={handleBackClick}
            className="flex items-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <div className="text-3xl font-bold leading-10 max-md:max-w-full">
              {singleJob.title}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-8 py-1.5 mt-11 max-w-full w-[244px] max-md:px-5 max-md:mt-10">
          <div className="flex gap-5 justify-between text-sm leading-5">
            <div className="font-bold">Location</div>
            <div className="font-light">{singleJob.location}</div>
          </div>
          <div className="flex gap-5 justify-between mt-2.5 text-sm leading-5">
            <div className="font-bold">Experience</div>
            <div className="font-light">
              {singleJob?.experience}
            </div>
          </div>
          <div className="flex gap-4 pr-3.5 mt-2.5">
            <div className="text-sm font-light leading-5">
              15 hours ago
            </div>
            <div className="justify-center px-1.5 text-xs leading-5 whitespace-nowrap rounded border border-solid border-neutral-800 border-opacity-30">
              {singleJob?.of_type}
            </div>
          </div>
        </div>
        <div className="mt-12 w-full text-lg leading-6 text-gray-600 max-md:mt-10 max-md:max-w-full">
          <div>
            <span className="font-bold">Job Description:</span>
            <div
              dangerouslySetInnerHTML={{
                __html: singleJob?.body,
              }}
            ></div>
          </div>
          <br />
          <div className="mt-5 text-sm italic">
           <span > All applicant data submitted is handled in accordance
           with our</span>{" "}
            <span className="text-blue-600 underline">
              Applicant Privacy Policy
            </span>
            <span className="text-blue-600">.</span>
          </div>
        </div>
      </div>
    </div>
  )}
</div>


          <div className="w-5/12 p-4 max-md:w-full">
            {!jobClicked && (
              <>
                <div className="max-md:w-full">
                  <section className="flex flex-col px-8 py-10 text-lg leading-6 rounded-3xl bg-slate-200 max-w-[585px] text-zinc-800 max-md:px-5">
                    <h1 className="text-3xl leading-10 max-md:max-w-full">
                      Join Our Team at Revive Analytics
                    </h1>
                    <p className="mt-5 max-md:max-w-full">
                      We're on the hunt for passionate individuals who share our
                      excitement for building a platform that empowers the next
                      generation of online creators to thrive. If you're ready
                      to be part of a team that's shaping the future of online
                      success, we want you on board! Join us and contribute to
                      creating a platform that enables creators to reach new
                      heights in their online endeavors.
                    </p>
                    <img
                      loading="lazy"
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/b87b064f2c74db7099f15073049b3ae739e55f80ceaa7924a7155c629efe3bba?apiKey=7b91412e16384e1384258b56fe71fd0b&"
                      alt="Revive Analytics team"
                      className="mt-11 w-full aspect-[3.13] max-md:mt-10 max-md:max-w-full"
                    />
                    <h2 className="mt-12 text-3xl leading-10 max-md:mt-10 max-md:max-w-full">
                      Why Choose Revive Analytics?
                    </h2>
                    <div className="mt-12 max-md:mt-10 max-md:max-w-full">
                      <BenefitItem title="Collaborative Culture" />
                      <p className="text mb-4">
                        {" "}
                        We foster a culture of teamwork and collaboration, where
                        diverse perspectives are valued, and every voice is
                        heard. Together, we tackle complex problems and find
                        innovative solutions.
                      </p>

                      <BenefitItem title="Continuous Learning">
                      <p className="text mb-4">  In the fast-paced world of analytics, learning never
                        stops. At Revive Analytics, we're dedicated to your
                        professional growth, offering workshops, training
                        programs, and mentorship opportunities to help you
                        thrive in your career. </p>
                      </BenefitItem>
                      <BenefitItem title="Impactful Work">
                      <p className="text mb-4"> What we do at Revive Analytics matters. Whether we're
                        helping businesses make informed decisions or driving
                        social change through data-driven insights, our work has
                        a real-world impact. Join us and be part of something
                        meaningful. </p>
                      </BenefitItem>
                    </div>
                    <h2 className="mt-14 font-bold  text-4xl leading-[50px] max-md:mt-10 max-md:max-w-full">
                      If you don't see the perfect role listed, don't worry!
                    </h2>
                    <p className="mt-5  bg-clip-text bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] max-md:max-w-full">
                      Send your profile over to{" "}
                      <a style={{ backgroundImage: 'linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)', WebkitBackgroundClip: 'text', color: 'transparent' }} href="mailto:careers@reviveanalytics.com">
                        careers@reviveanalytics.com
                      </a>{" "}
                      or <Link style={{ backgroundImage: 'linear-gradient(126deg, #1862F7 -107.15%, #3DD6C4 98.8%)', WebkitBackgroundClip: 'text', color: 'transparent' }} href="https://reviveanalytics.com/contact">Click here</Link> We'll get back to you.
                    </p>
                  </section>
                </div>
              </>
            )}
            {jobClicked && (
              <>
                <div className="flex flex-col justify-end pt-10 rounded-3xl bg-slate-200 max-w-[585px]">
                  <div className="self-start ml-8 text-3xl font-bold leading-10 text-zinc-800 max-md:ml-2.5">
                    Apply for this job
                  </div>
                  <div className="flex flex-col items-center px-8 pt-9 pb-3.5 mt-7 w-full rounded-none bg-stone-50 max-md:px-5 max-md:max-w-full">
                    <div>
                      {errors.length > 0 && (
                        <div>
                          <h3>Errors:</h3>
                          {errors?.map((error, index) => (
                            <p key={index} style={{ color: "red" }}>
                              {error}
                            </p>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col mt-10 rounded-3xl max-md:max-w-full">
                      {isSubmitted && <span style={{color: 'rgb(17,94,89)', fontSize: '26px', paddingBottom: '4rem'}}> Thank you! Your Application has been submitted succesfully. </span>}
                      {!isSubmitted && <><form onSubmit={handleSubmit}>
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
                            Upload in either DOC, DOCX or PDF file format (file
                            size not more than 2MB)
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
                                required
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
                                required
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
                            required
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
                            htmlFor="phone_number"
                            className="mt-5 text-lg leading-6 text-zinc-800 max-md:max-w-full"
                          >
                            Number*
                          </label>
                          <input
                            type="number"
                            required
                            onChange={handleOnChange}
                            name="phone_number"
                            id="phone_number"
                            placeholder="Phone Number"
                            aria-label="Phone Number"
                            className="justify-center items-start px-5 py-4 mt-1.5 text-base leading-6 text-gray-400 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full"
                          />
                        </div>
                        <div className="flex gap-1.5 mt-5 text-lg leading-6 text-blue-600 max-md:flex-wrap">
                          <input
                            required
                            type="checkbox"
                            id="privacyNotice"
                            className="shrink-0 my-auto border-2 border-blue-600 accent-blue-600"
                            name="privacyNotice"
                          />
                          <label htmlFor="privacyNotice" className="text-base">
                            I have read and agree to{" "}
                            <span className="underline">
                              Applicant Privacy Notice
                            </span>
                            <span className="text-blue-600">.</span>
                          </label>
                        </div>
                        <button
                          disabled={isLoading}
                          type="submit"
                          className="justify-center items-center self-start w-full px-5 py-4 mt-4 text-lg font-bold leading-6 text-white rounded-md border-0 cursor-pointer bg-blue-600 max-md:max-w-full"
                        >

                          {isLoading ? "Please wait..." : " Submit Application"}
                         
                        </button>
                      </form></>}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function CareersPage(props) {
  return (
    <>
      <CustomCursor />
      <NavBar />
      <div className="relative">
        <div
          className="h-[500px] bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/f84837757b50b03161ed24a49a04202070fa6749b8ede13db474af0c4296a07d?apiKey=7b91412e16384e1384258b56fe71fd0b&')`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="relative text-white text-6xl font-bold">
              Join Our Team
              <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
            </h1>
          </div>
        </div>
      </div>
      <JobLayout />

      <div>
        <FooterComponent />
      </div>
    </>
  );
}

export default CareersPage;
