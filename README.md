# KATZE – Krasses Animations Transitions Zerstörer Element (Working Title)

## Setup

#### Development Environment:
```
npm install
npm run gulp watch
```
The Application uses Gulp for Development Pruposes Only. 

#### Production Environment:
``` 
npm install
npm start
```


## Socket

To transmit all the Messages to and from the Server and the Rooms, Socket is used. 

The Structure in which the Commands are build is straight forward:
```
Structure:
SENDER -> RECIEVER Command

Example:
BACK -> SERVER update text
```

There are three main particpants in this message flow: `BACK`, `SERVER` and `ROOM`. 

`BACK` is the admin panel where all the controls are.
`SERVER` is the Node.JS Backend which handles Socket and express.js
`ROOM` is one of the Socket.JS rooms. 



When used that way, the message direction is always clear.
A list of all commands will be provided later.

## Room Data
All the Rooms will get a standalon JSON file in which all the important information about the room will bi stored. This file is currently setup like this: 
```
    {
      name: String,
      text: {
        head: String,
        sub: String
      },
      settings: {
        width: Number,
        connected: Boolean,
        background: Array
      },
    }
```
Details about all the Properties will follow soon. 