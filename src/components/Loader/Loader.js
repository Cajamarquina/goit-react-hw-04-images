import React from 'react';
import { ColorRing } from 'react-loader-spinner';

const CustomLoader = () => {
  return (
    <div className="loader-container">
      <ColorRing  
        height={80}
        width={80}
        visible={true}
        ariaLabel="blocks-loading"
        wrapperStyle={{}} 
        wrapperClass="blocks-wrapper"
        colors={['#b8c480', '#B2A3B5', '#F4442E', '#51E5FF', '#429EA6']}
      />
    </div>
  );
};

export default CustomLoader;
