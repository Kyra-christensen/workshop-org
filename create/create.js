import { 
    checkAuth, 
    logout,
    createParticipant,
    getWorkshop
} from '../fetch-utils.js';

const logoutButton = document.getElementById('logout');
const form = document.querySelector('#participant-form');

form.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = new FormData(form);
    const name = data.get('participant-name');
    const contact_info = data.get('contact_info');
    const workshop_id = data.get('workshop_id');

    await createParticipant({
        name,
        contact_info,
        workshop_id
    });
    form.reset();
});

window.addEventListener('load', async() => {
    // let's dynamically fill in the families dropdown from supabase
    // grab the select HTML element from the DOM
    const select = document.querySelector('select');
    // go get the workshops from supabase
    const workshops = await getWorkshop();
    // for each workshop
    for (let workshop of workshops){
        // create an option tag  
        const optionEl = document.createElement('option');
        // set the option's value and text content
        optionEl.value = workshop.id;
        optionEl.textContent = workshop.name;
        // and append the option to the select
        select.append(optionEl);
    }
        
});

checkAuth();


logoutButton.addEventListener('click', () => {
    logout();
});