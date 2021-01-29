import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	databaseURL: process.env.REACT_APP_DATABASE_URL,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
	constructor() {
		app.initializeApp(config);

		this.auth = app.auth();

		this.db = app.database();
	}

	doSignIn = (email, password) => this.auth.signInWithEmailAndPassword(email, password);
	doSignOut = () => this.auth.signOut();

	dbCreate = (ref, data) => this.db.ref(ref).push(data);
	dbRead = (ref, func) => this.db.ref(ref).once("value", func);
	dbUpdate = (ref, data) => this.db.ref(ref).update(data);
	dbDelete = (ref) => this.db.ref(ref).remove();
	dbSet = (ref, data) => this.db.ref(ref).set(data);
}

export default Firebase