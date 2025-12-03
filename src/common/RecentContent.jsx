import React from 'react';

const RecentContent = (props) => {
    return ( <>
        <section>
            <div>
                {props.Letters}
            </div>

            <article>
                <h5>
                    {props.Name}
                </h5>

                <h6>
                    {props.Activity}
                </h6>

                <p>
                    {props.AppName}
                </p>

                <p>
                    {props.Time}
                </p>
            </article>
        </section>
    </> );
}
 
export default RecentContent;