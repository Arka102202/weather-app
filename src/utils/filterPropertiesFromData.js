const country = {
  "name": "Afghanistan",
  "state_name": "Islamic Emirate of Afghanistan",
  "capital": [
    {
      "name": "Kabul",
      "notes": "official",
      "latitude": "34.575503",
      "longitude": "69.240073",
      "population": "3140853"
    }
  ],
  "iso_3166": {
    "alpha2": "AF",
    "subdivision": "ISO 3166-2:AF",
    "alpha3": "AFG",
    "numeric": "004"
  },
  "un_geoscheme": {
    "region": "Asia",
    "subregion": "Southern Asia"
  },
  "population": {
    "density_km": "50.38",
    "total": "32890171",
    "density_mi": "130.48"
  }
}

export const getCountryInfo = (country = {}) => {
  return { name: country.name, code: country.iso_3166.alpha2 };
}