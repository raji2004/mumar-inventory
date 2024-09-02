export const RESPONSIVE_LAYOUT_PADDING =
  "p-4 md:p-8 lg:p-10 2xl:p-20 3xl:p-24  ";

  export const convertToNaira = (price: number | undefined): string => {
    if (price === undefined || price === null) {
      return '₦0.00'; // Return a default value if price is undefined
    }
  
    const nairaValue = price.toFixed(2); // Format to 2 decimal places
    const parts = nairaValue.split('.'); // Split into whole and decimal parts
    const wholePart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas
    return `₦${wholePart}.${parts[1]}`; // Combine and return
  };