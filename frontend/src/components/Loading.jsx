import React from 'react';

const Loading = () => {
  return (
    <div className="flex justify-center  bg-opacity-60 items-center min-h-[72vh] ">
      <div className="flex space-x-4">
        <div className="bg-slate-500  w-8 h-8 rounded-full animate-loading one"></div>
        <div className="bg-slate-500  w-8 h-8 rounded-full animate-loading two"></div>
        <div className="bg-slate-500  w-8 h-8 rounded-full animate-loading three"></div>
        <div className="bg-slate-500  w-8 h-8 rounded-full animate-loading four"></div>
      </div>
    </div>
  );
};

export default Loading;
