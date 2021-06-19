import {signInAction, signOutAction} from "./actions";
import {push} from "connected-react-router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

export const signIn = (email, password) => {
    return async (dispatch) => {
        //validation
        if (email === "" || password === "") {
            alert("必須項目が未入力です")
            return false
        }

        auth.signInWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user
                
                if (user) {
                    const uid = user.uid

                    db.collection('users').doc(uid).get()
                        .then(snapshot => {
                            const data = snapshot.data()

                            dispatch(signInAction({
                                isSignedIn: true,
                                role: data.role,
                                uid: uid,
                                username: data.username,
                                email: data.email
                            }))
                            dispatch(push("/"))
                        })
                }
            })
    }
    
}

export const signUp = (username, email, password, confirmpassword) => {
    return async (dispatch) => {
        //validation
        if (username === "" || email === "" || password === "" || confirmpassword === "") {
            alert("必須項目が未入力です")
            return false
        }

        if (password !== confirmpassword) {
            alert("パスワードが一致しません。もう一度お試しください。")
            return false
        }

        return auth.createUserWithEmailAndPassword(email, password)
            .then(result => {
                const user = result.user

                if (user) {
                    const uid = user.uid
                    const timestamp = FirebaseTimestamp.now()

                    const userInitialData = {
                        created_at: timestamp,
                        email: email,
                        role: "customer",
                        uid: uid,
                        updated_at: timestamp,
                        username: username

                    }
                    db.collection('users').doc(uid).set(userInitialData)
                        .then(() => {
                            dispatch(push("/"))
                        })
                }

            })
    }
}

export const signOut = () => {
    return async (dispatch) => {
        auth.signOut()
            .then(() => {
                dispatch(signOutAction());
                dispatch(push('./signin'))
            })
    }
}

export const listenAuthState = () => {
    return async (dispatch) => {
        return auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).get()
                    .then(snapshot => {
                        const data = snapshot.data()
                        if (!data) {
                            throw new Error('ユーザーデータが存在しません。')
                        }

                        // Update logged in user state
                        dispatch(signInAction({
                            customer_id: (data.customer_id) ? data.customer_id : "",
                            email: data.email,
                            isSignedIn: true,
                            payment_method_id: (data.payment_method_id) ? data.payment_method_id : "",
                            role: data.role,
                            uid: user.uid,
                            username: data.username,
                        }))
                    })
            } else {
                dispatch(push('/signin'))
            }
        })
    }
};

