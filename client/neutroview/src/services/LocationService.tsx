import axios from "axios";

export function setClientLocation(
  dispatcher: React.Dispatch<React.SetStateAction<string>>
): void {
  axios
    .get("https://ipapi.co/json/")
    .then((response) => {
      const country = response.data.country_name;
      dispatcher(country);
    })
    .catch((error) => {
      console.error("Error fetching client location:", error);
    });
}
