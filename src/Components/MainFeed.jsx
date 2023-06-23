import { useEffect, useState } from "react";
import PostBox from "./PostBox";
import PostModal from "./PostModal";
import styled from "styled-components";
import Article from "./Article";
import { postsActions } from "../store/postsSlice";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
const MainFeed = () => {
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
      console.log(data.docs);
      const allPosts = data.docs.map((doc) => {
        const d = {
          ...doc.data(),
          id: doc.id,
          timestamp: doc.data().timestamp.toDate().toLocaleDateString(),
        };
        return d;
      });
      console.log(allPosts);
      dispatch(postsActions.setAllPosts(allPosts));
    };
    getData();
  }, []);
  return (
    <Container>
      {createPost && <PostModal closeit={closeCreatePost} />}
      <PostBox show={showCreatePost} />
      {load && (
        <Spinner>
          <img src="/public/Images/spinner.svg" />
        </Spinner>
      )}

      {allPosts.map((post) => (
        <Article key={post.id} post={post} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
`;
const Spinner = styled.div`
  text-align: center;
  padding-top: 0.4rem;
`;

export default MainFeed;
