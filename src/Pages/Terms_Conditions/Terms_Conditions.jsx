import React from 'react';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';

const content = {
  intro:
    'Welcome to BeautyVista! By accessing our website, booking appointments, or using our beauty and wellness services, you agree to the following terms and conditions. Please read them carefully.',
  sections: [
    {
      id: 1,
      title: 'Scope of Services',
      text:
        'Our website provides information about our beauty treatments, spa services, packages, appointment booking, and general wellness tips. It is intended for informational purposes and should not be considered a substitute for in-person consultations with our professionals.',
    },
    {
      id: 2,
      title: 'Service Disclaimer',
      text:
        'The information on our site is provided for general understanding. It does not replace personalized beauty or skincare consultations. For tailored recommendations or treatment concerns, we advise visiting our salon or contacting our specialists.',
    },
    {
      id: 3,
      title: 'Appointments & Cancellations',
      text: `Clients are expected to:
- Provide accurate personal details during booking.
- Notify the salon at least 24 hours in advance for any rescheduling or cancellation.
- Arrive on time to ensure a smooth experience for all guests.`,
    },
    {
      id: 4,
      title: 'Website Updates',
      text:
        'We may update or modify the content, features, or terms of this website at any time without prior notice. Continued use of the site after changes constitutes acceptance of the updated terms.',
    },
    {
      id: 5,
      title: 'Contact Us',
      text: 'For any questions regarding these terms, please contact us at info@beautyvista.com.',
    },
  ],
};

const Terms_Conditions = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <BreadcrumbBanner
        title="Terms & Conditions"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="mb-6 text-base sm:text-lg text-gray-600 leading-relaxed">
          {content.intro}
        </p>

        {content.sections.map(({ id, title, text }) => (
          <section key={id} className="mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-rose-900 mb-3">
              {id}. {title}
            </h2>

            {id === 3 ? (
              <div className="text-gray-600 text-sm sm:text-base leading-loose">
                <p className="mb-2">Clients are expected to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  {text.split('\n').map((line, idx) => (
                    <li key={idx}>{line.replace(/^- /, '')}</li>
                  ))}
                </ul>
              </div>
            ) : id === 5 ? (
              <p className="text-gray-600 text-sm sm:text-base leading-loose">
                For any questions regarding these terms, please contact us at{' '}
                <span className="text-rose-700 font-medium">info@beautyvista.com</span>.
              </p>
            ) : (
              <p className="text-gray-600 text-sm sm:text-base leading-loose">{text}</p>
            )}
          </section>
        ))}
      </div>
    </div>
  );
};

export default Terms_Conditions;
