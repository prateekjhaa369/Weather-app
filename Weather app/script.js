
const temperatureField = document.querySelector(".temp")
const locationField = document.querySelector(".time_location p")
const dateField = document.querySelector(".time_location span")
const weatherField = document.querySelector(".condition p")
const searchField = document.querySelector(".search_area")
const form = document.querySelector(".form")

if (form) {
  form.addEventListener('submit', searchForLocation);
} else {
  console.error("Form element not found! Make sure you have <form class='form'> in your HTML.");
}
let target = 'Lucknow'

const fetchResults = async (targetLocation) => {
  let url = `http://api.weatherapi.com/v1/current.json?key=13ea317ff5094655a1954131251306&q=${targetLocation}&aqi=no`

  const res = await fetch(url)
  const data = await res.json()
  console.log(data)

  let locationName = data.location.name
  let time = data.location.localtime
  let temp = data.current.temp_c
  let condition = data.current.condition.text
    

console.log(`Location: ${locationName}`)
console.log(`Time: ${time}`)
console.log(`Temp: ${temp}`)
console.log(`Condition: ${data.current.condition.text}`)
  
updateDetails(temp, locationName, time, condition);

}

function updateDetails(temp, locationName, time, condition){
  
  let splitDate = time.split(' ')[0]
  let splitTime = time.split(' ')[1]

  const dayName = new Date(`${splitDate}T00:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "Asia/Kolkata" // optional but recommended for accuracy
  })
  temperatureField.innerText = temp
  locationField.innerText = locationName
  dateField.innerText = `${splitTime} ${dayName} ${splitDate}`

  weatherField.innerText= condition
}
function searchForLocation(e){
  e.preventDefault()

  target = searchField.value
  
  fetchResults(target)
}

fetchResults(target)


function getDayName(number){
  switch (number){
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
}