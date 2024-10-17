"use client";
import * as React from "react";
import FooterComponent from "@/components/Footer";
import NavBar from "@/components/header/Navbar";
import ContactBanner from "@/components/ContactBanner";
import CustomCursor from "../../components/CustomCursor";
import Link from "next/link";
import axios from "axios";

function SerarchBox() {
  const [searchTerm, setSearchTerm] = React.useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className=" mt-5 mb-5 flex flex-col justify-center items-start px-6 py-3.5 bg-zinc-300 rounded-[40px] max-md:px-5">
      <input
        style={{ backgroundColor: "#d4d4d8" }}
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="w-full px-4 py-2 text-neutral-900 bg-white rounded-full focus:outline-none"
      />
    </div>
  );
}
function LoadMoreButton() {
  return (
    <button className="flex mt-5 justify-center gap-2 px-5 text-xl font-medium leading-8">
      <span className="my-auto bg-clip-text bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-blue-400 to-teal-300">
        Load more
      </span>
    </button>
  );
}

function BlogCard({ post }) {
  return (
    <Link href={`/blog/${post.pk}`}>
      <article className="flex flex-col grow py-5 w-full text-lg font-bold rounded-3xl border border-gray-400 border-solid bg-neutral-200 text-zinc-800 max-md:max-w-full cursor-pointer">
        <img
          src={post.image || null}
          alt={post.title}
          className="mx-5 aspect-[1.52] max-md:mx-2.5"
        />
        <div className="flex flex-col px-5 mt-14 max-md:mt-10 max-md:max-w-full">
          <div className="flex gap-1.5 self-start text-base font-medium leading-6 text-center text-zinc-500">
            <img
              src={"https://cdn.builder.io/api/v1/image/assets/TEMP/b73d192b7546f815fb554e489443c5aa40dbd99b92d7e58cd562632447576d2a?apiKey=7b91412e16384e1384258b56fe71fd0b&"}
              alt=""
              className="shrink-0 w-6 aspect-square"
            />
            <div>
              <span className="leading-6">{post.comments_count}</span>{" "}
              <span className="leading-6 text-zinc-500">Comments</span>
            </div>
          </div>
          <h3 className="mt-3 text-2xl leading-8">{post.title}</h3>
          <p className="mt-3 leading-6">{post.description}</p>
          <div className="underline underline-offset-8 mt-5 decoration-sky-500">
            CONTINUE READING
          </div>
        </div>
        <img
          src={post.decorativeImage}
          alt=""
          className="ml-5 max-w-full aspect-[100] stroke-[2px] stroke-blue-600 w-[150px] max-md:ml-2.5"
        />
      </article>
    </Link>
  );
}

function BlogPage(props) {
  const [posts, setPosts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(false);

  React.useEffect(() => {
    const fetchPosts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get(`https://revive-production.up.railway.app/blogs/posts/?page=${currentPage}`);
            setIsLoading(false);
            if(currentPage === 1){
                setPosts(prevPosts => [...response?.data?.results]);

            }else {
                setPosts(prevPosts => [...prevPosts, ...response?.data?.results]);

            }
            setHasMore(!!response?.data?.next); // If `next` is not null, there are more posts to load
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    fetchPosts();
}, [currentPage]);



  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
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

        <div className=" flex flex-col items-center self-center w-full max-w-[1816px] max-md:max-w-full">
          <div className="flex gap-5 justify-between mt-28 w-full max-w-[1663px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full">
            <div className="flex flex-col flex-1 px-5 max-md:max-w-full">
              <div className="text-6xl font-bold text-center capitalize leading-[90px] text-zinc-800 max-md:max-w-full max-md:text-4xl max-md:leading-[62px]">
                Welcome to Insights Hub: Unveiling the Power of Data Knowledge
              </div>
              <div className="mt-10 text-xl font-medium leading-8 text-center text-zinc-800 max-md:max-w-full">
                {" "}
                At Revive Analytics, we believe that knowledge is the key to
                unlocking the full potential of data. Welcome to our Insights
                Hub, where we're thrilled to share a wealth of information,
                expertise, and thought leadership through our blogs and
                podcasts. This space is designed to be a dynamic resource for
                business leaders, data enthusiasts, and anyone eager to delve
                into the world of data analytics.
                <br />
              </div>

              <SerarchBox />

              <div className=" flex flex-col">
                <div className="px-5 w-full max-md:max-w-full">
                  <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                    {posts.map((post, index) => (
                      <div
                        key={index}
                        className={`flex flex-col ${
                          index === 1 ? "ml-5" : ""
                        } w-[33%] max-md:ml-0 max-md:w-full`}
                      >
                        <BlogCard post={post} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex flex-col flex-1 px-5 max-md:max-w-full">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    hasMore && <LoadMoreButton onClick={handleLoadMore} />
                )}
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

export default BlogPage;
