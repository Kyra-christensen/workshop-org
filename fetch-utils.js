const SUPABASE_URL = 'https://tsajblxbuahgeqwlalxi.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTY0MTk0OTc2OCwiZXhwIjoxOTU3NTI1NzY4fQ.Veny1jaQ1r-hEfxoBn3mDBqyS0mgFZePVn3f_L4vdZo';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createParticipant(participant) {
    const response = await client
        .from('workshop_participant')
        .insert(participant);
    return checkError(response);
}

export async function getWorkshop() {
    const response = await client
        .from('workshops')
        .select(`*, workshop_participant (*)`);
    return checkError(response);
}

export async function deleteParticipant(id) {
    const response = await client
        .from('workshop_participant')
        .delete()
        .match({ id: id });
        
    return checkError(response);
}

export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./workshops');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return response.user;
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return response.user;
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}
