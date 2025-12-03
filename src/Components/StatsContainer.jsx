import React from 'react';
import './StatsContainer.css'
const StatsContainer = (props) => {
    return ( <>
    <section>
        <article className='StatsHead'>
                <div className='StatIcon'>
                    <img src={props.StatIcon} alt="Stat Icon" />
                </div>

                <div className='StatGain'>
                    <img src={props.StatGainIcon}  alt="" />


                    <h4>
                        {props.StatGain}
                    </h4>
                </div>
        </article>

        <article className='StatTitle'>
            <h5 className='StatTitleHead'>
                {props.StatTitle}
            </h5>


            <h4 className='StatNumber'>
                {props.StatNumber}
            </h4>
        </article>

    </section>
    
    </> );
}
 
export default StatsContainer;