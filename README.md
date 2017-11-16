# Prello (Client)

Study project attempting to make a Trello clone. 
This is the **Client** of the project, see also the **API** [here](https://github.com/awi2017-option1group3/Prello-API).

Read the documentation using the Wiki [here](https://github.com/awi2017-option1group3/Prello-Client/wiki) !

## Local installation

### Prerequisites

You need the following tools:
- Node (version >= 8)
- NPM

You need to install the API before (see [here](https://github.com/awi2017-option1group3/Prello-API)).

### Installation

#### Cloning

You need to clone this repository on your computer:

`https://github.com/awi2017-option1group3/Prello-Client`

Go to the Client folder using:

`cd Prello-Client`

#### Configuring the environment

Assuming you have installed the [API](https://github.com/awi2017-option1group3/Prello-API) and running it:
* Go with you browser to [http://localhost:8000/auth/clients](http://localhost:8000/auth/clients) and fill the form to get your tokens
* Create a `.env` file at the root of the Client (same level as `package.json`)
* Fill it with the two tokens retrieved from the API Client Registration page as the following example

Get your Google developer credentials:
* Go on [https://console.developers.google.com](https://console.developers.google.com/)
* Create your project
* Activate the Google Picker API
* Create your API key and ID Client Auth by following the indications
* Add the credentials in the `.env` file

```env
REACT_APP_CLIENT_ID=yourClientIdHereWithoutQuotes
REACT_APP_CLIENT_SECRET=yourClientSecretHereWithoutQuotes
REACT_APP_DRIVE_CLIENT_ID=yourGoogleDriveIdClientAuthKey
REACT_APP_DRIVE_DEVELOPER_KEY=yourGoogleDriveDeveloperKey
```

#### Running

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

In a new tab (keep the Heroku website in background), go to the API Client Registration page: `https://{api-name}.herokuapp.com/auth/clients` and fill the form to get your tokens.

In a new tab (keep the Heroku website in background), go to the Google developer console page: `https://console.developers.google.com/` . Create your new project, activate the Google Picker API and get you API key and ID CLient Auth key

On the Heroku website:

4. Always in the "Settings" panel, add also two other config variables retrieved from the API Client Registration page:
  
  * `REACT_APP_CLIENT_ID`, with the value of `client_id` 
  * `REACT_APP_CLIENT_SECRET`, with the value of `client_secret`
  
5. Always in the "Settings" panel, add two other config variables retrieved from the Google Developer Console page:

 * `REACT_APP_DRIVE_CLIENT_ID`, with the value of `id_client_auth` 
 * `REACT_APP_DRIVE_DEVELOPER_KEY`, with the value of `developer_api_key`
  
  
5. Using the panel "Deploy", link the github repository to your app (and enable automatic deploys).
6. Using the panel "Deploy", deploy the master branch (at the end of the page). This action can take a while.
7. Open the app using the "Open app" top-right button.

### Usage

You can use the Client with: `https://{app-name}.herokuapp.com/`.
