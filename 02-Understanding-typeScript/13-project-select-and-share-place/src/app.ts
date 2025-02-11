import axios from 'axios';
// get user input
const form = document.querySelector('form')!;
const addressInput = document.getElementById('address')! as HTMLInputElement;
declare var google: any;

type GoogleGeocodingResponse = {
    results: { geometry: { location: { lat: number; lng: number } } }[];
    status: "OK" | "ZERO_RESULTS";
};

// THIS API KEY IS INVALID OF COURSE...
const GOOGLE_API_KEY = 'AIzaSyCIaAc2c5M3VpbCH6PPq_guwy9lHuowXOs';

form.addEventListener('submit', handleSearchAddress)
function handleSearchAddress(event: Event) {
    event.preventDefault();
    const address = addressInput.value;
    console.log(address);
    //fetch(address, {})
    // send to google API... with axios
    //https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY_HERE&callback=console.debug&libraries=maps,marker&v=beta
    axios
        .get<GoogleGeocodingResponse>(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
                address
            )}&key=${GOOGLE_API_KEY}`
        )
        .then(response => {
            if (response.data.status !== "OK") {
                throw new Error("Could not fetch location!");
            }
            const coordinates = response.data.results[0].geometry.location;
            console.log('coordinates', coordinates);
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
               center: coordinates,
               zoom: 16
            });
            //
            new google.maps.Marker({ position: coordinates, map: map });
        })
        .catch(err => {
            alert(err.message);
            console.log(err);
        });
}