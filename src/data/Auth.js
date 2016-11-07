import firebase from 'firebase'

export default {
  auth: firebase.initializeApp({
    apiKey: 'AIzaSyBqQrhLZ_09ZGLUYrLlv7BLLXLSLX-Rw5M',
    authDomain: 'collections-8c06c.firebaseapp.com',
    databaseURL: 'https://collections-8c06c.firebaseio.com',
    storageBucket: 'collections-8c06c.appspot.com'
  }).auth(),
  // ref: new Firebase('https://gkeep-vueifire3.firebaseio.com/'),
  // calls callback when user signs in or out
  onAuth (authCallback) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        authCallback
      } else {
        // No user is signed in.
      }
    })
  },
  // get's authenticated user
  getAuth () {
    return firebase.auth().currentUser
  },
  signInWithPassword (credentials) {
    return this.auth.authWithPassword(credentials)
  },
  signUpWithPassword (credentials) {
    return this.auth.createUser(credentials) // this will create a Firebase user for authentication, this is separate from our own user objects
  },
  signInWithProvider (provider, callback) {
    // provider => 'google', 'facebook', 'github', ...
    if (provider === 'google') var providerAuth = new firebase.auth.GoogleAuthProvider()
    this.auth.signInWithPopup(providerAuth).then(function (result) {
      // .User signed in!
      // var uid = result.user.uid
      if (callback) callback(null, result)
    }).catch(function (error) {
      if (error.code === 'TRANSPORT_UNAVAILABLE') {
        // fall-back to browser redirects, and pick up the session
        // automatically when we come back to the origin page
        // this.ref.authWithOAuthRedirect(provider, (error) => {
        //   if (callback) callback(error, authData)
        // })
      }
    })
  },
  signOut () {
    this.auth.unauth()
  }
}
