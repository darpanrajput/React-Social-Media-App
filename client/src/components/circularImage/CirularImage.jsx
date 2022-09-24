import React from "react";
import "./circularImage.css";
export default function CirularImage(param) {
  return (
    <div>
      <img src={param.src} alt="" className="cir-img" />
    </div>
  );
}

// // import React from "react";
// function Avatar(props){

//     return (
//     <div>
//         <img className="circle-img"
//         src={props.src}
//         alt="avatar_img"/>
//     </div>

//     );
//     }

//     export default Avatar;
