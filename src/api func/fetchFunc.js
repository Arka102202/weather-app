const fetchDataUsingAPI = async (url, options) => {

  try {
    const resp = await fetch(url, options);
    if (!resp.ok) throw new Error("");
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

export const getPlaceInfo = async (query = "") => {
  const url = `https://trueway-places.p.rapidapi.com/FindPlaceByText?text=${encodeURIComponent(query)}&language=en`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':  process.env.REACT_APP_Key,
      'X-RapidAPI-Host': process.env.REACT_APP_location_Host
    }
  };

  const resp = await fetchDataUsingAPI(url, options);

  if (resp && resp.results.length === 0) return { error: true, message: "No place found ...." };

  console.log(resp.results[0]);

  return resp.results[0];
}