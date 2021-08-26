
const { v4: uuidv4 } = require('uuid');
const db = require('./../config/database');

const COLLECTION_NAME = 'users'

const generateId = () => {
    return uuidv4()
}

class User {
    static collection = db.collection(COLLECTION_NAME);
   
    static save = async (data) => {
        const id = generateId()
        const user = this.collection.doc(id)
        await user.set(data)
        return user
    }

    static update = async (id, data) => {
        const user = this.collection.doc(id)
        await user.update(data)
        return user
    }

    static findAll = async () => {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
            return doc.data()
          });
    }

    static findById = async (id) => {
        return await this.collection.doc(id).get()
    }

    static delete = async (id) => {
        return await this.collection.doc(id).delete()
    }
}

module.exports = User