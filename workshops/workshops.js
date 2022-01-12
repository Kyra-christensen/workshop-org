import { checkAuth, getWorkshop, logout, deleteParticipant } from '../fetch-utils.js';
import { renderParticipant } from './render-utils.js';

checkAuth();

const workshopsEl = document.querySelector('#workshops-list');
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

window.addEventListener('load', async() => {
    // await getWorkshop();
    await displayWorkshops();
});

async function displayWorkshops() {
    // fetch workshops from supabase
    const workshops = await getWorkshop();
    // clear out the workshopsEl
    workshopsEl.textContent = '';
    //loop through workshops
    for (let workshop of workshops) {
        // create three elements for each workshop, one for the whole workshop list, one to hold the name, and one to hold the participants
        const workshopEl = document.createElement('div');
        const nameEl = document.createElement('p');
        const participantsEl = document.createElement('div');
        // add the workshop css class to the workshops el, and participants css class to the participants el
        workshopEl.classList.add('workshop');
        participantsEl.classList.add('participants');
        // put the workshop name in the name element
        nameEl.textContent = workshop.name;
        
        // for each of this workshop's participants
        for (let participant of workshop.workshop_participant) {
            // make an element with the css class 'participant', and put the participant's name in the text content
            const participantEl = await renderParticipant(participant);
            
            // add an event listener to the participant el. On click, delete the participant, then refetch and redisplay all workshops.
            participantEl.addEventListener('click', async() => {
                await deleteParticipant(participant.id);

                await displayWorkshops();
            });
            // append this participantEl to the participantsEl
            participantsEl.append(participantEl);
        }   
    // append the participantsEl and nameEl to the workshopEl   
        workshopEl.append(nameEl, participantsEl);
    // append the workshopEl to the workshopsEl
        workshopsEl.append(workshopEl);
    }   
}
