import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

// const INITIAL_STATE = {
//   user: null,
//   isFetching: false,
//   error: false,
// };

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

// const INITIAL_STATE = {
//   user: {
//     _id: "61dff5936969f16b383b0555",
//     username: "darpanR",
//     email: "darpanR@gmail.com",
//     password: "$2b$10$QyFx2aTZ90j/orCn.mDNkeo4Fsg3fQ7qZDUYFNGsFUOpe70HaqOs6",
//     profilePicture: "person/1.jpeg",
//     coverPicture: "",
//     followers: [],
//     following: ["61e038bd9584169bee41a37d", "61e038e89584169bee41a381"],
//     isAdmin: false,
//     __v: 0,
//     desc: "Updated desc1",
//     city: "Delhi",
//     from: "mussori",
//     relationship: 1,
//   },
//   isFetching: false,
//   error: false,
// };

export const AuthContext = createContext(INITIAL_STATE);
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  console.log(dispatch);
  console.log(state); // debugging;
  console.log(useReducer(AuthReducer, INITIAL_STATE));
  console.log(AuthReducer);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}>
      {children}
      {/* we are sharing all  this values with app component which
      is now a children for context api */}
    </AuthContext.Provider>
  );
};
