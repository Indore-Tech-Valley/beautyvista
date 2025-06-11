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
    <section className="px-4 py-12 md:px-10 bg-white text-center">
      <h2 className="text-3xl font-semibold text-gray-800 mb-2">
        Good <span className="text-pink-500">for</span> your health
      </h2>
      <div className="w-16 h-1 bg-pink-400 mx-auto mb-4 rounded"></div>
      <p className="text-gray-500 max-w-2xl mx-auto mb-10">
        Explore our rejuvenating services crafted to bring out the best in you.
      </p>

      <div className="max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        <div className="space-y-8">
          {features.slice(0, 3).map((item, idx) => (
            <div key={idx} className={`flex items-center gap-4 text-left ${idx===1?``:``}`}>
              <div>
                <h4 className="font-semibold text-lg uppercase text-right">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500 text-right">
                  A wonderful serenity has taken possession of my entire soul.
                </p>
              </div>
                            <div className="text-pink-500 border p-2 rounded-full bg-rose-100">{item.icon}</div>

            </div>
          ))}
        </div>

        <div className="mx-auto hidden md:block">
          <img
            src="https://static.photodexia.com/largeweb/repository/u-enblog/bd75baef8bb4c01eeaaafc820df1bc8aphoto1616394584738fc6e612e71b9" // Replace with your local image path
            alt="Spa Relax"
            className="rounded-full w-72 h-72 object-cover shadow-lg"
          />
        </div>

        <div className="space-y-8">
          {features.slice(3).map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 text-left">
              <div className="text-pink-500 border p-2 rounded-full bg-rose-100">{item.icon}</div>
              <div>
                <h4 className={`font-semibold text-lg uppercase `}>
                  {item.title}
                </h4>
                <p className="text-sm text-gray-500">
                  A wonderful serenity has taken possession of my entire soul.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HealthBenefits;
