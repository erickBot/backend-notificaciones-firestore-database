
const { stringify } = require('@firebase/util');
const { doc, collection, getDocs, getDoc, where } = require('firebase/firestore');
const { app, firestore } = require('../config/firebase');


module.exports = {

    async getAllUsers(){
        try{
            const querySnapshot = await getDocs(collection(firestore, "Users"));
            const tokens = [];
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data().name}`);
                tokens.push(doc.data().token);
            });

            return tokens;

        }catch(error){
            console.log(error);
            return null;
        }
    },

    async getUserById(id){
        try{
            const documentSnapshot = await getDoc(doc(firestore, "Users", id));

                if (documentSnapshot.exists){
                    console.log(`USER: ${JSON.stringify(documentSnapshot.data().token)}`);
                    return documentSnapshot.data().token;

                }else{
                    console.log('Doc no existe');
                    return null;
                }

        }catch(error){
            console.log(error);
            return null;
        }
    }
}




