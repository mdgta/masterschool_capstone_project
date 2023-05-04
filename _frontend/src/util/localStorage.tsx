const fallbackLocalStorage = typeof window !== "undefined" ? window.localStorage : {getItem: () => "", setItem: () => ""};

export default fallbackLocalStorage;