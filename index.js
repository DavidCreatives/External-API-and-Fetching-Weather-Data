// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="
// This Url can be thought of as an endpoint

// Your code here!
const body = document.body


async function fetchWeatherAlerts(state) {
    try{
        const inputField = document.querySelector('#state-input')
        state = inputField.value.trim().toUpperCase()

        
        inputField.value = ''        
        
        if(state.length !== 2){
            console.log('Kindly ensure you have 2 characheter long value')
        }
        const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`)
        
        if(!response.ok){
            const errorData = await response.json()
            console.error('API Error:', errorData.detail || 'Invalid area code')
            return; // Stop execution so we don't try to parse the body again
        }

        const data = await response.json()
        

        errorDisplay.textContent = ''

        const displayData = document.getElementById('alerts-display')
        
        console.log(data)
        function displayAlerts(data){
            // console.log(data.features.length)
            // console.log(data.features[3].properties.headline)
            
            displayData.textContent = (`${data.title} : ${data.features.length}`)  

            const headlineList = document.createElement('ul')
            displayData.appendChild(headlineList)

            for(let i = 0; i < data.features.length; i++){
                const headlineLine = document.createElement('li')
                headlineLine.textContent = data.features[i].properties.headline

                headlineList.appendChild(headlineLine)

                const errorDisplay = document.querySelector('#error-message')
                errorDisplay.className = 'hidden'
            }

        }

        displayAlerts(data)
       
    }
    catch(error){
        console.log(error)
        const errorDisplay = document.querySelector('.error-message')
        errorDisplay.className = 'hidden'
    }
    finally{
        return
    }
}

document.addEventListener('')
