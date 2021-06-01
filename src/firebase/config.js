import firebase from 'firebase'

const firebaseConfig = {
    apiKey: 'AIzaSyCLLr-vpEyo2Nr5JboapnaNBscqMvNFG6Y',
    databaseUrl: 'https://chattingapp-c5530-default-rtdb.firebaseio.com/',
    projectId: 'chattingapp-c5530',
    appId: '1:662274702495:android:06c8b7f91b15ae5e94b6aa'
}

export default firebase.initializeApp(firebaseConfig)