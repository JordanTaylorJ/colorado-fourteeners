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
   mainDiv().appendChild(h1);
   const ul = document.createElement('ul');
   ul.className = 'collection'
   mainDiv().appendChild(ul);
   goalList.forEach(mtnPeak => {
       const li = document.createElement('li');
       li.className = 'collection-item';
       li.innerText = mtnPeak;
       const btn = document.createElement('button');
       btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';
       btn.textContent = '-';
       const handleDelete = (mtnPeak) => {
        goalList.splice(mtnPeak, 1);
        li.remove();
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
    /*document.addEventListener('DOMContentLoaded', function() {
        console.log('this is working')
        const elems = document.querySelectorAll('.collapsible');
        const instances = M.Collapsible.init(elems, options);
    });*/
    $(document).ready(function(){
        $('.collapsible').collapsible();
      });
    const h1 = document.createElement('h1');
    const ul = document.createElement('ul');
    h1.innerText = 'Colorado 14ner Peaks & Elevation';
    ul.className = 'collapsible';
    mainDiv().appendChild(h1);
    mainDiv().appendChild(ul);
    
    peaks.forEach( peaks => {
        const li = document.createElement('li');
        const div = document.createElement('div');
        div.className = 'collapsible-header';
        const div2 = document.createElement('div');
        div2.className = 'collapsible-body';
        div.innerText = peaks.name + ' ' + peaks.elevation + 'ft ';
        div2.innerText = 'Rank:' + ' ' + peaks.rank + '\n' + 'Mountain Range:' + ' ' + peaks.range + '\n' + "Jerry Level:" + ' ' + peaks.jerryLevel + '\n' + "Number of Routes:" + ' ' + peaks.numberOfRoutes;
        const btn = document.createElement('button');
        btn.className = 'btn-floating btn-small waves-effect waves-light-blue material-icons';
        btn.textContent = '+';
        const addToGoals = () => {
            goalList.push(div.innerText);
        }
        btn.addEventListener('click', addToGoals);
        ul.appendChild(li);
        li.appendChild(div);
        li.appendChild(div2);
        div.appendChild(btn);
    })
    
}


/*
<ul class="collapsible">
<li>
  <div class="collapsible-header"><i class="material-icons">filter_drama</i>First</div>
  <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
</li>
<li>
  <div class="collapsible-header"><i class="material-icons">place</i>Second</div>
  <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
</li>
<li>
  <div class="collapsible-header"><i class="material-icons">whatshot</i>Third</div>
  <div class="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
</li>
</ul>
*/

/* Handle Delete from Goals */





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

