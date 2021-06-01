import firebase from '../../firebase/config'

const forgotPassword = async (email) => {
    try {
        return await firebase.auth().sendPasswordResetEmail(email)
    }
    catch (error) {
        return error
    }
}

export default forgotPassword