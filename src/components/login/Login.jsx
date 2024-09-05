import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, collection, query, where, getDocs } from "firebase/firestore";
import upload from "../../lib/upload";

const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username } = Object.fromEntries(formData);

    // VALIDATE INPUTS
    if (!username) return toast.warn("Please enter a username!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another username");
    }

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      const user = result.user;
      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", user.uid), {
        username,
        email: user.email,
        avatar: imgUrl,
        id: user.uid,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", user.uid), {
        chats: [],
      });

      toast.success("Account created! You can now use the app!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="item">
        <h2>Welcome back,</h2>
        <button
  onClick={handleGoogleSignIn}
  disabled={loading}
  style={{
    width: 'auto',
    padding: '18px',
    border: 'none',
    display:'block',
    backgroundColor: '#4285F4', // Google Blue
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: '700',
    
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  {loading ? "Loading" : "Sign In with Google"}
</button>

      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="" />
            
          </label>
          <p>Upload an image</p>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <button disabled={loading} style={{fontWeight:'700'}}>{loading ? "Loading" : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
