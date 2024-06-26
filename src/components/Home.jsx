import React, { useState, useEffect } from "react";
import axios from "axios";
import { ReuseInput } from "@locoworks/reusejs-react-input";
import { HeadlessButton } from "@locoworks/reusejs-react-button";
import { Link } from "react-router-dom";

function Home({ favPackage, setFavPackage }) {
  const [query, setQuery] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");
  const [results, setResults] = useState([]);
  const [reason, setReason] = useState("");

  useEffect(() => {
    const fetchPackages = async () => {
      if (query) {
        try {
          const response = await axios.get(`https://api.npms.io/v2/search?q=${query}`);
          if (response.data && Array.isArray(response.data.results)) {
            const packages = response.data.results.map((pkg) => pkg.package);
            setResults(packages);
          } else {
            console.error("Unexpected error format");
          }
        } catch (error) {
          console.error("Error fetching packages:", error);
        }
      } else {
        setResults([]);
      }
    };

    fetchPackages();
  }, [query]);

  const handleSubmit = async () => {
    if (!reason || !selectedPackage) {
      alert("Please select a valid reason and package");
      return;
    }

    const favPack = {
      package_name: selectedPackage,
      reason,
    };

    try {
      await axios.post("http://localhost:3000/favorites", favPack);
      console.log("Hi")
      const updatedFavoritePackages = [...favPackage, favPack];
      setFavPackage(updatedFavoritePackages);
      setSelectedPackage("");
      setReason("");
    } catch (error) {
      console.error("Error adding favorite package:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="mb-4">
        <label htmlFor="search" className="block text-gray-700 text-sm font-bold mb-2">
          Search for NPM Packages
        </label>
        <ReuseInput
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="angular"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Results</label>
        <div className="max-h-32 overflow-y-auto border rounded">
          {results.map((pkg) => (
            <div key={pkg.name} className="p-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="package"
                  value={pkg.name}
                  checked={selectedPackage === pkg.name}
                  onChange={() => setSelectedPackage(pkg.name)}
                />
                <span className="ml-2">{pkg.name}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
          Why is this your favorite?
        </label>
        <ReuseInput
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your reason here..."
        />
      </div>
      <div className="flex justify-end">
        <HeadlessButton
          onClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </HeadlessButton>
      </div>
      {/* <Link
        to="/view"
        className="block text-center mt-4 text-blue-500 hover:text-blue-700"
      >
        View Favorites
      </Link> */}
    </div>
  );
}

export default Home;
