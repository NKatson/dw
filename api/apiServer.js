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
    "Personal": [
      {
        "formKey": "Personal-step-1",
        "title": "The Basics",
        "description": "This is the easy stuff.",
        "hint": "(Hint: You definitely know all the answers to these questions!)",
        "questions": [
          {
            "label" : "First Name",
            "name": "firstName",
            "type": "text",
            "placeholder": "First Name"
          }, {
            "name": "lastName",
            "type": "text",
            "placeholder": "Last Name"
          }, {
            "name": "address",
            "type": "text",
            "placeholder": "Address"
          }, {
            "name": "city",
            "type": "text",
            "placeholder": "City"
          }, {
            "name": "state",
            "type": "dropdown",
            "class": "inline-block pad-04",
            "placeholder": "State",
            "answers": [
              {
                "label": "Alabama",
                "value": "al",
              }, {
                "label": "Alaska",
                "value": "ak",
              }, {
                "label": " Arizona",
                "value": "az",
              }
            ]
          }, {
            "name": "zipCode",
            "type": "text",
            "class": "inline-block w-210",
            "placeholder": "Zip Code"
          }, {
            "name": "phone",
            "type": "text",
            "class": "w-342 inline-block valign-mid",
            "placeholder": "Phone",
            "needNormalize" : true,
          }, {
            "name": "ssn",
            "type": "password",
            "class": "w-342 inline-block valign-mid",
            "placeholder": "SSN"
          }, {
            "name": "dateOfBirth",
            "type": "text",
            "class": "w-342",
            "placeholder": "Date of Birth (MM/DD/YYYY)",
            "needNormalize" : true,
          }
        ]
      },
      {
        "formKey": "Personal-step-2",
        "title": "Employment status",
        "description" : "Where do you currently work? Do you like it and if so, are they hiring? ",
        "questions": [
          {
            "name": "employ",
            "type": "dropdown",
            "class": "full-width",
            "label" : "What's your employment status?",
            "answers": [
              {
                "label": "Employed",
                "value": 1,
                "name": "employ-employed",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Employer Name",
                    "type": "text",
                    "value" : "I Own My Business",
                    "name": "employ-employed-who"
                  },
                  {
                    "label": "Occupation",
                    "type": "text",
                    "name": "employ-employed-title"
                  },
                  {
                    "label": "Type of Business",
                    "type": "text",
                    "name": "employ-employed-industry"
                  },
                  {
                    "label": "Yearly income",
                    "type": "text",
                    "name": "employ-employed-yearly-income",
                    "needNormalize" : true,
                  },
                ]
              }, {
                "label": "Self-Employed",
                "value": 2,
                "name": "employ-self-employed",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Occupation",
                    "type": "text",
                    "name": "employ-self-employed-occ"
                  },
                  {
                    "label": "Type of Business",
                    "type": "text",
                    "name": "employ-employed-industry"
                  },
                  {
                    "label": "Yearly income",
                    "type": "text",
                    "name": "employ-self-employed-yearly-income",
                      "needNormalize" : true,
                  },
                ]
              }, {
                "label": "Not Currently Working",
                "value": 3,
                "name": "employ-not-working",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Source of Income",
                    "type": "text",
                    "name": "employ-not-working-source"
                  },
                  {
                    "label": "Yearly income",
                    "type": "text",
                    "name": "employ-not-working-yearly-income",
                    "needNormalize" : true,
                  },
                ]
              }, {
                "label": "Student",
                "value": 4,
                "name": "employ-student",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Yearly income",
                    "type": "text",
                    "name": "employ-student-yearly-income",
                    "needNormalize" : true,
                  },
                ]
              },
              {
                "label": "Retired",
                "value": 5,
                "name": "employ-redired",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Yearly income",
                    "type": "text",
                    "name": "employ-retired-yearly-income",
                    "needNormalize" : true,
                  },
                ]
              }
            ]
          }
        ]
      }
    ],
    "Invest" : [
      {
        "type": "recommend",
        "title" : "Finding the Right Investment for You",
        "description" : "The next few steps will help us to recommend the best savings & investment strategy for you",
        "questions" : [
          {
            "label" : "When will you need access the money you invest?",
            "type" : "radio",
            "htmlName": "finding",
            "name" : "invest-question-1",
            "answers" : [
              {
                "label" : "I might need to withdraw this money within a few years" ,
                "name" : "invest-q1",
                "value": "Savings account",
              },
              {
                "label" : "Not soon, but I plan to withdraw some of this money before I retire" ,
                "name" : "invest-q1",
                "value": "Investment account",
              },
              {
                "label" : "I won't need it until I retire" ,
                "name" : "invest-q1",
                "value": "Retirement account",
              },
              {
                "label" : "I don't know" ,
                "name" : "invest-q1",
                "value": "General investment account",
              }
            ]
          }
        ]
      },
      {
        "title" : "Markets move up and down. How comfortable are you with changes?",
        "description" : "In 2008 the worst happened!! The markets lost more than 50% of their value within f few short years (2007-2009). If this happened again, would you:",
        "questions" : [
          {
            "type" : "radio",
            "htmlName": "comf",
            "name" : "invest-question-2",
            "answers" : [
              {
                "label" : "Scream! And then sell all your investments. Too risky!" ,
                "name" : "invest-q2-a1",
              },
              {
                "label" : "Hold your breath. But also hold your investments." ,
                "name" : "invest-q2-a2",
              },
              {
                "label" : "Nod knowingly. This is how it works. You have to weather the 'downs' to get the 'ups'." ,
                "name" : "invest-q2-a3",
              }
            ]
          }
        ]
      }
    ],
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
