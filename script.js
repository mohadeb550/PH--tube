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
        button.className = `btn bg-zinc-200 text-base capitalize btn-category`;
        button.id = category.category_id;
        button.innerText = category.category;
        buttonsContainer.appendChild(button);
    });
//  set all category as a default
    setVideos(`1000`);

    // set event listener on categories buttons with id
    const categoryButtons = document.querySelectorAll(`.btn-category`);
    categoryButtons.forEach(button => {
        button.addEventListener(`click`, function(e){
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
    let timeSpan = document.querySelector(`.image-div span`);
    
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
    data.data.forEach(video => {
        
        let div = document.createElement(`div`);
        div.className = `video-card  space-y-5`;
        div.innerHTML = ` 
        
        <div class="relative image-div">
        <img class="rounded-lg" src="${video.thumbnail
        }">
        <span class="absolute right-3 bottom-3 text-gray-300 text-sm bg-black p-1 rounded-md ${video.others.posted_date? "": 'hidden' } "> ${video.others.posted_date? secondsToTime(video.others.posted_date): '' } </span>
    </div>
    <div class="flex items-start gap-3">
        <img class="w-12 rounded-full" src="${video.authors[0].profile_picture}">
        <div class="space-y-1">
            <h1 class="font-bold">${video.title}</h1>
            <h1> ${video.authors[0].profile_name} ${video.authors[0].verified === true? '<i class="fa-solid fa-circle-check text-blue-500"></i>' : " "} </h1>
            <p>${video.others.views} views</p>
        </div>
    </div>`;

    videosContainer.appendChild(div);
    })
}



// convert seconds to original time

 const secondsToTime = (seconds) =>{
    let getMinutes = Math.round(seconds / 60);
    let hours = Math.floor(getMinutes / 60);
    let correctMinutes = getMinutes % 60;
    return `${hours}hrs ${correctMinutes} min ago`;
 }

