This is the Express API portion of the S.E.E.K application to communicate with the MySQL database. The bulk of the application code can be found here:

https://github.com/RosalinaSpeedy/S.E.E.K

This Express API is run via NodeJS and is hosted on Heroku (currently). This allows the Express app to connect to the hosted JawsDB MySQL server with the following table structure:

![image](https://github.com/user-attachments/assets/15356444-6d7f-47fe-a6ab-4c54171f46d4)

This is because the React Native framework S.E.E.K is built on cannot make direct calls to a database service - and therefore this Express API serves as a middleware - and is called via Axios when data for the forum aspects of S.E.E.K are needed.

![image](https://github.com/user-attachments/assets/c6730c75-eac1-4b9a-9ad4-3c55862869c6) ![image](https://github.com/user-attachments/assets/61fb7746-bf5a-4407-9d9b-de792f151dd9) ![image](https://github.com/user-attachments/assets/26e84c0e-c24c-412a-b04b-cbf864a091d5) ![image](https://github.com/user-attachments/assets/ba184ccf-24c8-48b0-afb1-a867259b013c) ![image](https://github.com/user-attachments/assets/ab1868dd-d763-47c4-ba72-a098f966aace) ![image](https://github.com/user-attachments/assets/90bcfb43-8534-407b-b61d-7831aaad3c1b) ![image](https://github.com/user-attachments/assets/8f223717-95ed-4d06-a878-af3f9481ebb3)

The code focuses on the below routes:

* /deletepost/:id deletes a post with the passed id
* /getpost/:id fetches all data asociated with a post with the passed id
* /getposts fetches a list of all the posts as a JSON object
* /addpost inserts a post with the given form data as a new post into the posts table
* /editpost/:id edits the post with the passed id with the given form data
* /addcomment/:id adds a comment to the post with the passed id and inserts it into the forumcomments table
* /registeruser inserts a new user into the users table
* /login checks the given form data against records in the users table and creates a session for the user if an account matches the given data
* /reportpost/:id inserts the post with the passed id along with the id of the user who reported it into the reported table
* /handlereport/:id/:decision either deletes the post with the passed id if the decision passed is "delete" - or approves it to remain on the forum
* /getreportedposts fetches a list of all reported posts
