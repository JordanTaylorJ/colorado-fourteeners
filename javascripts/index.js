console.log("hi")

/* Global Variables */

/* Node Getters */

const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');


/* Event Listeners*/
const homeLinkEvent = () => {
    homeLink().addEventListener('click', renderHome)
}

/* Event Handlers*/

const renderHome = () => {
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

/* Misc */

const resetMainDiv = () => {
    mainDiv().innerHTML = '';
}

/* Startup - render homepage*/
document.addEventListener('DOMContentLoaded', function(){
    renderHome();    
    homeLinkEvent();
})

