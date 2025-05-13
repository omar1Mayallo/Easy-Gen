import {
  FaGraduationCap,
  FaGlobe,
  FaChalkboardTeacher,
  FaCertificate,
  FaUserFriends,
  FaMobileAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Features = () => {
  const features = [
    {
      icon: (
        <FaGraduationCap className="text-3xl text-amber-600 dark:text-amber-400" />
      ),
      title: "Expert-Led Courses",
      description:
        "Learn from industry professionals and academic experts with real-world experience.",
    },
    {
      icon: <FaGlobe className="text-3xl text-amber-600 dark:text-amber-400" />,
      title: "Global Recognition",
      description:
        "Our certifications are valued by 500+ partner organizations worldwide.",
    },
    {
      icon: (
        <FaChalkboardTeacher className="text-3xl text-amber-600 dark:text-amber-400" />
      ),
      title: "Interactive Learning",
      description:
        "Engage with live sessions, Q&A forums, and hands-on projects.",
    },
    {
      icon: (
        <FaCertificate className="text-3xl text-amber-600 dark:text-amber-400" />
      ),
      title: "Career Certificates",
      description:
        "Earn credentials that boost your resume and LinkedIn profile.",
    },
    {
      icon: (
        <FaUserFriends className="text-3xl text-amber-600 dark:text-amber-400" />
      ),
      title: "Peer Community",
      description:
        "Join study groups and network with like-minded professionals.",
    },
    {
      icon: (
        <FaMobileAlt className="text-3xl text-amber-600 dark:text-amber-400" />
      ),
      title: "Mobile Friendly",
      description: "Learn on-the-go with our fully responsive platform.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-5 md:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center mb-4">
            <div className="mr-4 w-10 border-t border-amber-500 dark:border-amber-400" />
            <p className="text-sm font-medium sm:text-base text-amber-600 dark:text-amber-400">
              WHY CHOOSE US
            </p>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Elevate Your Learning Journey
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-gray-500 dark:text-gray-400">
            Discover the features that make our platform the preferred choice
            for thousands of learners worldwide.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-8 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 transition-shadow duration-300"
            >
              <div className="flex flex-col items-start">
                <div className="mb-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            to="/courses"
            className="inline-block rounded-md bg-amber-600 hover:bg-amber-700 px-8 py-3 text-center font-semibold text-white transition-colors dark:bg-amber-700 dark:hover:bg-amber-600"
          >
            Browse All Features
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Features;
