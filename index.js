const config = require('./config.json');
const pg = require('pg');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
var cache = require('express-redis-cache')({ prefix: 'rp1', expire: 120 });
const knex = require('knex')({
    client: 'postgresql',
    connection: {
        host: config.sql.ip,
        user: config.sql.user,
        password: config.sql.pass,
        database: config.sql.database
    },              // not sure we need this pool area
    pool: {         // we need to setup tests on this soon
        min: 2,
        max: 25,
        propagateCreateError: false // <- default is true, set to false
    },
});
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/web/public/images/')      //you tell where to upload the files,
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png')
    }
})

var upload = multer({
    storage: storage,
    onFileUploadStart: function (file) {
        console.log(file.originalname + ' upload is starting ...')
    },
});

async function hashPassword(password) {
    let salt = await bcrypt.genSalt(13);
    let hash = await bcrypt.hash(password, salt);
    return hash;
}

async function comparePasswords(input, stored) {
        let isSame = await bcrypt.compare(input, stored) 
        return isSame;
}

if ((config.admin.username == "") || (config.admin.password == "")) {
    console.log('YOU NEED TO EDIT CONFIG.JSON AND UPDATE ADMIN RECORDS.')
    console.log('App is closing down.')
    process.exit(1);
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

async function initialUser() {
    let password = config.admin.password;
    await hashPassword(password)
    .then((hashed) => { 
        knex('users').insert({
            email: config.admin.email,
            pass: hashed,
            username: config.admin.username
        })
        .then((inserted) => {
            //console.log(inserted);
        })
        .catch((Err)=>{
            //console.log(Err);
        })
    })
}

function createTables() {
    return knex.schema
        .createTable('users', function (c) {
            c.increments('id').primary();   // auto-inc id
            c.string('email');
            c.string('pass');
            c.string('username');
        })
        .createTable('blog', function (r) {
            r.increments('id').primary();
            r.string('timestamp');
            r.string('title');
            r.string('body');
            r.string('featured_img');
            r.string('status');
        })
        .createTable('projects', function(c) {
            c.increments('id').primary();
            c.string('title');
            c.string('featured_img');
            c.string('body');
            c.string('status');
        })
        .then((created) => {
            //console.log(created)
            initialUser();
        })
}

async function startUp() {  // the main function ran when script is started
    let hasTables = await knex.schema.hasTable("projects"); // check to see if block table exists
    if (hasTables == false) {  // if not
        createTables().then((woo) => { // create our tables
            console.log('Tables made and admin user entered!');
        })
    } else { // if it does
        // pretty much do nothing.
        console.log('Tables already exist. Moving on.')
    }
}

startUp(); // run the main loop when you launch app

app.listen(config.api.port, () => {
    console.log('# # # # # # # # # # # # # # # # # # # # # #');
    console.log('# - - - - - - - - - - - - - - - - - - - - #');
    console.log('# - - - - - - - W E B - -  - - - - - - - #');
    console.log('# - - - - B Y - C A M T H E G E E K - - - #');
    console.log('# - - I S - B O O T I N G - U P - O N - - #');
    console.log('# - - - - - - P O R T - ' + config.api.port + ' - - - - - - #');
    console.log('# - - - Process ID: ' + process.pid + ' - - - #')
    console.log('# # # # # # # # # # # # # # # # # # # # # #');
});


async function addBlog(timestamp, title, body, img, status) {  // shortcut for adding to sql
    return new Promise((resolve) => {
     knex('blog')
     .insert({
                    timestamp: timestamp,
                    title: title,
                    body: body,
                    featured_img: img,
                    status: status
                })
                    .then((suc) => {
                        resolve('success');
                    })
                    .catch((err) => {
                        resolve('error');
                    })
        })
}

async function addProject(title, img, body, status) { // shortcut for adding to sql
    return new Promise((resolve) => {
     knex('projects')
     .insert({
                    title: title,
                    featured_img: img,
                    body: body,
                    status: status
                })
                    .then((suc) => {
                        resolve('success');
                    })
                    .catch((err) => {
                        resolve('error');
                    })
        })
}
/* administrative add route. */
app.post('/api/admin/add/:type', upload.array('img'), (req, res) => {
    let type = req.params.type;
    let timestamp = +new Date();

    switch (type) {
        case 'blog':
            let blog_title = req.body.title;
            let blog_body = req.body.body;
            let blog_img = req.files[0].filename;
            let blog_status = req.body.status;

            addBlog(timestamp, blog_title, blog_body, blog_img, blog_status)
            .then((res) => {
                res.status(200).send('success');
            })
            .catch((error) => {
                res.status(200).send('fail')
            })
            break;

        case 'project':
            let project_title = req.body.title;
            let project_img = req.files[0].filename;
            let project_status = req.body.status;
            let project_body = req.body.body;

            addProject(project_title, project_img, project_body, project_status)
            .then((res) => {
                res.status(200).send('success');
            })
            .catch((error) => {
                res.status(200).send('fail')
            })
        break;
    }
});

/* 
    administrative del route
    needs to be done.
*/
app.post('/api/admin/del/:type', (req, res) => {
    let type = req.params.type;
    let id = req.body.id;

    switch (type) {
        case 'blog':
 
            break;

        case 'project':

            break;

    }
});

app.post('/api/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    return knex('users')
        .select()
        .where('username', username)
        .then(function (rows) {
            if (rows.length === 0) {
                // no matching records found
                res.status(200).send({
                    error: 'Username not recognized.'
                });
            } else {
                // if username is found
                // compare user input password with stored database then issue login if they match
                
                comparePasswords(password, rows[0].pass)
                .then((suc) => {
                    if (suc != false) { 
                    res.status(200).send({
                        success: 1,
                        id: rows[0].id
                    });
                } else {
                    res.status(200).send({
                        success: 0,
                        error: 'Incorrect password'
                    })
                }
                })
                .catch((err) => {
                    //console.log(err);
                })

            
            }
        })
        .catch((ex) => {
            // you can find errors here.
        })
})

/* get all blogs */
app.get('/api/blogs', (req, res) => {
    knex('blog').select('*').orderBy('id', 'desc')
        .then((blogs) => {
            res.send(blogs);
        })
});

/* get blog by id */
app.get('/api/blog/:id', (req, res) => {
    knex('blog')
    .select('*')
    .where({
        id: req.params.id
    })
        .then((blog) => {
            res.send(blog);
        })
        .catch((err) => {
            res.send(err);
        })
});

/* get all projects */
app.get('/api/projects', (req, res) => {
    knex('projects').select('*').orderBy('id', 'desc')
        .then((projects) => {
            res.send(projects);
        })
});

/* get a project by id */
app.get('/api/project/:id', (req, res) => {
    knex('projects')
    .select('*')
    .where({
        id: req.params.id
    })
        .then((project) => {
            res.send(project);
        })
        .catch((err) => {
            res.send(err);
        })
});

/* silly status */
app.get('/api/status', (req, res) => {
    res.send({
        online: 'yep'
    })
})