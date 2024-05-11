/* Students: Please use this week's project for Week 15: Assignment 13: Basic Mobile App.
You will need to replace the contents of this JavaScript file with your own work,
and create any other files, if any, required for the assignment.
When you are done, be certain to submit the assignment in both Repl.it and Canvas to be graded. */
'use strict';

// define a react page component using traditional pure JS
function ProjectList(props) {
// return some output for the component using JSX
return (<div>
    <h1>{props.message1}</h1>
    <h2>{props.message2}</h2>
    {
    // use map() to loop thru array passed in props.list, creating new element for each array value
    props.entries.map(
        // copy current array value into item and pass to arrow function
        (item,index) => (
        <div  key={index} style={{backgroundColor:"#"+Math.floor(Math.random()*16777215).toString(16)}}>
            <h3>{item.title} </h3>
            <p>{item.description} </p>
            <img src={item.image_path}/>
        </div>
        )
    )}
    </div>);
}

// define dataset as array in a variable
let data = [
{
    title: "Binary Search Guessing Game",
    description: "A guessing game to try out binary searching. You must guess a random number from 1-100 within only 7 guesses, which should always be possible using binary search.",
    image_path: "images/binary.png"
},
{
    title: "Cat Identification Quiz",
    description: "Guess the name of the cat shown in the image.",
    image_path: "images/cats.png"
},
{
    title: "Colleges",
    description: "A map showing all of the colleges where I have been a student.",
    image_path: "images/colleges.png"
},
{
    title: "Restaurants",
    description: "A map with details on my favorite restaurants throughout the bay area.",
    image_path: "images/restaurants.png"
},
{
    title: "Wildfires",
    description: "A bar chart visualization of wildfire burn area in the United States",
    image_path: "images/wildfires.png"
},
{
    title: "Happy Capy",
    description: "A game about a capy trying to take a dip.",
    image_path: "images/happycapy.png"
},
];

// this time we will want to refresh our react component once data changes,
// so place the code into a named function to make it reusable!
function updateComponent() {
// call render() to output a component into an existing html element
root.render(
    <ProjectList entries={data} message1="CS 50C Portfolio" message2="Projects from Spring 2024 at SRJC" />
);
}

// call react createRoot() with an existing html element
const root = ReactDOM.createRoot(document.getElementById('myApp'));

// call updateComponent first time page loads
updateComponent();
