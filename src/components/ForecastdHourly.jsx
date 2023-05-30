import React,{useState, useEffect} from "react";
import "./ForecastHourly.css";
function formatAMPM(date) {
  var hours = date.getHours();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;

  var strTime = hours + ':' + '00' + ' ' + ampm;
  return strTime;
}


function ForecastHourly({ title, hourly }) {
 const [currentH, setCurrentH] = useState("")

const [filter, setFilter] = useState([]);
useEffect(() => {
  const interval = setInterval(() => {
   
    setCurrentH(formatAMPM(new Date()))
    setFilter(hourly.filter(e => toString(e.title) >=  toString(currentH)))

  }, 30*60000);
 
  return () => clearInterval(interval);
});

useEffect(() => {
  setFilter(hourly.filter(e => toString(e.title) >=  toString(formatAMPM(new Date()))))
},[hourly])


  return (
    <div>
      <div className='flex flex-col items-center justify-center' style={{marginRight: '12px'}}>
        <p className="text-white font-medium uppercase ">{title}</p>
      </div>
      <hr className='my-2'/>
      <div className="daily-container">
        {filter.map((e, i) => {
          return (
            <div className="hourly-item" key={i}>
              <div className="hourly-date">{e.title}</div>
              <div className="hourly-description">{e.description}</div>
              <div className="hourly-temperature">
                {e.temp} 
              </div>
              <div className="hourly-icon">
                <img src={e.iconURL} alt="" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ForecastHourly;