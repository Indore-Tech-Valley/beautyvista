import { Clock } from "lucide-react";
import girlImage from "../../assets/WorkingHour/girl.jpg";

const WorkingHour = () => {
  const workingHours = [
    { day: "Mon – Fri", time: "10:00 AM – 8:00 PM" },
    { day: "Saturday", time: "10:00 AM – 6:00 PM" },
    { day: "Sunday", time: "Closed", closed: true },
  ];

  return (
    <div className="lg:py-8 py-6">
    <section className="max-w-7xl mx-auto px-6 py-12 ">
      <div className="md:flex md:items-stretch md:gap-12">

        {/* Left: Image */}
        <div className="md:w-1/2 mb-10 md:mb-0 rounded-2xl overflow-hidden shadow-lg flex">
          <img
            src={girlImage}
            alt="BeautyVista Working Hours"
            className="w-full object-cover rounded-2xl"
          />
        </div>

        {/* Right: Text */}
        <div className="md:w-1/2 flex flex-col justify-between space-y-6">
          <div>
            <h2 className="mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-rose-700 leading-tight">
              Working Hours
            </h2>

            <p className="text-gray-700 text-lg sm:text-xl leading-relaxed">
              We're here to pamper you! Visit us during our open hours and enjoy the beauty experience you deserve.
            </p>

            <div className="space-y-4  pt-6">
              {workingHours.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between items-center p-4 rounded-xl border ${
                    item.closed
                      ? "bg-rose-50 text-rose-600 border-rose-200"
                      : "bg-white text-gray-800 border-gray-200"
                  } shadow-sm`}
                >
                  <span className="font-semibold text-xl text-rose-900 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-rose-500" />
                    {item.day}
                  </span>
                  <span className="font-semibold text-lg text-gray-700">
                    {item.time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-base text-gray-700 mt-6 border-t pt-4 border-gray-200 flex items-center gap-2">
            <Clock className="w-5 h-5 text-rose-400" />
            <span>Last appointment 30 minutes before closing</span>
          </div>
        </div>

      </div>
    </section>
    </div>
  );
};

export default WorkingHour;
