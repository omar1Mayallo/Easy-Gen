import { FaApple, FaGoogle, FaMicrosoft, FaUniversity } from "react-icons/fa";
import { SiAdobe, SiNetflix, SiTesla } from "react-icons/si";
import { Link } from "react-router-dom";

const Hero = () => {
  // Partner icons data
  const partners = [
    {
      icon: (
        <FaUniversity className="text-2xl text-purple-600 dark:text-purple-400" />
      ),
      name: "Harvard",
    },
    {
      icon: <FaGoogle className="text-2xl text-blue-500 dark:text-blue-400" />,
      name: "Google",
    },
    {
      icon: <FaApple className="text-2xl text-gray-800 dark:text-gray-200" />,
      name: "Apple",
    },
    {
      icon: (
        <FaMicrosoft className="text-2xl text-blue-600 dark:text-blue-400" />
      ),
      name: "Microsoft",
    },
    {
      icon: <SiTesla className="text-2xl text-red-500 dark:text-red-400" />,
      name: "Tesla",
    },
    {
      icon: <SiNetflix className="text-2xl text-red-600 dark:text-red-400" />,
      name: "Netflix",
    },
    {
      icon: <SiAdobe className="text-2xl text-red-400 dark:text-red-300" />,
      name: "Adobe",
    },
  ];

  return (
    <>
      <section className=" bg-white dark:bg-neutral-900">
        <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid items-center justify-items-start gap-8 sm:gap-16 md:grid-cols-2">
            <div className="flex flex-col">
              <div className="mb-4 flex items-center">
                <div className="mr-4 w-10 border-t border-amber-500 dark:border-amber-400"></div>
                <p className="text-sm font-medium sm:text-base text-amber-600 dark:text-amber-400">
                  500+ Trusted Education Partners
                </p>
              </div>

              <h1 className="mb-4 text-4xl font-bold md:text-6xl md:leading-tight text-gray-900 dark:text-white">
                Transform Your Learning Experience
              </h1>

              <p className="mb-6 max-w-lg text-gray-500 dark:text-gray-400 sm:text-lg md:mb-10 lg:mb-12">
                Join our global network of learners and institutions. Access
                premium courses developed with top universities and industry
                leaders worldwide.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row mb-10">
                <Link
                  to="/courses"
                  className="rounded-md bg-amber-600 hover:bg-amber-700 px-8 py-4 text-center font-semibold text-white transition-colors dark:bg-amber-700 dark:hover:bg-amber-600"
                >
                  Explore Courses
                </Link>
                <Link
                  to="/partners"
                  className="rounded-md border border-amber-600 text-amber-600 hover:bg-amber-50 px-8 py-4 text-center font-semibold transition-colors dark:text-amber-400 dark:border-amber-400 dark:hover:bg-neutral-700"
                >
                  See All Partners
                </Link>
              </div>

              {/* Partner Icons Grid */}
              <div className="flex flex-wrap items-center gap-6">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center group"
                    title={partner.name}
                  >
                    <div className="p-3 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-700 group-hover:shadow-md transition-all">
                      {partner.icon}
                    </div>
                    <span className="mt-1 text-xs text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      {partner.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <img
                src="/hero.webp"
                alt="Students collaborating online"
                className="inline-block h-full w-full max-w-2xl mb-9"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
