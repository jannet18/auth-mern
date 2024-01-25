import React from "react";

function About() {
  return (
    <div className="px-4 py-12 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-700 capitalize">
        Welcome to my Auth application
      </h1>
      <p className="mb-4 text-slate-700 tracking-wide">
        This is a MERN (MongoDB, Express, React, Node.js) stack application with
        authentication. It allows users to sign up, log in, and log out, and
        provides access to protected routes only for authenticated users.
      </p>
      <p className="mb-4 text-slate-700 tracking-wide">
        The front-end of the application is built with React and uses
        React-Router for cleint-side Routing. The back-end is built with Node.js
        and Express, and uses MongoDB as the database. Authentication is
        implemented using JSON Web Token (JWT).
      </p>
      <p className="mb-4 text-slate-700 tracking-wide">
        The application is intended as a starting point for building full-stack
        web application with authentication using the MERN-stack.
      </p>
    </div>
  );
}

export default About;
