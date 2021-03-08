/*
* You can copy and run the code below to play around with bcrypt
* However this is for demonstration purposes only. Use these concepts
* to adapt to your own project needs.
*/

import bcrypt from 'bcrypt';
const saltRounds = 10; // increase this if you want more iterations
const userPassword = 'supersecretpassword';
const randomPassword = 'fakepassword';
// const plainPassword = 'apples';

const storeUserPassword = (password, salt) => bcrypt.hash(password, salt).then(storeHashInDatabase);

const storeHashInDatabase = (hash) => {
	// Store the hash in your password DB
	return hash; // For now we are returning the hash for testing at the bottom
};

// Returns true if user password is correct, returns false otherwise
const checkUserPassword = (enteredPassword, storedPasswordHash) => bcrypt.compare(enteredPassword, storedPasswordHash);

// This is for demonstration purposes only.
storeUserPassword(userPassword, saltRounds)
	.then((hash) =>
		// change param userPassword to randomPassword to get false
		checkUserPassword(userPassword, hash),
	)
	.then(console.log)
	.catch(console.error);

// Load hash from your password DB.
// bcrypt.compare(plainPassword, '$2b$12$pLfwDT3.l1kbILqaNevYjOmpe2F.q8sadZkOnS/Jv5X8BrtnDAz4q', function(
// 	err,
// 	result,
// ) {
// 	console.log('first guess', result);
// });
// bcrypt.compare('wrong_password', '$2b$12$pLfwDT3.l1kbILqaNevYjOmpe2F.q8sadZkOnS/Jv5X8BrtnDAz4q', function(
// 	err,
// 	result,
// ) {
// 	// result == false
// 	console.log('second guess', result);
// });
//Async version of /register
app.post('/register', async (req, res) => {
	const { name, email, password } = req.body;
	//Get the hash
	const hash = await bcrypt.hash(password, 8);
	//Start transaction
	try {
		await db.transaction(async (trx) => {
			//Insert into login table
			const loginEmail = await trx('login')
				.insert({
					email,
					hash,
				})
				.returning('email');
			//Insert into users table
			const user = await trx('users')
				.insert({
					name,
					email  : loginEmail[0],
					joined : new Date(),
				})
				.returning('*');
			res.json(user[0]);
		});
	} catch (err) {
		console.log(err);
		res.status(400).json('Unable to register');
	}
});
