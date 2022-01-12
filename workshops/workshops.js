import { checkAuth, logout } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
    logout();
});

async function displayWorkshops() {
    // fetch workshops from supabase

    // clear out the workshopsEl

    //loop through workshops

        // create three elements for each workshop, one for the whole family, one to hold the name, and one to hold the bunnies
}