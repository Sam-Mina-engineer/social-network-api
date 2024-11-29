module.exports = (timestamp) => {
    return new Date(timestamp).toLocaleString('en-US', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };
  
  // It helps to have a file for formatting date, makes for cleaner code and you can import the function.

  // this is my preference