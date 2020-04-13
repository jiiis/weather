const weatherForm = document.querySelector('form');
const addressInput = document.querySelector('input');
const locationParagraph = document.querySelector('#location');
const forecastParagraph = document.querySelector('#forecast');

weatherForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const address = addressInput.value;

  if (!address) {
    locationParagraph.textContent = 'Please enter your address.';

    return;
  }

  locationParagraph.textContent = 'Loading...';
  forecastParagraph.textContent = '';

  fetch(`http://localhost:3000/weather?address=${encodeURIComponent(address)}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        locationParagraph.textContent = data.error;

        return;
      }

      locationParagraph.textContent = data.location;
      forecastParagraph.textContent = data.forecast;
    });
  });
});
