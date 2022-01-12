// IMPORT MODULES under test here:
// import { example } from '../example.js';
import { renderParticipant } from '../workshops/render-utils.js';

const test = QUnit.test;

test('renderParticipant should take in an object and return a DOM element', async(expect) => {
    //Arrange
    const participant = {
        name: 'steve',
        workshop_id: 2
    };
    // Set up your arguments and expectations
    const expected = '<p class="participant">steve</p>';
    
    //Act 
    // Call the function you're testing and set the result to a const
    const actual = await renderParticipant(participant);

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual.outerHTML, expected);
});
