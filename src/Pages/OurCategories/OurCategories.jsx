import React from 'react';
import CategoryCard from '../../components/CategoryCard/CategoryCard';
import { FaBrush , FaCut , FaPalette,  } from 'react-icons/fa';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';

const categories = [
  {
    id: 1,
    title: "Make Up",
    description: "Enhance your beauty with our expert makeup services for all occasions.",
    image: "https://media.istockphoto.com/id/687244776/photo/makeup-artist-applying-eyeshadow-on-a-girl.jpg?s=612x612&w=0&k=20&c=QkFL3oe-poYi4p1ZaboIOVie_ycRz0fTJG9Ex5LpNoQ=",
    icon: <FaBrush className="text-white text-xl" />,
  },
  {
    id: 2,
    title: "Hair Styling",
    description: "Trendy cuts, styles, and hair care solutions to suit your unique look.",
    image: "https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg",
    icon: <FaCut className="text-white text-xl" />,
  },
  {
    id: 3,
    title: "Hair Coloring",
    description: "Get vibrant, long-lasting hair colors personalized just for you.",
    image: "https://media.istockphoto.com/id/1305824214/photo/woman-dyeing-her-hair-at-the-salon.jpg?s=612x612&w=0&k=20&c=Jk2XQqn-5Tf1IeUPhmLYMP1Lq2nSlW_0udRXzc_KAJI=",
    icon: <FaPalette className="text-white text-xl" />,
  },
  {
  id: 4,
    title: "Make Up",
    description: "Enhance your beauty with our expert makeup services for all occasions.",
    image: "https://media.istockphoto.com/id/687244776/photo/makeup-artist-applying-eyeshadow-on-a-girl.jpg?s=612x612&w=0&k=20&c=QkFL3oe-poYi4p1ZaboIOVie_ycRz0fTJG9Ex5LpNoQ=",
    icon: <FaBrush className="text-white text-xl" />,
  },
  {
    id: 5,
    title: "Hair Styling",
    description: "Trendy cuts, styles, and hair care solutions to suit your unique look.",
    image: "https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg",
    icon: <FaCut className="text-white text-xl" />,
  },
];

const OurCategories = () => {
  return (
    <div className="py-10 px-4 md:px-8 lg:px-16">
        <div>
       <BreadcrumbBanner title="Categories" path="Home" image={`https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg`} />        </div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm italic text-gray-500">Our Categories</p>
          <h2 className="text-2xl font-bold text-gray-800">Our Popular Categories</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((item) => (
         <div>
            <CategoryCard item={item}/>
         </div>
        ))}
      </div>
    </div>
  );
};

export default OurCategories;