export const linkClasses = (isActive: boolean) => `
  navLink pl-[10px] sm:pl-0 border-b-[1px] sm:border-b-2
  transition ease-in-out duration-500 border-r-2 sm:border-r-0 
  border-r-transparent sm:border-white text-base whitespace-nowrap py-2
  ${
    isActive
      ? "pl-[12px] sm:pl-0 text-blue-700 border-r-blue-600 sm:border-b-blue-600 bg-blue-50 sm:bg-transparent"
      : "hover:pl-[12px] sm:hover:pl-0 hover:text-blue-700 hover:border-r-blue-600 sm:hover:border-blue-600 hover:bg-blue-50 sm:hover:bg-transparent"
  }
`;
