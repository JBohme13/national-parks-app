const baseUrl = 'https://developer.nps.gov/api/v1/parks'
const apiKey ='ypYAeIqaEUjPM3uoih4KRK5vQcfOh735Sqxtorpz'

function formatQueryString(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function getParks() {
    const searchTerm = $('#stateCode').val();
    const maxResults = ($('#maxResults').val())-1;
    const params = {
        api_key: apiKey,
        stateCode: searchTerm,
        limit: maxResults
    };
    const queryString = formatQueryString(params);
    const url = baseUrl + '?' + queryString;
    console.log(url);
    fetch(url)
    .then (response => {
        if (response.ok) {
            return response.json();
        } throw new Error(response.statusText)})
    .then (responseJson => displayResults(responseJson))
    .catch (error => {
        $('.errorMessage').text(`Something went wrong: ${error.message}`);
    });
}

function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i = 0; i < responseJson.data.length; i++) {
        $('#results-list').append(
            `<li><h2>${responseJson.data[i].fullName}</h2><br>
            <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}<a/><br>
            <p>${responseJson.data[i].description}</p>
            </li>`);
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        getParks();
    });
}

watchForm();