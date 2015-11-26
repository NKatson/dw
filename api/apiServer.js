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

app.post('/api/accounts', (req, res) => {
  console.log('Request to accounts:');
  console.log(req.body);
});

// Forms
app.get('/api/questions', (req, res) => {
  const data = {
    "Personal": [
      {
        "formKey": "personal-step-1",
        "title": "The Basics",
        "description": "This is the easy stuff.",
        "hint": "(Hint: You definitely know all the answers to these questions!)",
        "questions": [
          {
            "name": "first_name",
            "type": "text",
            "placeholder": "First Name",
            "defaultValue" : "Vasya",
          }, {
            "name": "last_name",
            "defaultValue": "Pupkin",
            "type": "text",
            "placeholder": "Last Name"
          }, {
            "name": "address",
            "type": "text",
            "defaultValue": "Pupkin",
            "placeholder": "Address"
          }, {
            "name": "city",
            "type": "text",
            "defaultValue": "Pupkin",
            "placeholder": "City"
          }, {
            "name": "state",
            "type": "dropdown",
            "class": "inline-block pad-04",
            "placeholder": "State",
            "answers": [
              {"label" : "Alabama",	"value" : "AL"},
              {"label" : "Alaska",	"value" : "AK"},
              {"label" : "Arizona",	"value" : "AZ"},
              {"label" : "Arkansas",	"value" : "AR"},
              {"label" : "California",	"value" : "CA"},
              {"label" : "Colorado",	"value" : "CO"},
              {"label" : "Connecticut",	"value" : "CT"},
              {"label" : "Delaware",	"value" : "DE"},
              {"label" : "Florida",	"value" : "FL"},
              {"label" : "Georgia",	"value" : "GA"},
              {"label" : "Hawaii",	"value" : "HI"},
              {"label" : "Idaho",	"value" : "ID"},
              {"label" : "Illinois",	"value" : "IL"},
              {"label" : "Indiana",	"value" : "IN"},
              {"label" : "Iowa",	"value" : "IA	"},
              {"label" : "Kansas",	"value" : "KS	"},
              {"label" : "Kentucky",	"value" : "KY	"},
              {"label" : "Louisiana",	"value" : "LA	"},
              {"label" : "Maine",	"value" : "ME"},
              {"label" : "Maryland",	"value" : "MD"},
              {"label" : "Michigan",	"value" : "MI"},
              {"label" : "Minnesota",	"value" : "MN"},
              {"label" : "Mississippi",	"value" : "MS"},
              {"label" : "Missouri",	"value" : "MO"},
              {"label" : "Montana",	"value" : "MT"},
              {"label" : "Nebraska",	"value" : "NE"},
              {"label" : "Nevada",	"value" : "NV"},
              {"label" : "New Hampshire",	"value" : "NH"},
              {"label" : "New Jersey",	"value" : "NJ"},
              {"label" : "New Mexico",	"value" : "NM"},
              {"label" : "New York",	"value" : "NY"},
              {"label" : "North Carolina",	"value" : "NC"},
              {"label" : "North Dakota",	"value" : "ND"},
              {"label" : "Ohio",	"value" : "OH"},
              {"label" : "Oklahoma",	"value" : "OK"},
              {"label" : "Oregon",	"value" : "OR"},
              {"label" : "Pennsylvania",	"value" : "PA	"},
              {"label" : "Rhode Island", "value" : "RI	"},
              {"label" : "South Carolina",	"value" : "SC	"},
              {"label" : "South Dakota",	"value" : "SD	"},
              {"label" : "Tennessee",	"value" : "TN	"},
              {"label" : "Texas",	"value" : "TX	"},
              {"label" : "Utah",	"value" : "UT"},
              {"label" : "Vermont",	"value" : "VT"},
              {"label" : "Virginia",	"value" : "VA"},
              {"label" : "Washington",	"value" : "WA"},
              {"label" : "West Virginia",	"value" : "WV"},
              {"label" : "Wisconsin",	"value" : "WI"},
              {"label" : "Wyoming",	"value" : "WY"}
            ]
          }, {
            "name": "zip_code",
            "type": "text",
            "defaultValue": "11111",
            "class": "inline-block w-210",
            "placeholder": "Zip Code"
          }, {
            "name": "phone",
            "type": "text",
            "defaultValue": "111-111-1111",
            "class": "w-342 inline-block valign-mid",
            "placeholder": "Phone",
            "needNormalize" : true,
          }, {
            "name": "ssn",
            "type": "password",
            "defaultValue": "111-11-111",
            "class": "w-342 inline-block valign-mid",
            "placeholder": "SSN"
          }, {
            "name": "date_of_birth",
            "type": "text",
            "class": "w-342",
            "defaultValue": "11/11/1991",
            "placeholder": "Date of Birth (MM/DD/YYYY)",
            "needNormalize" : true,
          }
        ]
      },
      {
        "formKey": "Personal-step-2",
        "title": "Employment status",
        "description" : "Where do you currently work? Do you like it, and if so, are they hiring?",
        "questions": [
          {
            "name": "employ",
            "type": "dropdown",
            "class": "full-width",
            "label" : "What's your employment status?",
            "answers": [
              {
                "label": "Employed",
                "value": "1",
                "name": "employ-employed",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Who do you work for?",
                    "type": "text",
                    "name": "employ-who-do-you-work"
                  },
                  {
                    "label": "What's your tytle?",
                    "type": "text",
                    "name": "employ-tytle"
                  },
                  {
                    "label": "What's your industry?",
                    "type": "text",
                    "name": "employ-industry"
                  },
                  {
                    "label": "How much do you make",
                    "type": "text",
                    "name": "annual_income",
                    "needNormalize" : true,
                  },
                ]
              }, {
                "label": "Self-Employed",
                "value": "2",
                "name": "employ-self-employed",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "Who do you work for?",
                    "type": "text",
                    "default": "I Own My Business",
                    "name": "employ-who-do-you-work"
                  },
                  {
                    "label": "What's your tytle?",
                    "type": "text",
                    "name": "employ-tytle"
                  },
                  {
                    "label": "What's your industry?",
                    "type": "text",
                    "name": "employ-industry"
                  },
                  {
                    "label": "How much do you make?",
                    "type": "text",
                    "name": "annual_income",
                    "needNormalize" : true,
                  },
                ]
              }, {
                "label": "Not Currently Working",
                "value": "3",
                "name": "employ-not-working",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "What is your main source of income?",
                    "type": "text",
                    "name": "employe-source"
                  },
                  {
                    "label": "How much do you make?",
                    "type": "text",
                    "name": "annual_income",
                    "needNormalize" : true,
                  },
                ]
              }, {
                "label": "Student",
                "value": "4",
                "name": "employ-student",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "What is your main source of income?",
                    "type": "text",
                    "name": "employe-source"
                  },
                  {
                    "label": "How much do you make?",
                    "type": "text",
                    "name": "annual_income",
                    "needNormalize" : true,
                  },
                ]
              },
              {
                "label": "Retired",
                "value": "5",
                "name": "employ-redired",
                "dynamicFields" : [ // dynamic fields
                  {
                    "label": "What is your main source of income?",
                    "type": "text",
                    "name": "employe-source"
                  },
                  {
                    "label": "How much do you make?",
                    "type": "text",
                    "name": "annual_income",
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
        "type": "recommend", // new
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
                "value": "General investment account",
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
app.post('/api/auth/sign_in', (req, res) => {
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
