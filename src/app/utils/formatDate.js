// Function to convert date to dd-mm-yyyy format
const formatDate = (dateString) => {
    console.log(typeof dateString);
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
};

export default formatDate;
