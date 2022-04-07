/* Global Variables */

let peaks = [];
let completeList = [];


/* Node Getters */

const mainDiv = () => document.getElementById('main');
const homeLink = () => document.getElementById('home-link');
const completeLink = () => document.getElementById('complete-link');
const listLink = () => document.getElementById('list-link');



/* Event Listeners */
const homeLinkEvent = () => {
    homeLink().addEventListener('click', renderHome)
}

const completeListEvent = () => {
    completeLink().addEventListener('click', renderComplete)
}

const fourteenerListEvent = () => {
    listLink().addEventListener('click', renderList)
}


/* Event Handlers */

const renderHome = event => {
    resetMainDiv();

    const p = document.createElement('p');
    const h2 = document.createElement('h4');
    const img = new Image(1000, 300);
    
    h2.className = "center-align";
    p.className = 'center-align';
    img.className = "center";

    h2.innerText = "\n A Minimal Guide to Colorado's Peaks Above 14,000ft"
    p.innerText= `\n Colorado is home to the most 14ers of any state. Use this site to check off your bucket list of CO peaks. \n This informtion is meant as a reference. All hikers should consult route maps, check weather advisories, and know their physical limiations before embarking up these peaks.`;
    img.src = "./brad-barmore-bP-L4h69_50-unsplash.jpg";
    
    mainDiv().appendChild(h2);
    mainDiv().appendChild(p);
    mainDiv().appendChild(img);
}

const renderComplete = event => {
    resetMainDiv();

    const h1 = document.createElement('h4');
    const p = document.createElement('p');
    const ul = document.createElement('ul');

    h1.className = 'center-align';
    ul.className = 'collection'

    h1.innerText = '\n Colorado Fourteeners Completed';
    if (completeList.length === 0){
        p.innerText = 'Use the Peak Finder to plan your next adventure!'
    }
    else {
        const thisMany = completeList.length; 
        p.innerText = `You've completed ${thisMany}/58 Fourteeners!`
    }

    mainDiv().appendChild(h1);
    mainDiv().appendChild(p);
    mainDiv().appendChild(ul);

    completeList.forEach(mtnPeak => {
        const li = document.createElement('li');
        const btn = document.createElement('button');
        
        li.className = 'collection-item';
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';

        li.innerText = mtnPeak + '\t'; 
        btn.textContent = '-';

        const handleDelete = () => {
            let mtnName = li.innerText.substring(0, li.innerText.length-2)
            for(let peak = 0; peak < completeList.length; peak++) {
                if (completeList[peak] === mtnName) {
                    completeList.splice(peak, 1);
                    li.remove();
                    renderComplete();
                } 
            }

        }
        btn.addEventListener('click', handleDelete);

        ul.appendChild(li);
        li.appendChild(btn);
   })
   console.log(completeList);
}

const renderList = event => {
    resetMainDiv();

    //taken from materialize as jQuery to initialize collapsible items
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
    peaks.forEach( mtnPeak => {

        const {name, elevation, rank, range, jerryLevel, numberOfRoutes} = mtnPeak;
        
        const li = document.createElement('li');
        const div = document.createElement('div');
        const div2 = document.createElement('div');
        const btn = document.createElement('button');
        
        div.className = 'collapsible-header';
        div2.className = 'collapsible-body';
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';

        div.innerText = name;
        div2.innerText = 'Elevation:' + ' ' + elevation + 'ft ' + '\n' + 'Rank:' + ' ' + rank + '\n' + 'Mountain Range:' + ' ' + range + '\n' + "Jerry Level:" + ' ' + jerryLevel + '\n' + "Number of Routes:" + ' ' + numberOfRoutes;
        btn.textContent = '+';

        const addToComplete = () => {
            console.log('you are here');
            let alreadyHere = false;
            for(let peak = 0; peak < completeList.length; peak++) {
                let mtnName = div.innerText;
                if (completeList[peak] === mtnName){
                    alreadyHere = true;
                    alert("You've already added this peak to your list!");
                }
            }
            if (alreadyHere === false) {
                completeList.push(div.innerText);
            }
            
        }
        btn.addEventListener('click', addToComplete);

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
    completeListEvent();
    fourteenerListEvent();
})


