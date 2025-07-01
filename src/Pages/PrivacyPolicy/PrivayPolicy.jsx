import React from 'react';
import BreadcrumbBanner from '../../components/BreadcrumbBanner/BreadcrumbBanner';

const contentSections = [
  {
    id: 1,
    title: 'Information We Collect',
    text: `We collect personal information such as your name, contact details, preferred services, appointment history, and feedback when you interact with BeautyVista. We may also gather device and usage information to enhance your experience.`,
  },
  {
    id: 2,
    title: 'How We Use Your Information',
    text: `Your data is used to provide personalized beauty services, manage bookings, send appointment reminders, offer promotional content, and improve our overall service quality. We never share your data without your consent.`,
  },
  {
    id: 3,
    title: 'Data Security',
    text: `We follow industry best practices to protect your data from unauthorized access, disclosure, or loss. All sensitive information is encrypted and securely stored.`,
  },
  {
    id: 4,
    title: 'Cookies and Tracking',
    text: `BeautyVista uses cookies and tracking technologies to improve website performance, understand user preferences, and offer tailored promotions. You can manage cookie preferences through your browser settings.`,
  },
  {
    id: 5,
    title: 'Third-Party Services',
    text: `We may work with trusted third-party platforms for appointment scheduling, payments, and marketing. Each of these services adheres to their own privacy policies, which we encourage you to review.`,
  },
  {
    id: 6,
    title: 'Contact Us',
    text: (
      <>
        If you have any questions about our privacy practices, feel free to reach out at{' '}
        <span className="text-rose-700 font-medium">support@beautyvista.com</span>.
      </>
    ),
  },
];

const PrivacyPolicy = () => {
  return (
    <div className="w-full min-h-screen bg-white text-gray-800">
      {/* Header Section */}
      <BreadcrumbBanner
        title="Privacy Policy"
        path="Home"
        image="https://myhomesalon.in/wp-content/uploads/2023/06/istockphoto-1147811403-612x612-1.jpg"
      />

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <p className="mb-8 text-gray-600 text-base sm:text-lg leading-relaxed">
          At BeautyVista, your privacy is important to us. This Privacy Policy outlines how we collect,
          use, and safeguard your personal information when you use our salon and spa services.
        </p>

        {contentSections.map(({ id, title, text }) => (
          <section key={id} className="mb-10">
            <h2 className="text-lg sm:text-xl font-semibold text-rose-900 mb-3">{id}. {title}</h2>
            <p className="text-gray-600 text-sm sm:text-base leading-loose">{text}</p>
          </section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
