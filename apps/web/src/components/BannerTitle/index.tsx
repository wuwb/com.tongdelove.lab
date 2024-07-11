import React from 'react';

const Home = (props) => {
  return (
    <div>
      <h3 className="banner-title text-center text-lg">{props.children}</h3>
      {props.desc ? <div className="banner-title-desc text-md">{props.desc}</div> : null}
    </div>
  );
};

export default Home;
