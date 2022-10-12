import { useReducer, useEffect } from "react";

let users = [
  {
    name: "Artak",
    id: 1,
    isClicked: false,
  },
  {
    name: "Arman",
    id: 2,
    isClicked: false,
  },
  {
    name: "John",
    id: 3,
    isClicked: false,
  },
  {
    name: "Mike",
    id: 4,
    isClicked: false,
  },
  {
    name: "Jack",
    id: 5,
    isClicked: false,
  },
];
let initialValue = {
  input: "",
  list: users,
};

let reducer = (state,action)=>{
    if(action.type === "filter"){
        return {
            ...state,
            list:users.filter((item)=>item.name.toLocaleLowerCase().includes(action.value.toLocaleLowerCase())),
            
        }
    }
    else if(action.type === "update-input"){
        return {
            ...state,
            input:action.value
        }
    }
    else if(action.type === "change-image"){
        users = users.map((item)=>{
          if(action.id === item.id){
              return {...item , isClicked:!item.isClicked}
          }
          else{
              return item
          }
      })
        return {
            ...state,
            list:users

        } 
    }
}

function List({ isClicked , changeState }) {
  const [state, dispatch] = useReducer(reducer, initialValue);


  useEffect(()=>{
    
    window.addEventListener("click",changeState)

    return ()=>{
        window.removeEventListener("click",changeState)
    }
  },[isClicked])
  
  
  return (
    <>
      
        <div className="container" onClick={(e)=>{
            e.stopPropagation()
        }}>
          <input value={state.input} onChange = {(e)=>{
            dispatch({
                type:"update-input",
                value:e.target.value
            })
            dispatch({
                type:"filter",
                value:e.target.value
            })
            
          }} type="text" />
          <div>
            {state.list.map(item=>{
                return (
                    
                        <div className={`wrapper ${item.isClicked ? "added" : ""}`} key={item.id}>
                            
                            <span>{item.name}</span>
                            <img onClick={()=>{
                                dispatch({
                                    type:"change-image",
                                    id:item.id
                                })
                            }} src={!item.isClicked?"https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/OOjs_UI_icon_add.svg/1200px-OOjs_UI_icon_add.svg.png" :"https://pixy.org/src/418/thumbs350/4182811.jpg" }/>
                        </div>
                    
                )
            })}
          </div>
        </div>
      
    </>
  );
}

export default List;
