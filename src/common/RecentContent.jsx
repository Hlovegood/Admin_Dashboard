import React from 'react';
import './RecentContent.css';
const RecentContent = (props) => {
    return ( <>
        <section className='ContentRecent'>
            <div className='LettersHolder'>
                {props.Letters}
            </div>

            <article className='RecentContent'>
                <h5 className='RecentName'>
                    {props.Name}
                </h5>

                <h6 className='RecentActivity'>
                    {props.Activity}
                </h6>

                <p className='RecentApp'>
                    {props.AppName}
                </p>

                <p className='RecentTime'>
                    {props.Time}
                </p>
            </article>
        </section>
    </> );
}
 
export default RecentContent;