const { createContext, useState } = require("react");

const defaultCachedData = {
  Dental: [],
  Opthalmic: [],
};

const defaultProvider = {
  cachedData: defaultCachedData,
  setCachedData: () => Boolean,
};

const SearchDataContext = createContext(defaultProvider);

const SearchDataProvider = ({ children }) => {
  const [cachedData, setCachedData] = useState(defaultCachedData);

  return (
    <SearchDataContext.Provider value={{ cachedData, setCachedData }}>
      {children}
    </SearchDataContext.Provider>
  );
};

export { SearchDataContext, SearchDataProvider };

