import styled from "styled-components";
import { AiFillLike } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { useState } from "react";
import ReactPlayer from "react-player";
import { useRef } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { postsActions } from "../store/postsSlice";
import { BiCommentDetail } from "react-icons/bi";
const Article = (props) => {
  const commentRef = useRef();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const post = props.post;
  const [showComments, setShowComments] = useState(false);
  const displayComments = () => {
    setShowComments(true);
  };
  const closeComments = () => {
    setShowComments(false);
  };
  const backdropClicked = (e) => {
    if (e.target.id === "backdrop") {
      setShowComments(false);
    }
  };
  const postCommentHandler = async () => {
    const text = commentRef.current.value;
    if (text === "") {
      alert("Comment cannot be empty");
      return;
    }
    const comment = { ...user, comment: text, id: Math.random().toString() };
    const articleDoc = doc(db, "AllPosts", post.id);
    const newComments = [...post.comments, comment];
    dispatch(postsActions.addComment({ id: post.id, comment: comment }));
    await updateDoc(articleDoc, { comments: newComments });

    commentRef.current.value = "";
  };
  return (
    <Container>
      <User>
        <img src={post.author.photoUrl} />
        <div>
          <span>{post.author.name}</span>
          <div>{post.author.email}</div>
          <div>{post.timestamp}</div>
        </div>
      </User>
      <Caption>{post.caption}</Caption>

      <SharedMedia>
        {post.imgUrl && <img src={post.imgUrl} />}
        {post.videoUrl && (
          <ReactPlayer
            url={post.videoUrl}
            width={"100%"}
            style={{ objectFit: "contain" }}
          />
        )}
      </SharedMedia>
      <Interactions>
        <Likes>
          <AiFillLike size={"1.5rem"} color="#0a66c2" /> <span>17</span>
        </Likes>
        <Comments onClick={displayComments}>
          <BiCommentDetail size={"1.5rem"} />{" "}
          <span>{post.comments.length}</span>
        </Comments>
      </Interactions>
      {showComments && (
        <CommentSection onClick={backdropClicked} id="backdrop">
          <Modal>
            <Close onClick={closeComments}>X</Close>
            <Title>Comments Under {post.author.name}'s post</Title>
            <div
              style={{ backgroundColor: "black", height: "1px", margin: "2px" }}
            />
            <AllComments>
              {post.comments.length === 0 ? (
                <NoComments>
                  {"No comments yet. Be the first one to comment :)"}
                </NoComments>
              ) : (
                post.comments.map((item) => (
                  <Comment key={item.id}>
                    <div>
                      <img src={item.photoUrl} />
                    </div>
                    <CommentBody>
                      <Top>
                        <b>{item.name}</b>
                        {/* <span>aiuehviu@44gmail.com</span> */}
                      </Top>
                      <CommentText>{item.comment}</CommentText>
                    </CommentBody>
                  </Comment>
                ))
              )}
              <CommentInput>
                <img src={user.photoUrl} />
                <input ref={commentRef} placeholder="Post your comment" />
                <button onClick={postCommentHandler}>post</button>
              </CommentInput>
            </AllComments>
          </Modal>
        </CommentSection>
      )}
    </Container>
  );
};
const NoComments = styled.div`
  font-size: large;
  text-align: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  margin-top: 1rem;
`;
const Top = styled.div`
  height: 2rem;
  display: flex;
  align-items: center;
  font-size: smaller;
  & > b {
    font-size: 1rem;
  }
`;
const CommentText = styled.div`
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  font-size: small;
`;
const CommentBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* gap: 0.4rem; */
`;
const CommentInput = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 0.8rem 1rem;
  img {
    width: 2rem;
    border-radius: 50%;
  }
  input {
    height: 2rem;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    box-sizing: border-box;
    outline: none;
    flex-grow: 1;
    border: 1px solid black;
  }
  button {
    background-color: #0a66c2;
    color: white;
    font-weight: 600;
    outline: none;
    border: none;
    border-radius: 0.5rem;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
    &:hover {
      opacity: 0.9;
    }
  }
`;

const Container = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  margin: 1rem 0;
  padding: 1rem;
  padding-bottom: 0.6rem;
  width: 100%-1rem;
`;
const User = styled.div`
  font-size: smaller;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 1rem;
  & > img {
    width: 3rem;
  }
  & > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
  }
  span {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 800;
  }
`;
const Caption = styled.div`
  margin: 0.3rem 0;
`;
const SharedMedia = styled.div`
  img {
    width: 100%;
    /* max-height: 100vh; */
    object-fit: contain;
  }
`;
const Interactions = styled.div`
  display: flex;
  margin-top: 0.2rem;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;
  padding: 0.4rem 0.6rem 0.2rem 0.6rem;
  font-size: medium;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
`;
const Likes = styled.span`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  align-items: center;
  cursor: pointer;
`;
const Comments = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  align-items: center;
  cursor: pointer;
`;
const CommentSection = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Modal = styled.div`
  position: relative;
  background-color: #f5f5f5;
  width: 90%;
  max-width: 35rem;
  height: 80vh;
  border-radius: 0.5rem;
`;
const Close = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  height: 2rem;
  width: 2rem;
  text-align: center;
`;
const Title = styled.div`
  height: 2.5rem;
  font-weight: 600;
  font-size: large;
  display: flex;
  font-family: cursive;
  align-items: center;
  justify-content: center;
`;
const AllComments = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: auto;
  height: 80%;
  gap: 0.5rem;
  &::-webkit-scrollbar {
    width: 0.3em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #4084c8;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #0a66c2;
  }
`;
const Comment = styled.div`
  box-sizing: border-box;
  background-color: white;
  gap: 5px;
  border-radius: 0.5rem;
  width: 100%;
  padding: 0.5rem;
  border: 1px solid black;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  & > div > img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }
`;

export default Article;
