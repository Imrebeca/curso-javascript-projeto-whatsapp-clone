const firebase = require('firebase');
require('firebase/firestore');

export class Firebase {

    constructor(){

        this._config = {
            apiKey: "AIzaSyC6BhrG8oLAmM0Mkkmy64DzfWkTOqZy0lg",
            authDomain: "whatsapp-clone-e233a.firebaseapp.com",
            projectId: "whatsapp-clone-e233a",
            storageBucket: "whatsapp-clone-e233a.appspot.com",
            messagingSenderId: "546388936254",
            appId: "1:546388936254:web:bb185e8f75e2d17116f36f",
            measurementId: "G-08XGZR65CQ"
        };
        
        
        this.init();
        
    }
    
    init() {

        if (!this._initialized) {
            
            firebase.initializeApp(this._config);

            firebase.firestore().settings({
                timestampsInSnapshots: true
            });

            this._initialized = true;

        }
    
    }

    static db() {

        return firebase.firestore();

    }
    
    static hd() {

        return firebase.storage();
    }

    initAuth() {

        return new Promise((s, f)=>{

            let provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider).
            then(result => {

                let token = result.credential.accessToken;
                let user = result.user;

                s({
                    user,
                    token
                });

                console.log();


            }).catch(err=>{
                f(err)
            });

        });

    }
}

