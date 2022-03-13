console.log("hi")

/* Global Variables */

let peaks = [];

/* Node Getters */

const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const goalLink = () => document.getElementById('goal-link');
const listLink = () => document.getElementById('list-link');


/* Event Listeners*/
const homeLinkEvent = () => {
    homeLink().addEventListener('click', renderHome)
}

const goalListEvent = () => {
    goalLink().addEventListener('click', renderGoal)
}

const fourteenerListEvent = () => {
    listLink().addEventListener('click', renderList)
}

/* Event Handlers*/

const renderHome = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    h1.className = "center-align"
    p.className = 'center-align'
    h1.innerText='Colorado Fourteeners'
    p.innerText= 'Set goals and hike some shit.'

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);

    console.log('h1', h1);
    console.log('p', p);
    //<h1 class='center-align'>Colorado Fourteeners</h1>
    //<p class="center-align">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Adipisci optio inventore enim dolore magnam assumenda dolores sint corporis qui, odio quidem voluptatibus eligendi maiores eius obcaecati necessitatibus aliquid eos explicabo!</p>
}

const renderGoal = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    const h1 = document.createElement('h1');
    h1.innerText = 'Create Goals';
   // <h1>Create Goals</h1>
   mainDiv().appendChild(h1);
}

const renderList = event => {
    if (event) {event.preventDefault()}
    resetMainDiv();
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    h1.innerText = 'Colorado 14ner Peaks & Elevation';
    ul.className = 'collection';
    mainDiv().appendChild(h1);
    mainDiv().appendChild(ul);
    const li = document.createElement('li')
    peaks.forEach( peaks => {
        const li = document.createElement('li');
        li.className = "collection-item";
        li.innerText = peaks.name + ' ' + peaks.elevation + 'ft';
        
        ul.appendChild(li);
    })
    
}

/* Requests to External API */
const fourteenerAPIFetch = () => {
    fetch("https://fourteeners-api.herokuapp.com/api/v1/peaks")
    .then(function(response) {
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log('data', data);
        peaks = data;
    })
}


/* Misc */

const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

/* Startup - render homepage*/
document.addEventListener('DOMContentLoaded', function(){
    fourteenerAPIFetch();
    renderHome();    
    homeLinkEvent();
    goalListEvent();
    fourteenerListEvent();
})

