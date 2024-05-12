/* Students: Please use this week's project for Week 16: Assignment 14: Your Mobile App.
     You will need to replace the contents of this JavaScript file with your own work,
     and create any other files, if any, required for the assignment.
     When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */
'use strict';

// define a react page component using traditional pure JS
function ProjectList(props) {
// return some output for the component using JSX
return (<div className="text-center container">
    <h1>{props.message1}</h1>
    <h2>{props.message2}</h2>
    <ul className="nav nav-tabs sticky-top" id="myTab" role="tablist">
        {Object.keys(props.entries).map((prop, ind) => (
        <li className="nav-item" role="presentation" key={ind}>
            <button className={"nav-link "+ ((ind==0)?"active":"")} id={prop + "-tab"} data-bs-toggle="tab" data-bs-target={"#" + prop + "-tab-pane"} type="button" role="tab" aria-controls={prop + "-tab-pane"} aria-selected={ind==0}>{prop}</button>
        </li>
        ))}
    </ul>
    <div className="tab-content" id="myTabContent">
    {
    // copy current array value into item and pass to arrow function
    // use map() to loop thru array passed in props.list, creating new element for each array value
    Object.keys(props.entries).map((prop, ind) => (
        <div className={"tab-pane fade active container " + ((ind==0)?"show active":"")} id={prop + "-tab-pane"} role="tabpanel" aria-labelledby={prop + "-tab"} tabIndex="0" key={ind}>
            <div className="row gy-2 py-2">
            {props.entries[prop].map((item,index) => (
            <div className="col-md-4 col-lg-3" key={index}>
                <div className="card p-3">
                <img src={item.image_path} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">{item.date}</h6>
                    <p className="card-text">{item.description}</p>
                    <a href={item.url} className="btn btn-primary">Visit Project</a>
                </div>
                </div>
            </div>
            ))}
            </div>
        </div>
    ))}
    </div>
    </div>);
}

// define dataset as array in a variable
let data;

// this time we will want to refresh our react component once data changes,
// so place the code into a named function to make it reusable!
function updateComponent() {
// call render() to output a component into an existing html element
    root.render(
        <ProjectList entries={data} message1="CS50C Portfolio" message2="Projects from the Front-End Developer Certificate program at Santa Rosa Junior College" />

    );
}

let globalTabs;

function swipeLeft(){
    let tabs = $("#myTab").children().children();
    let active = 0
    while(active<tabs.length){
        if (tabs[active].ariaSelected=="true"){
            break;
        }
        active++;
    }
    active++;
    if (active >= tabs.length){
        active = 0;
    }
    let targetId = tabs[active].id;
    $("#"+targetId).click();
}

function swipeRight(){
    let tabs = $("#myTab").children().children();
    let active = 0
    while(active<tabs.length){
        if (tabs[active].ariaSelected=="true"){
            break;
        }
        active++;
    }
    active--;
    if (active < 0){
        active = tabs.length - 1;
    }
    let targetId = tabs[active].id;
    $("#"+targetId).click();
}

var hammertime = new Hammer(document.getElementById('myApp'));
hammertime.on('swipeleft', function(ev) {
	swipeLeft();
});
hammertime.on('swiperight', function(ev) {
	swipeRight();
});


// call react createRoot() with an existing html element
const root = ReactDOM.createRoot(document.getElementById('myApp'));

d3.json("content.json").then((json) => {
    data = json;
    // call updateComponent first time page loads
    updateComponent();
});



//