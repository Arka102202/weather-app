const fetchDataUsingAPI = async (url, options) => {

  try {
    const resp = await fetch(url, options);
    if(!resp.ok) throw new Error("");
    const result = await resp.json();
    if (!result.error) {
      return result;
    } else {
      console.log("error");
      return { error: true, message: "Something went wrong..." };
    }
  } catch (error) {
    console.log("error");
    return { error: true, message: "Something went wrong..." };
  }
};


export const getAllCountriesWithCode = () => {


  const url = 'https://countries33.p.rapidapi.com/basic';
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': process.env.REACT_APP_X_RapidAPI_Key,
      'X-RapidAPI-Host': process.env.REACT_APP_X_RapidAPI_Host
    }
  };
  return fetchDataUsingAPI(url, options);

} 