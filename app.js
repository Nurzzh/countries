const header = document.querySelector(".header")
const checkbox = document.querySelector(".checkbox")
const container = document.querySelector(".container")
const searchSection = document.querySelector(".search-section")
const input = document.querySelector("#input")
const select = document.querySelector(".select")
const main = document.querySelector(".main")

container.appendChild(main)
main.classList.add('main')

function displayCountries(results) {
    main.innerHTML = ""

    results.forEach(element => {
        const { name: { common },
            population, region,
            flags: { png },
            capital } = element

        main.innerHTML +=
            ` 
            <div class="card"> 
            <img src="${png}" alt=""/> 
            <h2>${common}</h2> 
            <p><b>Population:</b> ${population}</p> 
            <p><b>Region:</b> ${region}</p> 
            <p><b>Capital:</b> ${capital}</p> 
            </div> 
            `
    });
}

async function countryData() {
    try {
        const response = await fetch(`https://restcountries.com/v3.1/all`)
        const data = await response.json();
        console.log(data)
        displayCountries(data)

        input.addEventListener("input", () => {
            const searchTerm = input.value.trim().toLowerCase()
            const filteredCountries = data.filter(country => {
                return country.name.common.toLowerCase().includes(searchTerm)
            })
            displayCountries(filteredCountries)
        })

        select.addEventListener("change", () => {
            const selectedRegion = select.value.trim().toLowerCase()
            const filteredCountries = data.filter(country => {
                return country.region.toLowerCase().includes(selectedRegion)
            })
            displayCountries(filteredCountries)
        })
    }
    catch (error) {
        console.error(error)
    }
}
countryData()
