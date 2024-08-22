const Faq = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 rounded-lg shadow-lg mt-10">
      <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Who created this Bible chat app?
        </h3>
        <p className="text-gray-800 mb-4">
          I'm a software developer currently living and working in Sydney. I'm passionate
          about helping others explore and understand the Bible. There's nothing in it for
          me personally—just the joy of helping others on their spiritual journey.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          What’s in it for you?
        </h3>
        <p className="text-gray-800 mb-4">
          Absolutely nothing other than the satisfaction of providing a helpful resource.
          This app is a free service offered to the community without any personal gain.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Are my questions logged?
        </h3>
        <p className="text-gray-800 mb-4">
          No, your questions are not logged. Your privacy is respected and I believe in
          providing a safe space for you to explore your faith anonymously.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Will this app be free forever?
        </h3>
        <p className="text-gray-800 mb-4">
          Yes, the app is free and will remain so for the foreseable future. This includes
          not spamming the user interface with commerical ads. There are minimal server
          hosting costs, but it's feasible at this stage to keep the app running without
          charging users. My goal is to always keep anything realted to the Bible and it's
          teachings free.
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h3 className="text-xl font-semibold text-blue-700 mb-4">
          Why should I use this app instead of another one or General AI apps?
        </h3>
        <p className="text-gray-800 mb-4">
          This app is free, and it doesn't require you to provide any personal information
          for login. You can explore the Bible and ask questions anonymously, knowing that
          your queries aren't logged. You interact with the application anonymously and
          without registering or signing up.
        </p>
      </div>
    </div>
  );
};

export default Faq;
