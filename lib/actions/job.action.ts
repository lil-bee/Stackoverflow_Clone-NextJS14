interface getJobsParams {
  query?: string;
  page?: number;
  filter?: string;
}

export async function getJob(params: getJobsParams) {
  const { query, page = 1, filter } = params;
  const jobQuery = query + " " + filter;
  const url = `https://jsearch.p.rapidapi.com/search?query=${jobQuery}&page=${page}&num_pages=1&date_posted=all`;
  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "4cdd245699msh6e5b5edd6893699p15247djsn66449e97b275",
      "x-rapidapi-host": "jsearch.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const jobData = result.data;

    return { jobData };
  } catch (error) {
    console.log(error);
  }
}

export async function getCountryList() {
  const url = "https://restcountries.com/v3.1/all?fields=name";
  const options = {
    method: "GET",
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    return { result };
  } catch (error) {
    console.log(error);
  }
}
