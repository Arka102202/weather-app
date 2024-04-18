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