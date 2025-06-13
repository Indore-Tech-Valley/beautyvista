import React from "react";

const BreadcrumbBanner = ({ title, path = "Home",image }) => {
  return (
    <div
      className="w-full h-48 lg:h-56 bg-cover bg-center flex items-center justify-center "
      style={{
        backgroundImage: `url('${image}')`, // Replace with your image path
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        backgroundBlendMode: 'darken',
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-3xl font-bold">{title.toUpperCase()}</h1>
        <p className="mt-2 text-sm">
          {path} <span className="text-indigo-400">/</span> {title}
        </p>
      </div>
    </div>
  );
};

export default BreadcrumbBanner;

// <BreadcrumbBanner title="Blogs" path="Home" image={${image1}} />