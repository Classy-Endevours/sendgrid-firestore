## A kit for managing firestore and SendGrid template

### this module includes a 
- express server
- logger
- firestore
- SendGrid

### How to run
To run this project, following steps are needed
- cd `project-directory`
- `npm i`
- update `.env`
- Download the service key from firebase and put it inside the root folder
- rename the file to `serviceKey.json`
- Go to firestore console and create a collection named `mail_templates`
- Go to SendGrid dashboard and create 2 templates there
  - `user-register`
  - `user-page-visit`
- Grab the template_id from both the templates and store it in firestore collection you just created
- give the id as `user-register` and `user-page-visit` following
- Keep the format as
```
{
    "template_id": <your-id>
}
```
for both documents
- `npm run dev`

### Test
go to the route
- GET `/api/user?email=<email-to-test>`: to test `user-page-visit` template 
- POST `/api/user/save`: to test `user-register` template 
  BODY 
  ```
  {
      "email": "your email"
      ... any other field
  }
  ```

### Add new templates
To add a new process, let's say `edit profile` and you want to send a mail from template then follow the below steps
- Create a new template from SendGrid template
- Grab the id and place it in `mail_templates` collection
- update the `util/mail/config.js` file and add your new field there
- add a new method in `util/mail/mailer.js` file for your edit template add more data if required
- use the newly created method inside your controller

This project is a kit for starting the SendGrid and Firestore integration