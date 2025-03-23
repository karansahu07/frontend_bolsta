import React, { useState } from "react";
import { Search } from "lucide-react";

const persons = [
  { name: "Chris Friskely", company: "Supermarket Villanos", image: "/icons/Avatar1.svg" },
  { name: "Maggie Johnson", company: "Oasis Organic Inc.", image: "/icons/Avatar2.svg" },
  { name: "Gael Harry", company: "New York Finest Fruits", image: "/icons/Avatar3.svg" },
  { name: "Jenna Sullivan", company: "Walmart", image: "/icons/Avatar4.svg" },
  { name: "Gael Harry", company: "New York Finest Fruits", image: "/icons/Avatar5.svg" },
];

const PersonList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);

  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-4">
      {/* Header Section */}
      <div className="flex justify-between pb-2 border-b border-gray-300">
        <h5 className="text-lg font-bold text-gray-900">All Person</h5>
        <div className="flex items-center px-3 rounded-full bg-[#243445]">
          <Search className="text-white" size={18} />
          <input
            type="text"
            placeholder="Search names..."
            className="border-none rounded-full text-white bg-transparent ml-2 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Scrollable Person List */}
      <div className="overflow-auto max-h-36 mt-2">
        <ul className="space-y-2">
          {filteredPersons.map((person, index) => (
            <li
              key={index}
              onClick={() => setSelectedPerson(index)}
              className={`flex justify-between items-center p-3 rounded cursor-pointer transition ${
                selectedPerson === index ? "bg-[#243445] text-white" : "bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <img src={person.image} alt={person.name} className="rounded-full w-10 h-10" />
                <div>
                  <h6 className="mb-0 text-[#243445]">{person.name}</h6>
                  <p className="text-sm text-gray-500">{person.company}</p>
                </div>
              </div>
              <img src="/icons/Frame_13.svg" alt="" className="w-10 h-10 rounded-full" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PersonList;
