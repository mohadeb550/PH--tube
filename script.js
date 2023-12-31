// fetching data from server

const getData = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    setData(data.data)
    
}

getData();

const setData = (categoriesArray) => {
    // dynamically create buttons and append this

    const buttonsContainer = document.getElementById(`buttons-container`);
    categoriesArray.forEach(category => {
        let button = document.createElement(`button`);
        button.className = `px-4 py-2 bg-zinc-200 rounded-md capitalize btn-category`;
        button.id = category.category_id;
        button.innerText = category.category;
        buttonsContainer.appendChild(button);
    });
//  set all category as a default
    setVideos(`1000`);
    document.getElementById(`1000`).classList.add(`active`);

    // set event listener on categories buttons with id
    const categoryButtons = document.querySelectorAll(`.btn-category`);
    categoryButtons.forEach(button => {
        button.addEventListener(`click`, function(e){

            document.querySelector(`#buttons-container .active`)?.classList.remove(`active`);
            const sortBtn = document.getElementById(`sort-btn`).classList.remove(`active`);
            e.target.classList.add(`active`);

            setVideos(e.target.id);
        })
    })

}

//   set specific videos by clicking on buttons

const setVideos = async (categoryID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await res.json();

    const videosContainer = document.getElementById(`videos-container`);
    videosContainer.textContent = ``;


    // checking category have any data or not? 

    if(data.status === false || data.data.length === 0){
        const notFoundBanner = document.getElementById(`not-found-banner`);
        notFoundBanner.classList.remove(`hidden`);
        return;
    }else{
        const notFoundBanner = document.getElementById(`not-found-banner`);
        notFoundBanner.classList.add(`hidden`);
    }
//  set videos
    createVideos(data.data);

// sort button event handler
 const sortBtn = document.getElementById(`sort-btn`);
 sortBtn.addEventListener(`click`, ()=>{
    sortBtn.classList.add(`active`)
    if(videosContainer.textContent === ``){
        return;
    }
    sortArrayByViews(data.data);
    createVideos(data.data);
})

    // create videos and append into container

   function createVideos (videosArray){

    videosContainer.textContent = ``;

        videosArray.forEach(video => {
        // console.log(video)
        let div = document.createElement(`div`);
        div.className = `video-card space-y-5`;
        div.innerHTML = ` 
        
        <div class="relative image-div sm:h-[160px] h-[205px] md:h-[213px] lg:h-[250px] ">
        <div style="background:url(${video.thumbnail}); background-size:cover;" class="h-full rounded-lg">
            
        </div>
        <span class="absolute right-3 bottom-3 text-gray-300 text-sm bg-black p-1 rounded-md ${video.others.posted_date? "": 'hidden' } "> ${video.others.posted_date? secondsToTime(video.others.posted_date): '' } </span>
    </div>
    <div class="flex items-start gap-3">
        <img class="w-[45px] h-[45px] object-cover rounded-full" src="${video.authors[0].profile_picture}">
        <div class="space-y-1">
            <h1 class="font-bold">${video.title}</h1>
            <h1> ${video.authors[0].profile_name} ${video.authors[0].verified === true? '<i class="fa-solid fa-circle-check text-blue-500"></i>' : " "} </h1>
            <p>${video.others.views} views</p>
        </div>
    </div>`;

    videosContainer.appendChild(div);
    })
   }
}

// convert seconds to original time

 const secondsToTime = (seconds) =>{
    let getMinutes = Math.round(seconds / 60);
    let hours = Math.floor(getMinutes / 60);
    let correctMinutes = getMinutes % 60;
    return `${hours}hrs ${correctMinutes} min ago`;
 }

//  apply sort on categories array

 const sortArrayByViews = (array) => {
    
    array.sort((a, b) =>{
    let firstValue = parseFloat(a.others.views.slice(0, a.others.views.length - 1));
   let secondsValue = parseFloat(b.others.views.slice(0, b.others.views.length - 1));
   return secondsValue - firstValue;
})
}
