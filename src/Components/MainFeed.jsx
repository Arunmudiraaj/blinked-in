import { useEffect, useState, useRef } from "react";
import PostBox from "./PostBox";
import PostModal from "./PostModal";
import styled from "styled-components";
import Article from "./Article";
import { postsActions } from "../store/postsSlice";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import spinner from "../assets/Images/spinner.svg";
import tick from "../assets/Images/tick.png";
const MainFeed = () => {
  const firstRender = useRef(true);
  const [dataFromBE, setDataFromBE] = useState([]);
  const [showBottom, setShowBottom] = useState(false);
  const [loadPosts, setLoadPosts] = useState([]);
  const allPosts = useSelector((state) => state.allPosts.posts);
  const load = useSelector((state) => state.allPosts.isLoading);
  const dispatch = useDispatch();
  const [createPost, setCreatePost] = useState(false);
  const showCreatePost = () => {
    setCreatePost(true);
  };
  const closeCreatePost = () => {
    setCreatePost(false);
  };
  useEffect(() => {
    const getData = async () => {
      const queryInOrder = query(
        collection(db, "AllPosts"),
        orderBy("timestamp", "desc")
      );
      const data = await getDocs(queryInOrder);

      const allPosts = data.docs.map((doc) => {
        const d = {
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
        };
        return d;
      });

      setDataFromBE(allPosts);
      setLoadPosts([0, 4]);
      console.log("initial");

      // dispatch(postsActions.setAllPosts(allPosts));
    };
    getData();
  }, []);
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 100 >=
      document.documentElement.scrollHeight
    ) {
      setLoadPosts((pre) => [pre[0] + 4, pre[1] + 4]);
    }
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      !showBottom
    ) {
      setShowBottom(true);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
    } else {
      let posts = dataFromBE.slice(loadPosts[0], loadPosts[1]);
      if (posts.length > 0) {
        console.log("initial");
        dispatch(postsActions.addPosts(posts));
      }
      // console.log("useEffect called on subsequent renders");
    }
  }, [loadPosts]);
  return (
    <Container>
      {createPost && <PostModal closeit={closeCreatePost} />}
      <PostBox show={showCreatePost} />
      {load && (
        <Spinner>
          <img src={spinner} />
        </Spinner>
      )}

      {allPosts.map((post) => (
        <Article key={post.id} post={post} />
      ))}
      {showBottom && (
        <Bottom>
          <img src={tick} />
          <div>You're All Caught Up</div>
          <span>You've seen it all. You've missed nothing</span>
        </Bottom>
      )}
    </Container>
  );
};

const Bottom = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  /* margin: 1rem 0; */
  border: 1px solid black;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%-1rem;
  max-width: 20rem;
  margin: auto;
  div {
    font-size: large;
    font-weight: 600;
  }
  span {
  }
  img {
    margin-bottom: 0.5rem;
  }
`;
const Container = styled.div`
  width: 100%;
`;
const Spinner = styled.div`
  text-align: center;
  padding-top: 0.4rem;
`;

export default MainFeed;
