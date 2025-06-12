import React from "react";
import { FaSpa } from "react-icons/fa";
import { GiHerbsBundle, GiSteam, GiMeditation, GiLotus } from "react-icons/gi";
import { MdHealthAndSafety } from "react-icons/md";

const features = [
  { icon: <FaSpa size={30} />, title: "Naturally Spa" },
  { icon: <GiHerbsBundle size={30} />, title: "Herbal & Natural" },
  { icon: <MdHealthAndSafety size={30} />, title: "Effective Treatments" },
  { icon: <GiSteam size={30} />, title: "Steam Bath" },
  { icon: <GiMeditation size={30} />, title: "Trained Professionals" },
  { icon: <GiLotus size={30} />, title: "Complete Detoxification" },
];

const HealthBenefits = () => {
  return (
    <section className=" bg-white text-center lg:py-8 py-6">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-900 mb-3">
          Good <span className="text-rose-700">for</span> your health
        </h2>
        <div className="w-16 h-1 bg-rose-300 mx-auto mb-6 rounded"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mb-14">
          Explore our rejuvenating services crafted to bring out the best in you.
        </p>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
          {/* Left Column */}
          <div className="flex flex-col gap-10 w-full md:w-5/12">
            {features.slice(0, 3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-5 text-left">
                <div className="flex-shrink-0 text-rose-700 border p-3 rounded-full bg-rose-100 w-14 h-14 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg uppercase text-rose-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    A wonderful serenity has taken possession of my entire soul.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Center Image */}
          <div className="w-72 h-72 hidden md:block">
            <img
              src="https://static.photodexia.com/largeweb/repository/u-enblog/bd75baef8bb4c01eeaaafc820df1bc8aphoto1616394584738fc6e612e71b9"
              alt="Spa Relax"
              className="rounded-full w-full h-full object-cover shadow-lg"
            />
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-10 w-full md:w-5/12">
            {features.slice(3).map((item, idx) => (
              <div key={idx} className="flex items-center gap-5 text-left">
                <div className="flex-shrink-0 text-rose-700 border p-3 rounded-full bg-rose-100 w-14 h-14 flex items-center justify-center">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-lg uppercase text-rose-900">{item.title}</h4>
                  <p className="text-sm text-gray-600">
                    A wonderful serenity has taken possession of my entire soul.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default HealthBenefits;
