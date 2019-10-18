# Travel Agent Sync

**[UNDER CONSTRUCTION]**

## Setting Up a Database

**Step 1:** Let's use [MLAB](https://mlab.com/home), it's free! Go to `https://mlab.com/` and
create an account. Once you create an account, select the button, `+ CREATE new` to the
right of MongoDB Deployments section.

![Mlab setup 1](images/mlab/mlab-01.png)

**Step 2:** Select a cloud provider of your choosing, Amazon, Google Cloud,or Azure.

![Mlab setup 2](images/mlab/mlab-02.png)
**Step 3:** Then select the plan, Sandbox followed by clicking the CONTNUE button on the lower right.

![Mlab setup 3](images/mlab/mlab-03.png)

**Step 4:** Select a region that works for you followed by clicking the CONTNUE button on the lower right.

![Mlab setup 4](images/mlab/mlab-04.png)

**Step 5:** Enter the name of one of the 5 databases were going to create, `airline`, `auto`, `hotel`, `user` or `agent`.
Then click the CONTNUE button on the lower right.

![Mlab setup 5](images/mlab/mlab-05.png)

**Step 6:** Then click the SUBMIT ORDER button on the lower right.

![Mlab setup 6](images/mlab/mlab-06.png)

**Step 7:** You'll the database listed. Click the database entry. 

![Mlab setup 7](images/mlab/mlab-07.png)

**Step 8:** You'll see tabs for `Collections`, `Users`,`Stats`, `Backups` and `Tool`. 

![Mlab setup 8](images/mlab/mlab-08.png)

**Step 9:** Click the `Users` button.

![Mlab setup 9](images/mlab/mlab-09.png)

**Step 10:** You'll be presented with the, `Add new database user` dialog.

![Mlab setup 10](images/mlab/mlab-10.png)

**Step 11:** Add a user. In this case we're creating the user `travelagent`. This user will be applied
to all the databases we'll create subsequently.

Also, add a password for the user. Then, click the CREATE button.

![Mlab setup 11](images/mlab/mlab-11.png)

**Step 12:** The user is now created for the database.

![Mlab setup 12](images/mlab/mlab-12.png)

Use the process to create the databases, `airline`, `auto`, `hotel`, `user` and `agent`. Create
the same user, `travelagent`, with the same `password` for all the databases.

## About the Database URL

The way you'll authenticate to the database from a MongoDB client is according to the following
URL format:

`mongodb://<dbuser>:<dbpassword>@ds235378.mlab.com:35378/hotel`

**WHERE**

* `<dbuser>` is the name of the database user
* `<dbpassword>` is the user's password
* `@ds235378.mlab.com:35378/hotel` is a URL special the the database. In this case the `url`
describes the database, `hotel`.