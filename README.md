# Prello (Client)

Study project attempting to make a Trello clone. 
This is the **Client** of the project, see also the **API** [here](https://github.com/awi2017-option1group3/Prello-API).

## Local installation

### Prerequisites

You need the following tools:
- Node (version >= 8)
- NPM

You need to install the API (see [here](https://github.com/awi2017-option1group3/Prello-API)).

### Installation

You need to clone this repository on your computer:

`https://github.com/awi2017-option1group3/Prello-Client`

Go to the Client folder using:

`cd Prello-Client`

Install the node_modules:

`npm install`

Run the Client server :

`npm run start`

### Usage

The Client app will be available at `localhost:3000`.


## Production deployment (using Heroku) 

### Prerequisites

- Deploy the API, tutorial [here](https://github.com/awi2017-option1group3/Prello-API#production-deployment-using-heroku)

### Deployment

On the Heroku website:

1. Create an Heroku app.
2. Using the panel "Settings", set the React buildback to your app : `https://github.com/mars/create-react-app-buildpack.git`
3. Using the panel "Settings", add the config variable `REACT_APP_API_URL` (replace `{api-name}` by the name of the other Heroku instance hosting the API): `https://{api-name}.herokuapp.com/`
4. Using the panel "Deploy", link the github repository to your app (and enable automatic deploys).
5. Using the panel "Deploy", deploy the master branch (at the end of the page). This action can take a while.
6. Open the app using the "Open app" top-right button.

### Usage

You can use the Client with: `https://{app-name}.herokuapp.com/`.
