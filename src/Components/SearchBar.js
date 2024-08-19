// import { FaSearch } from "react-icons/fa";
// import WidgetContext from "../context/WidgetContext";
// import { useContext, useEffect } from "react";
// const SearchBar = () => {
//   const { fetchedData, searchText, setSearchText, suggestions, setSuggestions, setIsDrawerActive, setActiveTab } = useContext(WidgetContext);

//   useEffect(() => {
//     if (searchText) {
//       const suggestedWidgets = [];

//       fetchedData.categories.forEach((category) => {
//         category.widgets.forEach((widget) => {
//           if (widget.title.toLowerCase().includes(searchText.toLowerCase())) {
//             suggestedWidgets.push({
//               categoryName: category.title, // Add category name for display
//               categoryId: category.id,
//               widgetId: widget.id,
//               widgetTitle: widget.title
//             });
//           }
//         });
//       });

//       setSuggestions(suggestedWidgets);
//     } else {
//       setSuggestions([]);
//     }
//   }, [searchText]);

//   console.log("suggestions", suggestions);

//   const handleSearchedWidget = (suggestion) => {
//     setSearchText('');
//     setIsDrawerActive(true);
//     setActiveTab(suggestion.categoryId);
//   }


//   return (
//     <div className="relative mt-2 rounded-md shadow-sm">
//       <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//         <span className="text-gray-500 sm:text-sm"><FaSearch /></span>
//       </div>
//       <input type="text" onChange={(e) => setSearchText(e.target.value)} className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="Search anything..." />
//       {searchText && <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
//         {suggestions.length > 0 ? suggestions.map((suggestion) => (
//           <li key={suggestion.widgetId} className="p-2 cursor-pointer hover:bg-gray-100"
//             onClick={() => handleSearchedWidget(suggestion)}
//           >{suggestion.widgetTitle} in {suggestion.categoryName}</li>
//         )) : <li className="p-2 cursor-pointer hover:bg-gray-100">No widget found</li>}
//       </ul>}


//     </div>

//   )
// }

// export default SearchBar

import { FaSearch } from "react-icons/fa";
import WidgetContext from "../context/WidgetContext";
import { useContext, useEffect, useState } from "react";

const SearchBar = () => {
  const { fetchedData, searchText, setSearchText, suggestions, setSuggestions, setIsDrawerActive, setActiveTab, debouncedSearchText, setDebouncedSearchText } = useContext(WidgetContext);


  // Debounce the search input to delay the effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  // Update suggestions based on the debounced search text
  useEffect(() => {
    if (debouncedSearchText) {
      const suggestedWidgets = [];

      fetchedData.categories.forEach((category) => {
        category.widgets.forEach((widget) => {
          if (widget.title.toLowerCase().includes(debouncedSearchText.toLowerCase())) {
            suggestedWidgets.push({
              categoryName: category.title, // Add category name for display
              categoryId: category.id,
              widgetId: widget.id,
              widgetTitle: widget.title
            });
          }
        });
      });

      setSuggestions(suggestedWidgets);
    } else {
      setSuggestions([]);
    }
  }, [debouncedSearchText]);


  const handleSearchedWidget = (suggestion) => {
    setSearchText('');
    setDebouncedSearchText('');
    setIsDrawerActive(true);
    setActiveTab(suggestion.categoryId);
  };

  return (
    <div className="relative mt-2 rounded-md shadow-sm">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm"><FaSearch /></span>
      </div>
      <input
        type="text"
        onChange={(e) => setSearchText(e.target.value)}
        value={searchText}
        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder="Search anything..."
      />
      {debouncedSearchText && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.length > 0 ? suggestions.map((suggestion) => {

            return (
              <li
                key={suggestion.widgetId}
                className="p-2 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSearchedWidget(suggestion)}
              >
                {suggestion.widgetTitle} in {suggestion.categoryName}
              </li>
            );
          }) : (
            <li className="p-2 cursor-pointer hover:bg-gray-100">No widget found</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;

