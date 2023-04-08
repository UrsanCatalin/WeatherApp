import React from 'react';
import './ForecastWeekly.css';


function ForecastWeekly({title,daily}) {
  return (
    <div>
        <div className='flex flex-col items-center justify-center' style={{marginRight: '12px'}}>
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className='my-2'/>
      <div className="daily-container">
    {daily.map((e,i) => {
        return (
            <div className="daily-item" key={i}>
                <div className="daily-date">{e.date}</div>
                <div className="daily-day">{e.day}</div>
                <div className="daily-description">{e.description}</div>
                <div className="daily-temperature">{e.min} to {e.max}</div>
                <div className="daily-icon"><img src={e.iconURL} alt="" /></div>
            </div> 
        )
    })}
</div>
       
    </div>
  );
}

export default ForecastWeekly