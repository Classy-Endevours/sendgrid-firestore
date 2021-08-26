
const db = require('../config/database');

const COLLECTION_NAME = 'mail_templates'


class MailTemplate {
    static collection = db.collection(COLLECTION_NAME);
   
    static findAll = async () => {
        const snapshot = await this.collection.get()
        return snapshot.docs.map(doc => {
            return doc.data()
          });
    }

    static findById = async (id) => {
        return await (await this.collection.doc(id).get()).data()
    }

    static delete = async (id) => {
        return await this.collection.doc(id).delete()
    }
}

module.exports = MailTemplate