import { FaClock, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
import girlImage from '../../assets/WorkingHour/girl.jpg';

function WorkingHour() {
  const workingHours = [
    { day: 'Mon – Fri', time: '10:00 AM – 8:00 PM' },
    { day: 'Saturday', time: '10:00 AM – 6:00 PM' },
    { day: 'Sunday', time: 'Closed', closed: true },
  ];

  return (
    <div className="flex flex-col lg:flex-row items-center bg-pink-50 w-full">
      
      {/* Image Section */}
      <div className="w-full lg:w-1/2">
        <img
          src={girlImage}
          alt="BeautyVista Working Hours"
          className="h-[60vh] lg:h-[90vh] w-[90vw] object-cover shadow-lg rounded-xl lg:rounded-none mx-auto"
        />
      </div>

      {/* Text Section */}
      <div className="w-full lg:w-1/2 h-auto lg:h-[90vh] flex justify-center items-center p-6 lg:p-12">
        <div className="max-w-lg w-full">
          <div className='flex items-center gap-2 mb-2'>
            <FaCalendarAlt className="text-rose-600 text-sm" />
          <h5 className="text-sm font-semibold text-rose-600 uppercase tracking-wider">
            BeautyVista
          </h5>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-rose-900 mb-4">
            Working Hours
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            We're here to pamper you! Visit us during our open hours and enjoy the beauty experience you deserve.
          </p>

          {/* Schedule List */}
          <ul className="space-y-3">
            {workingHours.map((item, index) => (
              <li
                key={index}
                className={`flex justify-between items-center p-3 rounded-lg w-full ${
                  item.closed
                    ? 'bg-rose-100 text-rose-600'
                    : 'bg-white text-rose-900'
                } hover:shadow-md transition-shadow duration-200 md:text-normal text-sm`}
              >
                <span className="w-[40%] font-medium flex items-center gap-3"><FaClock/>{item.day}</span>
                <span className="w-[20%] text-center">:</span>
                <span className="w-[40%] font-semibold">{item.time}</span>
              </li>
            ))}
          </ul>
          {/* Optional: Contact Icon or Info */}
          <div className="flex items-center gap-2 text-sm text-gray-500 pt-4 border-t border-rose-300 mt-6">
            <FaClock className="text-rose-400" />
            <span>Last appointment 30 minutes before closing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkingHour;
