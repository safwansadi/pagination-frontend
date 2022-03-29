import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
//app
import Posts from "./components/Posts";
import Pagination from "./components/Pagination";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
      setPosts(res.data);
      setLoading(false);
    };

    fetchPosts();
  }, []);
  console.log(posts);

  const handleNextButton = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleBackButton = () => {
    setCurrentPage(currentPage - 1);
  };
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-5">
      <h1>See Posts</h1>
      <Posts posts={currentPosts} loading={loading} />
      {currentPosts.length == postsPerPage ? (
        <div>
          <button onClick={() => handleBackButton()}>back</button>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            paginate={paginate}
          />
          <button onClick={() => handleNextButton()}>Next</button>
        </div>
      ) : (
        <button onClick={() => handleBackButton()}>back</button>
      )}
    </div>
  );
}

export default App;
