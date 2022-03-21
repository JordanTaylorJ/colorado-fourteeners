/* Global Variables */

let peaks = [];
let goalList = [];


/* Node Getters */

const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const goalLink = () => document.getElementById('goal-link');
const listLink = () => document.getElementById('list-link');


/* Event Listeners */
const homeLinkEvent = () => {
    homeLink().addEventListener('click', renderHome)
}

const goalListEvent = () => {
    goalLink().addEventListener('click', renderGoal)
}

const fourteenerListEvent = () => {
    listLink().addEventListener('click', renderList)
}


/* Event Handlers */

const renderHome = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    //const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const h2 = document.createElement('h4');
    const img = new Image(1000, 300);
    //h1.className = "center-align";
    h2.className = "center-align";
    p.className = 'center-align';
    img.className = "center";
    //h1.innerText='Colorado Fourteeners';
    h2.innerText = "\n A Minimal Guide to Colorado's Peaks Above 14,000ft"
    p.innerText= `\n Colorado is home to the most 14ers of any state. Use this site to check off your bucket list of CO peaks. \n This informtion is meant as a reference. All hikers should consult route maps, check weather advisories, and know their physical limiations before embarking up these peaks.`;
    img.src = "./brad-barmore-bP-L4h69_50-unsplash.jpg";
    //mainDiv().appendChild(h1);
    mainDiv().appendChild(h2);
    mainDiv().appendChild(p);
    mainDiv().appendChild(img);
}

const renderGoal = event => {
    if (event) {
        event.preventDefault();
    }
    resetMainDiv();
    const h1 = document.createElement('h4');
    const p = document.createElement('p');
    h1.innerText = '\n Colorado Fourteeners Completed';
    h1.className = 'center-align';
    
    if (goalList.length === 0){
        p.innerText = 'Use the Peak Finder to plan your next adventure!'
    }
    else {
        const thisMany = goalList.length; 
        p.innerText = `You've completed ${thisMany}/53 Fourteeners!`
    }
        mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    const ul = document.createElement('ul');
    ul.className = 'collection'
    mainDiv().appendChild(ul);
    goalList.forEach(mtnPeak => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.innerText = mtnPeak + '\t';
        const btn = document.createElement('button');
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';
        btn.textContent = '-';
        const handleDelete = () => {
            let mtnName = li.innerText.substring(0, li.innerText.length-2)
            for(let peak = 0; peak < goalList.length; peak++) {
                console.log(mtnName);
                if (goalList[peak] === mtnName) {
                    goalList.splice(peak, 1);
                    li.remove();
                    renderGoal();
                } 
            }
             
        }
        btn.addEventListener('click', handleDelete);
        ul.appendChild(li);
        li.appendChild(btn);
   })
   
   console.log(goalList);
}

const renderList = event => {
    if (event) {event.preventDefault()}
    resetMainDiv();
    //taken from materialize as jQuery to initialize collaplible items
    $(document).ready(function(){
        $('.collapsible').collapsible();
    });
    const h1 = document.createElement('h4');
    const p = document.createElement('p');
    const ul = document.createElement('ul');
    
    ul.className = 'collapsible';
    h1.className = 'center-align';

    h1.innerText = '\n Colorado 14er Peaks & Elevation';
    p.innerText = 'Click the Fourteener for more information. Use the + to add it to your completed list!'
    
    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(ul);
    peaks.forEach( peaks => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        const btn = document.createElement('button');
        
        div.className = 'collapsible-header';
        div2.className = 'collapsible-body';
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';

        div.innerText = peaks.name;
        div2.innerText = 'Elevation:' + ' ' + peaks.elevation + 'ft ' + '\n' + 'Rank:' + ' ' + peaks.rank + '\n' + 'Mountain Range:' + ' ' + peaks.range + '\n' + "Jerry Level:" + ' ' + peaks.jerryLevel + '\n' + "Number of Routes:" + ' ' + peaks.numberOfRoutes;
        btn.textContent = '+';

        const addToGoals = () => {
            goalList.push(div.innerText);
        }
        btn.addEventListener('click', addToGoals);
        ul.appendChild(li);
        li.appendChild(btn);
        li.appendChild(div);
        li.appendChild(div2);
        
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


/* Startup - render homepage */
document.addEventListener('DOMContentLoaded', function(){
    fourteenerAPIFetch();
    renderHome();    
    homeLinkEvent();
    goalListEvent();
    fourteenerListEvent();
})

