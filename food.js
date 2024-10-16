 const searchBox=document.querySelector('.searchbox');
 const searchbtn=document.querySelector('.btn');
 const reacipiContainer=document.querySelector('.recipe-container');
 const recipedetailContent=document.querySelector('.recipe-detail-content');
 const recipeClose=document.querySelector('.recipe-close');
 

 const fetchapi=async (query) =>{
    reacipiContainer.innerHTML="Fetching recipes-----";  
        
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
const responce= await data.json(); 

reacipiContainer.innerHTML="";
responce.meals.forEach(meal => {
    const reciDiv=document.createElement('div');
    reciDiv.classList.add('recipe');
    reciDiv.innerHTML=`<img src="${meal.strMealThumb}">
    <h3> ${meal.strMeal}</h3>
    <p> <span>${meal.strArea}</span> Dish</p>
    <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `

    const button=document.createElement('button')
    button.textContent="Veiw Recipe";
    reciDiv.appendChild(button);

  button.addEventListener('click',()=>{
    openRecipePopup(meal);

  });
    reacipiContainer.appendChild(reciDiv);    
});
 }

 const fetchIngredent=(meal)=>{
    let Ingredentslist="";
    for(let i=1;i<=20;i++){
        const Ingredent=meal[`strIngredient${i}`];
        if(Ingredent){
            const measure=meal[`strMeasure${i}`];
            Ingredentslist  +=`<li>${measure} ${Ingredent}</li>`
        }else{
            break;
        }
    }
    return Ingredentslist;


 }
 const openRecipePopup=(meal)=>{
    recipedetailContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredents:</h3>
    <ul class="IngredientList">${fetchIngredent(meal)}</ul>
     
        <div class="Instruction>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>

    </div>

    `
    recipedetailContent.parentElement.style.display="block";

 }

recipeClose.addEventListener('click',()=>{
    recipedetailContent.parentElement.style.display="none";
})
 searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput){
        reacipiContainer.innerHTML=`<h2>Type the meal in the search box </h2>`;
        return;
    }
    fetchapi(searchInput);
    
 });


