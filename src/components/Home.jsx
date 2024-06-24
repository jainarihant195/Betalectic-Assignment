import React, { useEffect, useState } from "react";
import { ReuseInput } from "@locoworks/reusejs-react-input";
import { HeadlessButton } from "@locoworks/reusejs-react-button";
import axios from "axios";

function Home() {
    const [query, setQuery] = useState('');
    const [selectedPackage, setSelectedPackage] = useState('');
    const [results, setResults] = useState([]);
    const [reason, setReason] = useState('');
    const [favPackage,setFavPackage] = useState([]);

    useEffect(() => {

        const fetchPackages = async () => {
            if (query) {
                try {
                    const response = await axios.get(`https://api.npms.io/v2/search?q=${query}`);
                    if (response.data && Array.isArray(response.data.results)) {

                        const packages = response.data.results.map(pkg => pkg.package)
                        console.log(packages)
                        // console.log(response.data.results);
                        setResults(packages);
                        localStorage.setItem('searchResults', JSON.stringify(packages));
                    }
                    else {
                        console.error("Unexpected error format")
                    }
                } catch (error) {
                    console.error('Error fetching packages:', error);
                }
            } else {
                setResults([]);
            }
        };

        fetchPackages();
    }, [query]);
    useEffect(() => {
        const storedResults = localStorage.getItem('searchResults');
        if (storedResults) {
            setResults(JSON.parse(storedResults));
        }
    }, []);

    const handleSubmit = ()=> {
        if(!reason|| !selectedPackage){
            console.log("Please select a valid reason and package");
            return;
        }
        const favPack = {
            name: selectedPackage,
            reason
          };
      
          const updatedFavoritePackages = [...favPackage, favPack];
          setFavPackage(updatedFavoritePackages);
          localStorage.setItem('favoritePackages', JSON.stringify(updatedFavoritePackages));

          setSelectedPackage(null);
          setReason('');
          setQuery('');
          console.log("Submitted: ",favPack);
    }


    return (
        <>
            {/* <div className="flex gap-x-3 justify-center py-10 mt-10 border rounded bg-gray-50">
			<ReuseInput inputRef={sampleref} placeholder="start typing." />
			<HeadlessButton
				className="bg-blue-200 border border-blue-400 rounded px-3 py-1"
				onClick={handleClick}
			>
				Get Value
			</HeadlessButton>
		</div> */}
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
                        {results.map(pkg => (
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
                <div className="mb-4">
                    <label htmlFor="reason" className="block text-gray-700 text-sm font-bold mb-2">
                        Why is this your fav?
                    </label>
                    <ReuseInput
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Enter your reason here..."
                    />
                </div>
                <HeadlessButton
                    onClick={handleSubmit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"

                >
                    Submit
                </HeadlessButton>
            </div>
        </>
    )
}

export default Home
