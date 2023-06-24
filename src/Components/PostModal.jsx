import { useState } from "react";
import styled from "styled-components";
import { BsFillImageFill, BsCameraVideoFill } from "react-icons/bs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage, db } from "../firebase";
import { v4 } from "uuid";
import { postsActions } from "../store/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import ReactPlayer from "react-player";
const PostModal = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

  const [media, setMedia] = useState("");
  const [shareImage, setShareImage] = useState("");
  const [desc, setDesc] = useState("");
  const [vidurl, setVidurl] = useState("");
  const handleImageChange = (e) => {
    const image = e.target.files[0];

    if (image === "" || image === undefined) {
      alert(`Not an image, the file is a ${typeof image}`);
      return;
    }
    setShareImage(image);
  };

  const postHandler = async () => {
    if (!shareImage && !vidurl && !desc) {
      alert(
        "All the fields cannot be empty. Try adding image or video url or a caption"
      );
      return;
    }
    props.closeit();
    dispatch(postsActions.startLoading());
    const postsCollection = collection(db, "AllPosts");
    if (shareImage) {
      console.log(shareImage);
      const imgRef = ref(storage, `images/${shareImage.name + v4()}`);
      uploadBytes(imgRef, shareImage).then(async () => {
        const url = await getDownloadURL(imgRef);
        const post = {
          author: user,
          imgUrl: url,
          videoUrl: "",
          caption: desc,
          likes: [],
          comments: [],
          timestamp: serverTimestamp(),
        };
        const postRef = await addDoc(postsCollection, post);
        const postPath = doc(db, "AllPosts", postRef.id);
        const postData = await getDoc(postPath);
        const newData = postData.data();
        newData.timestamp = newData.timestamp.toDate().toLocaleDateString();
        const postDispatch = { ...newData, id: postData.id };
        dispatch(postsActions.addPost(postDispatch));
        dispatch(postsActions.stopLoading());
      });
    } else {
      const post = {
        author: user,
        imgUrl: "",
        videoUrl: vidurl,
        caption: desc,
        likes: [],
        comments: [],
        timestamp: serverTimestamp(),
      };
      const postRef = await addDoc(postsCollection, post);
      const postPath = doc(db, "AllPosts", postRef.id);
      const postData = await getDoc(postPath);
      const newData = postData.data();
      newData.timestamp = newData.timestamp.toDate().toLocaleDateString();
      const postDispatch = { ...newData, id: postData.id };
      dispatch(postsActions.addPost(postDispatch));
      dispatch(postsActions.stopLoading());
    }
  };

  return (
    <Backdrop>
      <Modal>
        <Header>
          <span>Create a Post</span>
          <button
            onClick={() => {
              props.closeit();
            }}
          >
            X
          </button>
        </Header>
        <div
          style={{
            height: "1px",
            backgroundColor: "black",
          }}
        />
        <User>
          <img src={user.photoUrl} />
          <span>{user.name}</span>
        </User>
        <textarea
          rows={3}
          placeholder="What do you want to talk about"
          style={{ resize: "none" }}
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        />
        <FileInput
          id="photo"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageChange}
          accept="image/gif, image/jpeg, image/png"
          onClick={(e) => {
            e.target.value = null;
          }}
        />
        {media === "photo" && <label htmlFor="photo">Choose a photo</label>}
        {shareImage && (
          <ImgContainer>
            <img
              src={URL.createObjectURL(shareImage)}
              style={{ width: "100%" }}
            />
          </ImgContainer>
        )}
        {vidurl && (
          <VidContainer>
            <ReactPlayer url={vidurl} width={"100%"} height={"20rem"} />
          </VidContainer>
        )}
        {media === "video" && (
          <VideoLink
            type="text"
            placeholder="Please input a video link"
            value={vidurl}
            onChange={(e) => {
              setVidurl(e.target.value);
            }}
          />
        )}
        <Buttons>
          <MediaButtons>
            <button
              onClick={() => {
                setMedia("photo");
                setVidurl("");
              }}
            >
              <BsFillImageFill height={"sm"} width={"sm"} />
            </button>

            <button
              onClick={() => {
                setShareImage("");
                setMedia("video");
              }}
            >
              <BsCameraVideoFill height={"lg"} width={"lg"} />
            </button>
          </MediaButtons>
          <Post onClick={postHandler}>Post</Post>
        </Buttons>
      </Modal>
    </Backdrop>
  );
};
const FileInput = styled.input``;
const ImgContainer = styled.div`
  width: 100%;
  max-height: 45vh;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0.5em;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #0a66c2;
  }
`;
const VidContainer = styled.div`
  width: 100%;
  max-height: 45vh;
`;
const Backdrop = styled.div`
  padding: 1rem;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
`;
const Modal = styled.div`
  text-align: center;
  max-height: 90%;

  border-radius: 0.5rem;
  padding: 1rem;
  box-sizing: border-box;
  width: 100%;
  position: relative;
  top: 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 32rem;
  background-color: white;
  & > textarea {
    width: calc(100% - 1rem);

    outline: none;
    padding: 0.5rem;
  }
  & > label {
    margin-left: auto;
    margin-right: auto;
    color: #0a66c2;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
  & > span {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    font-weight: 700;
    font-size: large;
    color: rgba(0, 0, 0, 0.6);
  }
  & > button {
    color: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(0, 0, 0, 0.4);
    background-color: rgba(0, 0, 0, 0.2);
    height: 2rem;
    width: 2rem;
    border-radius: 0.3rem;
  }
`;
const User = styled.div`
  margin: 0.5rem 0;
  display: flex;
  justify-content: flex-start;
  gap: 0.5rem;
  align-items: center;
  & > img {
    margin-left: 5px;
    width: 3rem;
    border-radius: 50%;
  }
  & > span {
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
`;
const VideoLink = styled.input`
  width: calc(100% - 0.6rem);
  margin-top: 3px;
  outline: none;
  padding: 0.3rem;
`;
const Buttons = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const MediaButtons = styled.div`
  text-align: center;
  & > button {
    text-align: center;

    width: 2rem;
    height: 2rem;
    margin-right: 0.3rem;
  }
`;
const Post = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0a66c2;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 1rem;
`;

export default PostModal;
