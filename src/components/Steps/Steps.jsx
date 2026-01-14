import React, { useState } from "react";

import "./main.css";
import { v4 as uuidv4 } from 'uuid';
import delpng from './delete.png';
import editpng from './edit.png';



class Tren {
  constructor(date, distance) {
    this.id = uuidv4()
    this.date = date
    this.distance = distance
  }
}


function Steps() {
  let [listArr, setListArr] = useState([]);
 

  const stepsForm = (e) => {
    e.preventDefault();
    let [date, distance] = e.target;
    let tren;
    const oldDate = listArr.find(item => item.date === date.value)
    
    
   if (oldDate){ 
   
  let newDistanse = Number(distance.value) + oldDate.distance
  tren = new Tren(date.value,newDistanse)
  let newArray = listArr.filter(item => item.id !== oldDate.id);
  console.log(newArray)
  setListArr(newArray)
  setListArr(prev => [...prev, tren])
  
  
}
    else{tren = new Tren(date.value,Number(distance.value));
    setListArr(prev => [...prev, tren])};
     
  }
  
   
 
  const handleDelete = (idToDelete) => {
    const newList = listArr.filter(item => item.id !== idToDelete)
   
  setListArr(newList);
  };

  

   let itemArr = listArr.map((value) => (
    <div className="display__record" key={value.id} >
      <div className="record__date">{value.date}</div>
      <div className="record__distance">{value.distance}</div>
      <input type="image" src={editpng} className="record__actions"/>
      <input type="image" src={delpng}  className="record__actions" onClick={() => (handleDelete(value.id))}/>
    </div>
  ));

  listArr.sort((a, b) => {
    return a.date > b.date ? 1 : -1;
  });
  return (
    <div className="steps">
      <form className="steps__form" onSubmit={stepsForm}>
        <div className="form__box">
          <label className="form__title" htmlFor="date">Дата (дд.мм.гг)</label>
          <input className="form__input-date" type="date" name="date"/>
        </div>
        <div className="form__box">
          <label className="form__title" htmlFor="distance">Пройдено, км</label>
          <input className="form__input-distance" type="number" name="distance"/>
        </div>
        <button className="form__btn" type="submit">ОК</button>
      </form>

     <div className="steps__display">
      <div className="display__box-title">
        <span className="display__title-date">Дата (дд.мм.гг)</span>
        <span className="display__title-distance">Пройдено, км</span>
        <span className="display__title-actions">Действия</span>
      </div>
      <div className="display__list">{itemArr}</div>
    </div>
    </div>
  );
}

export default Steps;
