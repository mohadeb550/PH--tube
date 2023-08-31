// fetching data from server

const getData = async () => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/categories`);
    const data = await response.json();
    createVideos(data.data)
    
}


const createVideos = (categoriesArray) => {
    // dynamically create buttons and append this

    const buttonsContainer = document.getElementById(`buttons-container`);
    categoriesArray.forEach(category => {
        let button = document.createElement(`button`);
        button.className = `btn bg-zinc-200 text-base capitalize`;
        button.innerText = category.category;
        buttonsContainer.appendChild(button);

        showAllVideos(category.category_id);
    });

}


const showAllVideos = async (categoryID) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryID}`);
    const data = await res.json();

    const videosContainer = document.getElementById(`videos-container`);
    data.data.forEach(video => {
        console.log(video)
        let div = document.createElement(`div`);
        div.className = `video-card  space-y-5`;
        div.innerHTML = ` 
        
        <div class="relative">
        <img class="rounded-lg" src="${video.thumbnail
        }">
        <span class="absolute right-3 bottom-3 text-gray-300 text-sm bg-black p-1 rounded-md">3hrs 56 min ago</span>
    </div>
    <div class="flex items-start gap-3">
        <img class="w-12 rounded-full" src="https://i.ibb.co/D9wWRM6/olivia.jpg">
        <div class="space-y-1">
            <h1 class="font-bold">Building a Winning UX Strategy Using the Kano Model</h1>
            <h1>Awlad Hossain <i class="fa-solid fa-circle-check text-blue-500"></i></h1>
            <p>91K Views</p>
        </div>
    </div>`;

    videosContainer.appendChild(div);
    })
}










getData();