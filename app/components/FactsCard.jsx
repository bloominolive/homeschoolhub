'use client'
import React, { useState, useEffect } from 'react';

const FactsCard = () => {
  const [facts, setFacts] = useState([]);

  useEffect(() => {
    const fetchFacts = async () => {
      const limit = 3;
      const response = await fetch(`https://api.api-ninjas.com/v1/facts?limit=${limit}`, {
        method: 'GET',
        headers: {
          'X-Api-Key': 'ZI1VQJhGkCepkXyh62rFaKEknw5sXxpmm5L8kdjT'
        }
      });

      if (!response.ok) {
        console.error('Error:', response.status, await response.text());
        return;
      }

      const data = await response.json();
      setFacts(data);
    };

    fetchFacts();
  }, []);

  return (
    <div className="max-w-sm rounded-lg overflow-hidden bg-white p-4">
      <div className="font-bold text-xl text-gray-700 text-center mb-2">Did You Know?</div>
      <ul>
        {facts.map((fact, index) => (
          <li key={index} className="text-gray-700 text-base mb-4">
            {fact.fact}
            <hr className='border border-double'/>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FactsCard;
