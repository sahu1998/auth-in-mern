import React from "react";
import MainLayout from "../../MainLayout";

function Home() {
  return (
    <MainLayout>
      <div className="">Home Page</div>
    </MainLayout>
  );
}

export default Home;

// import * as React from 'react';
// import classnames from 'classnames';
// // you should import `lodash` as a whole module
// import lodash from 'lodash';
// import axios from 'axios';

// const ITEMS_API_URL = 'https://example.com/api/items';
// const DEBOUNCE_DELAY = 500;

// // the exported component can be either a function or a class

// export default function Autocomplete({onSelectItem}) {

//   const [text, setText] = React.useState("");
//   const [sugges, setSuggestion] = React.useState([]);

// function debounce(func, timeout = 500){
//   let timer;
//   return (...args) => {
//     clearTimeout(timer);
//     timer = setTimeout(() => { func.apply(this, args); }, timeout);
//   };
// }
// const  saveInput = async () =>{
//   const getData = await  axios.get(`${ITEMS_API_URL}`,{
//   params: {
//     q: text
//   })
//   console.log(getData)
//   setSuggestion(getData)
// }
// const processChange = debounce(() => saveInput(), DEBOUNCE_DELAY);

//   React.useEffect(()=> {
//     console.log("dsjfjdk")
//       processChange();

//   },[text])

//   return (
//     <div className="wrapper">
//       <div className="control">
//         <input type="text" className="input is-loading" onChange={(e)=>setText(e.target.value)}/>
//       </div>
//       <div className="list is-hoverable">
//         {sugges?.map((value, index)=>{
//           return  <a key = {index} className="list-item" onClick= {()=>{onSelectItem}}>{value}</a>
//         })}
//       </div>
//     </div>
//   );
// }
