"use client";
import Link from "next/link";
import React from "react";
import { useState } from "react";

export const Nav = ({ session }: any) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <nav className="bg-transparent border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center">
          <h1>MyEventsVault</h1>
        </Link>
        <button
          data-collapse-toggle="navbar-default"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-default"
          aria-expanded={isMenuOpen ? "true" : "false"}
          onClick={toggleMenu}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full md:block md:w-auto ${
            isMenuOpen ? "block" : "hidden"
          }`}
          id="navbar-default"
        >
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg bg-transparent md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <Link
              href="/"
              className="text-gray-900 hover:bg-cyan-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              aria-current="page"
            >
              Home
            </Link>
            {session ? (
              <>
                <Link
                  className="text-gray-900 hover:bg-cyan-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button
                    className="text-gray-900 hover:bg-cyan-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    type="submit"
                  >
                    Sign out
                  </button>
                </form>
              </>
            ) : (
              <Link
                className="text-gray-900 hover:bg-cyan-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                href="/login"
              >
                Login
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
