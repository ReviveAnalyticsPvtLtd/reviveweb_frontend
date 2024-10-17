"use client";
import * as React from "react";
import FooterComponent from "@/components/Footer";
import NavBar from "@/components/header/Navbar";
import ContactBanner from "@/components/ContactBanner";
import CustomCursor from "../../../components/CustomCursor";
import { useParams } from "next/navigation";
import axios from "axios";
import { formatDate } from "../../../utils/index";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { ShareSocial } from "react-share-social";
import "./musicplayer.css"
function MusicPlayer({url}) {

  function extractTitle(url) {
    // Define the regular expression pattern to match the desired part of the URL
    const pattern = /revive\/revive\/(.*?)_\d{4}-\d{2}-\d{2}/;
    
    // Execute the pattern on the provided URL
    const match = url?.match(pattern);
    
    // Check if there's a match and return the first capture group without special characters
    if (match && match[1]) {
        // Remove special characters using a regular expression
        return match[1].replace(/[^a-zA-Z0-9]/g, ' ');
    }
    
    // Return null if no match is found
    return null;
}



  return (
    <div
      style={{
        backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/b579c669e56f0666fbd7c6101f244c7e2a93bd2f5f45a2eaec1d77df17d5fd97?apiKey=7b91412e16384e1384258b56fe71fd0b')`,
      }}
      className="p-2.5 rounded-md border-2 border-teal-400 border-solid max-md:pl-5 max-md:max-w-full"
    >
      <div className="flex gap-5 max-md:flex-col max-md:gap-0">
        <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
          <div className="flex justify-center items-center self-stretch px-2.5 m-auto rounded-xl bg-[linear-gradient(126deg,#1862F7_-107.15%,#3DD6C4_98.8%)] h-[185px] w-[185px] max-md:mt-10">
            <img
              loading="lazy"
              srcSet="https://i.ibb.co/YcF4qP1/Frame-46-1.png"
              className="aspect-[2.08] w-[166px]"
            />
          </div>
        </div>
        <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
          <div className="flex flex-col grow max-md:mt-10 max-md:max-w-full">
            <div className="text-3xl font-bold leading-10 text-white max-md:max-w-full">
           { extractTitle(url)}
            </div>
            <div className="flex gap-5 items-start mt-14 max-md:flex-wrap max-md:mt-10">
              <div className="flex flex-auto gap-5 self-start max-md:flex-wrap">
                
                <AudioPlayer
                  style={{
                    '--rhap-theme-color': '#d00909',
                    '--rhap-background-color': '#d00909',
                    '--rhap-bar-color': '#d00909',
                    '--rhap-time-color': '#333',
                    '--rhap-font-family': 'inherit'

                  }}
                  autoPlay={false}
                  src={url} // Replace with your audio file path
                  onPlay={e => console.log("onPlay")}
                  // other props you want to add
                />
                 
              </div>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlogDetailPage(props) {
  const params = useParams();
  const id = params.id;
  const [post, setPost] = React.useState({});

  React.useEffect(() => {
    axios
      .get(`https://revive-production.up.railway.app/blogs/posts/${id}`)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const [commentData, setCommentData] = React.useState({
    name: "",
    email: "",
    comment: "",
  });
  const [errors, setErrors] = React.useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value });
    setErrors([]);
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    try {
      axios
        .post(
          `https://revive-production.up.railway.app/blogs/posts/${id}/add_comment/`,
          commentData
        )
        .then((response) => {
          setPost({
            ...post,
            comments: [...post.comments, response.data],
          });
        });
    } catch (error) {
      if (error.response && error.response.data) {
        const flattenedErrors = Object.entries(error.response.data).flatMap(
          ([key, value]) =>
            value.map((error) => `${fieldsName[key] || key}: ${error}`)
        );
        setErrors(flattenedErrors);
      }
    }
  };

  return (
    <>
      <CustomCursor />
      <div className="flex flex-col bg-gray-200">
        <NavBar />
        <div className="relative">
          <div
            className="h-[500px] bg-cover bg-no-repeat"
            style={{
              backgroundImage: `url('https://cdn.builder.io/api/v1/image/assets/TEMP/b579c669e56f0666fbd7c6101f244c7e2a93bd2f5f45a2eaec1d77df17d5fd97?apiKey=7b91412e16384e1384258b56fe71fd0b')`,
            }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="relative text-white text-6xl font-bold">
                Blog
                <span className="absolute inset-0 bg-white bg-opacity-10 blur-sm"></span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <div className="flex flex-col text-lg  text-zinc-500 mt-10">
          <div className="flex gap-5 justify-between px-5 w-full max-md:flex-wrap max-md:max-w-full">
            <div className="my-auto">
              {post.created && formatDate(post.created)}
            </div>
            
            {/* <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/fad9e4c6fb1a4cd2a8afc119e2f077d2430563072db6b60305da43fbaaa4c3e5?apiKey=7b91412e16384e1384258b56fe71fd0b&"
              className="shrink-0 aspect-square w-[47px]"
            /> */}
          </div>

          {post?.podcast_mp3 && (<><div className="mt-4 mb-4 w-full bg-gray-400 border border-gray-400 border-solid min-h-[1px] max-md:max-w-full" />

<MusicPlayer url={post?.podcast_mp3} /></>)}
          
          <div className="mt-4 mb-4  w-full bg-gray-400 border border-gray-400 border-solid min-h-[1px] max-md:max-w-full" />

          <div className="flex flex-col flex-start text-zinc-800">
            <div className="w-full text-4xl font-bold leading-[50.04px] max-md:max-w-full">
              {post?.title}
            </div>
          </div>
          <div dangerouslySetInnerHTML={{ __html: post?.body }}></div>
        </div>

        <div className=" mt-10 flex flex-col px-5">
          <div className="self-start text-2xl leading-8 text-zinc-800">
            Share This Post
          </div>
          {/* <LinkedinShareButton /> */}

          <div className="flex gap-5 self-start mt-2.5">
            <ShareSocial
              style={{
                root: {
                  background: "#eaeaea",
                  padding: "0px",
                },
                copyContainer: {
                  display: "none",
                  padding: "0px",
                },
              }}
              url={window?.location.href}
              socialTypes={["facebook", "twitter", "linkedin", "email"]}
            />
            {/* <div className="flex justify-center items-center p-3 w-11 h-11 bg-cyan-600 rounded-md">
              <LinkedinShareButton />
            </div>
            <div className="flex justify-center items-center p-3 w-11 h-11 bg-green-400 rounded-md">
              <WhatsappShareButton />
            </div>
            <div className="flex justify-center items-center p-3 w-11 h-11 rounded-md bg-neutral-900">
              <TwitterShareButton />
            </div>
            <div className="flex justify-center items-center p-3 w-11 h-11 rounded-md bg-slate-500">
              <FacebookShareButton />
            </div>
            <div className="flex justify-center items-center p-3 w-11 h-11 rounded-md bg-neutral-600">
              <EmailShareButton />
            </div> */}
          </div>
          <div className="mt-10 w-full bg-gray-400 border border-gray-400 border-solid min-h-[1px] max-md:max-w-full" />

          <div className="mt-9 w-full text-xs tracking-tighter text-gray-400 max-md:max-w-full">
            <div className="mt-3.5 w-full text-2xl leading-8 text-zinc-800 max-md:max-w-full">
              {post?.comments_count} Comments
            </div>
          </div>

          {post?.comments?.map((item) => {
            return (
              <div className="flex mt-5 mb-5 text-lg leading-6 max-md:flex-wrap">
                <div className="flex items-center justify-center w-1/20 mr-5">
                  <div className="inline-flex items-center justify-center w-12 h-12 text-xl text-white bg-indigo-500 rounded-full">
                    {item.name.charAt(0)}{" "}
                  </div>
                </div>

                <div className="flex flex-col w-19/20 max-md:max-w-full">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-zinc-800 max-md:max-w-full">
                      {item.name}
                      <div className="text-xs leading-5 text-zinc-800 max-md:max-w-full">
                        {formatDate(item.created)}
                      </div>
                    </div>
                  </div>
                  <div className="text-zinc-800 max-md:max-w-full">
                    {item.comment}
                  </div>
                </div>
              </div>
            );
          })}

          <form onSubmit={handleSubmitComment}>
            <div className="flex flex-col px-20 py-11 mt-12 w-full text-base leading-6 bg-slate-100 text-zinc-800 max-md:px-5 max-md:mt-10 max-md:max-w-full">
              <div className="text-2xl max-md:max-w-full">Leave a Reply</div>
              <div className="mt-5 text-lg font-light leading-5 max-md:max-w-full">
                Your email address will not be published.
              </div>
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

              <div className="flex flex-col mt-5 px-5 pt-5 pb-5 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full">
                <label htmlFor="comment" className="text-gray-400">
                  Comment*
                </label>
                <textarea
                  required
                  onChange={handleOnChange}
                  name="comment"
                  id="comment"
                  rows="4"
                  className="mt-2 px-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="flex gap-5 mt-5 text-gray-400 max-md:flex-wrap max-md:max-w-full">
                <div className="flex-1 flex flex-col px-5 py-4 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full">
                  <label htmlFor="name" className="text-gray-400">
                    Name*
                  </label>
                  <input
                    required
                    onChange={handleOnChange}
                    name="name"
                    id="name"
                    type="text"
                    className="mt-2 px-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="flex-1 flex flex-col px-5 py-4 bg-blue-100 rounded-md border border-gray-200 border-solid max-md:pr-5 max-md:max-w-full">
                  <label htmlFor="email" className="text-gray-400">
                    Email Address*
                  </label>
                  <input
                    required
                    onChange={handleOnChange}
                    name="email"
                    id="email"
                    type="email"
                    className="mt-2 px-4 py-2 bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                onClick={handleSubmitComment}
                type="submit"
                className="justify-center btn self-start px-4 text-xl py-3.5 mt-5 bg-teal-400 rounded-[40px] text-white bold"
              >
                Post Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="flex  bg-gray-200">
        <div className=" container mx-auto ">
          <ContactBanner />
        </div>{" "}
      </div>
      <div>
        <FooterComponent />
      </div>
    </>
  );
}

export default BlogDetailPage;
