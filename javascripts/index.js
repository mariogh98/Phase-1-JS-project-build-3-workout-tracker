

/** Globals **/
const primaryUrl = 'http://localhost:3000';
let workouts = [];

/**NODE Getters**/
const mainDiv = () => 
document.getElementById("main");
const homePageLink = () => 
document.getElementById('home-page-link');
const workoutListLink = () => 
document.getElementById('workout-list-link');
const workoutFormLink = () =>
document.getElementById('workout-form-link');

const dateInput = () => document.getElementById('date')
const typeInput = () => document.getElementById('type')
const nameInput = () => document.getElementById('name')
const setsInput = () => document.getElementById('sets')
const repsInput = () => document.getElementById('reps')



/** TEMPLATES **/

const homePageTemplate = () => {
    return `<h1 class="center-align">Welcome to Hustle!</h1>`
};

const workoutListTemplate = () => {
    return `
    <h1>Workout List</h1>
    <table class="striped">
        <thead>
          <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Name</th>
              <th>Sets</th>
              <th>Reps</th>
          </tr>
        </thead>
        
        <tbody>
        ${renderWorkouts()}
        </tbody>
    </table>  
      `
};


const workoutTemplate = (workout) => {
    return `
    <tr>
    <td>${workout.date}</td>
    <td>${workout.type}</td>
    <td>${workout.name}</td>
    <td>${workout.sets}</td>
    <td>${workout.reps}</td>
    </tr>
    `
}


/** Renderers ***/

const renderHomePage = () => {
    mainDiv().innerHTML = homePageTemplate();
};

const renderWorkoutListPage = async () => {
    await loadedWorkouts();
    mainDiv().innerHTML = workoutListTemplate();
};

const renderWorkouts = () => {
    return workouts.map(workout => workoutTemplate(workout));
};

const renderWorkoutForm = () => {
    const h1 = document.createElement('h1');
    const form = document.createElement('form');
    const dateDiv = document.createElement('div');
    const dateInput = document.createElement('input');
    const dateLabel = document.createElement('label');
    const typeDiv = document.createElement('div');
    const typeInput = document.createElement('input');
    const typeLabel = document.createElement('label');
    const nameDiv = document.createElement('div');
    const nameInput = document.createElement('input');
    const nameLabel = document.createElement('label');
    const setsDiv = document.createElement('div');
    const setsInput = document.createElement('input');
    const setsLabel = document.createElement('label');
    const repsDiv = document.createElement('div');
    const repsInput = document.createElement('input');
    const repsLabel = document.createElement('label');
    const submitBtn = document.createElement('input')
    
    
    
    h1.className = 'center-align';
    dateDiv.className = 'input-field';
    typeDiv.className = 'input-field';
    nameDiv.className = 'input-field';
    setsDiv.className = 'input-field';
    repsDiv.className = 'input-field';
    submitBtn.className = 'waves-effect waves-light btn';

    
    dateInput.setAttribute('id', 'date');
    dateInput.setAttribute('type', 'text');
    dateLabel.setAttribute('for', 'date');
    typeInput.setAttribute('id', 'type');
    typeInput.setAttribute('type', 'text');
    typeLabel.setAttribute('for', 'type');
    nameInput.setAttribute('id', 'name');
    nameInput.setAttribute('type', 'text');
    nameLabel.setAttribute('for', 'name');
    setsInput.setAttribute('id', 'sets');
    setsInput.setAttribute('type', 'text');
    setsLabel.setAttribute('for', 'sets');
    repsInput.setAttribute('id', 'reps');
    repsInput.setAttribute('type', 'text');
    repsLabel.setAttribute('for', 'reps');
    submitBtn.setAttribute('type', 'submit');
    submitBtn.setAttribute('value', 'Create Workout');

    h1.innerText = 'Create Workout';
    dateLabel.innerText = 'Date';
    typeLabel.innerText = 'Type';
    nameLabel.innerText = 'Name';
    setsLabel.innerText = 'Sets';
    repsLabel.innerText = 'Reps';
    
    dateDiv.appendChild(dateInput);
    dateDiv.appendChild(dateLabel);
    typeDiv.appendChild(typeInput);
    typeDiv.appendChild(typeLabel);
    nameDiv.appendChild(nameInput);
    nameDiv.appendChild(nameLabel);
    setsDiv.appendChild(setsInput);
    setsDiv.appendChild(setsLabel);
    repsDiv.appendChild(repsInput);
    repsDiv.appendChild(repsLabel);
    
    

    
    form.appendChild(dateDiv);
    form.appendChild(typeDiv);
    form.appendChild(nameDiv);
    form.appendChild(setsDiv);
    form.appendChild(repsDiv);
    form.appendChild(submitBtn);
    
    form.addEventListener('submit', submitFormEvent);
    
    mainDiv().appendChild(h1);
    mainDiv().appendChild(form);
    
    
};

        
        /** Events**/
        
        const loadedWorkouts = async () => {
            const resp = await fetch(primaryUrl + '/workouts')
            const data = await resp.json();
            workouts = data;
        };


    
    const linkHomePageEvent = () => {
        homePageLink().addEventListener('click', (event) => {
    event.preventDefault();
    renderHomePage();
  })
};

const linkWorkoutPageEvent = () => {
    workoutListLink().addEventListener('click', (event) => {
        event.preventDefault();
        
      renderWorkoutListPage();
    })
};

const linkWorkoutFormEvent = () => {
    workoutFormLink().addEventListener('click', (event) => {
        event.preventDefault();
        renderWorkoutForm();
    })
}

const submitFormEvent = event => {
    event.preventDefault();
    //const [date, type, name, sets, reps] = event.target.children;
    console.log('date', dateInput().value)
    console.log('type', typeInput().value)
    console.log('name', nameInput().value)
    console.log('sets', setsInput().value)
    console.log('reps', repsInput().value)
    fetch('http://localhost:3000/workouts', {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            date: dateInput().value,
            type: typeInput().value,
            name: nameInput().value,
            sets: setsInput().value,
            reps: repsInput().value
        })
    })
    .then(resp => resp.json())
    .then(workout => {
        renderWorkoutListPage();
    })
}

/**************/



/** WHEN THE DOM LOADS */

document.addEventListener('DOMContentLoaded', () => {
    renderHomePage();
    linkHomePageEvent();
    linkWorkoutPageEvent();
    linkWorkoutFormEvent();
});


