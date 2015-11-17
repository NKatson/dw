import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import config from '../src/config';

const apiPort = config.apiPort || 8080;
const apiHost = config.apiHost || 'localhost';
const app = express();

app.use(bodyParser.json());
app.use(cors());

// Forms
app.get('/api/forms', (req, res) => {
  const data = {
    "categories": [{
        "name": "Personal",
        "steps": [{
            "formKey": "Personal-step-1",
            "title": "The Basics",
            "description": "This is the easy stuff.",
            "hint" : "(Hint: You definitely know all the answers to these questions!)",
            "questions": [
              {
                "name": "firstName",
                "type": "text",
                "placeholder": "First Name",
              },
              {
                "name": "lastName",
                "type": "text",
                "placeholder": "Last Name",
              },
              {
                "name": "address",
                "type": "text",
                "placeholder": "Address",
              },
              {
                "name": "city",
                "type": "text",
                "placeholder": "City",
              },
              {
                "name": "state",
                "type": "select",
                "class" : "inline-block pad-04",
                "placeholder": "State",
                "answers" : [
                  {
                    "label": "Alabama",
                    "value": "al",
                    "name": "state-al",
                  },
                  {
                    "label": "Alaska",
                    "value": "ak",
                    "name": "state-ak",
                  },
                  {
                    "label": " Arizona",
                    "value": "az",
                    "name": "state-az",
                  },
                ]
              },
              {
                "name": "zipCode",
                "type": "text",
                "class" : "inline-block w-210",
                "placeholder": "Zip Code",
              },
              {
                "name": "phone",
                "type": "text",
                "class" : "w-342 inline-block valign-mid",
                "placeholder": "Phone",
              },
              // {
              //   "type": "plain-text",
              //   "class" : "input-wrap__descr w-136",
              //   "text": "We will send your phone a text confirmation",
              // },
              {
                "name": "ssn",
                "type": "password",
                "class" : "w-342 inline-block valign-mid",
                "placeholder": "SSN",
              },
              // {
              //   "type": "checkbox",
              //   "htmlName": "personal-show",
              //   "class" : "input-wrap__descr w-136 input-wrap__addit-checkbox",
              //   "answers": [
              //     {
              //       "label": "Show",
              //       "value": "show",
              //       "name": "personal-show",
              //     }
              //   ]
              // },
              {
                "name": "dateOfBirth",
                "type": "text",
                "class" : "w-342",
                "placeholder": "Date of Birth (MM/DD/YYYY)",
              },
            ]
          },
        ]
      }, {
        "name": "Invest",
        "steps" : []
      }
    ]
  }
  return res.status(200).json(data);
});

// Authorization
app.post('/api/sign_in', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email === 'user@user.com' && password === '1') {
    return res.status(200).json(
      {
       "data":{
               "id":6,
               "provider":"email",
               "uid":"bmail@gmail.com",
               "name":null,
               "nickname":null,
               "image":null,
               "email":"bmail@gmail.com",
               "role":"user"
              }
      }
    );
  }

  return res.status(409).json(
    {
      "errors": ["Invalid login credentials. Please try again."]
    }
  );
});


// Registration
app.post('/api/auth', (req, res) => {
  const email = req.body.email;

  if (email === 'user@user.com') {
    return res.status(409).json(
      {
        "status":"error",
        "data":{
                "id":null,
                "provider":"email",
                "uid":"",
                "name":null,
                "nickname":null,
                "image":null,
                "email":"buuxil.com",
                "created_at":null,
                "updated_at":null,
                "role":"user"
               },
        "errors":{
                   "email":["is not an email"],
                   "full_messages":["Email is alredy in use."]
                 }
      }
    );
  }

  return res.status(200).json(
    {
     "status":"success",
     "data":{
             "id":23,
             "provider":"email",
             "uid":"df@ail.com",
             "name":null,
             "nickname":null,
             "image":null,
             "email":"df@ail.com",
             "created_at":"2015-11-10T12:26:58.610Z",
             "updated_at":"2015-11-10T12:26:58.610Z",
             "role":"user"
            }
    }
  );
});

// Logout
app.post('/api/sign_out', (req, res) => {
  return res.status(200).json('OK!');
});

// Reset password
app.post('/api/password', (req, res) => {
  const email = req.body.email;

  if (email === 'user@user.com') {
    return res.status(200).json(
      {
       "success":true,
       "message":"An email has been sent to eas@sd.ss containing instructions for resetting your password."
      }
    );
  }

  return res.status(409).json(
    {
      "success":false,
      "errors":["Unable to find user with email 'eas'."]
    }
  );
});

app.get('*', (req, res) => {
  res.json({});
});

app.listen(apiPort, apiHost, (err) => {
  if (err) {
    console.error(err);
  }
  console.info('----\n==> ✅  %s is running, talking to API server on %s.', config.app.title, apiPort);
});
