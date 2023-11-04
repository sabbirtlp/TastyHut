




// const loadMeals = (searchText) => {
//     const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => displayMeals(data.meals))
// }

// const displayMeals = (meals) => {
//     console.log(meals);
//     const mealsContainerInner = document.getElementById('meals_container_inner');
//     mealsContainerInner.innerText = ''
//     meals.forEach(meal => {
//         let mealInstruction = meal.strInstructions;
//         if (mealInstruction.length > 200) {
//             mealInstruction = mealInstruction.substring(0, 200) + "...";
//         }

//         const singleMealBox = document.createElement('div');
//         singleMealBox.classList.add('single_meal_box', 'flex', 'flex-col', 'md:flex-row', 'lg:flex-row', 'bg-[#f8f8f8]', 'm-3')

//         singleMealBox.innerHTML = `
//         <div class="  thumbnail_image_box"> <img src="${meal.strMealThumb}" alt=""
//                                 class="h-[250px] w-[100%] md:w-[100%] lg:w-[1000px] object-cover">
//                         </div>
//                         <div class="single_meal_content_box p-5 flex flex-col justify-center ">
//                             <h2 class="single_meal_title 
//                             text-[20px] text-center md:text-left lg:text-left font-semibold md:text-[20px] lg:text-3xl md:font-bold lg:font-bold">${meal.strMeal}</h2>
//                             <p class="single_meal_excerpt py-2 text-center md:text-left lg:text-left">
//                                 ${mealInstruction}
//                             </p>
//                             <button onclick="loadMealDetails(${parseFloat(meal.idMeal)})" class="underline text-[#FFC107] font-medium text-center md:text-left lg:text-left" id="view-details-btn">View Details</button>
//                         </div>
//         `
//         mealsContainerInner.appendChild(singleMealBox)
//     })
// }

let shownMeals = 6; // Number of meals to initially display
let allMeals = []; // Array to store all the meals from the API

const loadMeals = (searchText) => {
    const URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(URL)
        .then(res => res.json())
        .then(data => {
            allMeals = data.meals; // Store all the meals in the array
            displayMeals(shownMeals); // Display the initial 6 meals
        });
}

const displayMeals = (count) => {
    const mealsContainer = document.getElementById('meals_container')

    const mealsContainerInner = document.getElementById('meals_container_inner');
    mealsContainerInner.innerHTML = ''; // Clear the container

    for (let i = shownMeals - 6; i < count; i++) {
        if (i >= allMeals.length) {
            break; // Break if there are no more meals to display
        }

        const meal = allMeals[i];
        let mealInstruction = meal.strInstructions;
        if (mealInstruction.length > 200) {
            mealInstruction = mealInstruction.substring(0, 200) + "...";
        }

        const singleMealBox = document.createElement('div');
        singleMealBox.classList.add('single_meal_box', 'flex', 'flex-col', 'md:flex-row', 'lg:flex-row', 'bg-[#f8f8f8]', 'm-3');

        singleMealBox.innerHTML = `
            <div class="thumbnail_image_box">
                <img src="${meal.strMealThumb}" alt="" class="h-[250px] w-[100%] md:w-[100%] lg:w-[1000px] object-cover">
            </div>
            <div class="single_meal_content_box p-5 flex flex-col justify-center">
                <h2 class="single_meal_title text-[20px] text-center md:text-left lg:text-left font-semibold md:text-[20px] lg:text-3xl md:font-bold lg:font-bold">${meal.strMeal}</h2>
                <p class="single_meal_excerpt py-2 text-center md:text-left lg:text-left">
                    ${mealInstruction}
                </p>
                <button onclick="loadMealDetails(${parseFloat(meal.idMeal)})" class="underline text-[#FFC107] font-medium text-center md:text-left lg:text-left" id="view-details-btn">View Details</button>
            </div>
        `;
        mealsContainerInner.appendChild(singleMealBox);
    }

    if (count < allMeals.length) {
        const showMoreButton = document.getElementById('showMoreButton')

        showMoreButton.addEventListener('click', () => {
            shownMeals += 6;
            displayMeals(shownMeals);
        });
    }
}


const searchMeal = () => {
    const searchInputField = document.getElementById('search_input_field').value;
    loadMeals(searchInputField)
}

const loadMealDetails = async (mealId) => {
    console.log(mealId);
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url);
    const data = await res.json()
    displayMealDetails(data.meals[0]);
}

const openModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.remove('hidden');
}
const closeModal = () => {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}
const displayMealDetails = (meal) => {
    openModal()
    const modal = document.getElementById('modal');
    const modalContainer = document.createElement('div')
    modal.innerText = '';
    modalContainer.classList.add('modal-container', 'bg-white', 'w-11/12', 'md:w-[752px]', 'mx-auto', 'rounded', 'shadow-lg', 'z-50', 'overflow-y-auto')

    modalContainer.innerHTML = `
    <header >
    <div class="flex justify-between items-center p-3">
    <p class="text-2xl font-bold">${meal.strMeal}</p>
    <button onclick="closeModal()" class="modal-close cursor-pointer z-50 fixed right-[602px]" >
        <svg  class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18"
            height="18" viewBox="0 0 18 18">
            <path "
                d="M18 1.41l-1.41-1.41-7.59 7.59-7.59-7.59-1.41 1.41 7.59 7.59-7.59 7.59 1.41 1.41 7.59-7.59 7.59 7.59 1.41-1.41-7.59-7.59 7.59-7.59z">
            </path>
        </svg>
    </button>
</div>
</header>
<div class="modal-content py-4 text-left px-6 overflow-y-auto h-[400px] md:h-[500] lg:h-[600px] relative">

<img src="${meal.strMealThumb}" class="rounded w-full mb-5 h-[400px] object-cover"/>
<p class="my-3"><strong class="font-bold text-[18px]">Category:</strong> ${meal.strCategory}</p>
<p class="my-3"><strong class="font-bold text-[18px]">Area:</strong> ${meal.strArea}</p>
<p class="text-[16px] my-4">${meal.strInstructions}</p>
<div class="links mt-5">
    <ul class="flex justify-left items-center">
        <li class="text-5xl text-[#FFC107]"><a href="${meal.strYoutube}" target="_blank"><i class='bx bxl-youtube'></i></a></li>
        <li class="text-5xl text-[#DC3545]"><a href="${meal.strSource}" target="_blank"><i class='bx bx-news' ></i></a></li>
    </ul>
</div>
<button onclick="closeModal()" class="modal-close cursor-pointer bg-[#DC3545] text-white py-2 px-5 font-semibold text-[18px] block ml-auto rounded mb-8" >
Close
</button>
</div>
`

    modal.appendChild(modalContainer)

}



loadMeals('fish')