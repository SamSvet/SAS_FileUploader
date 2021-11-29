# SAS FileUploader

## Overview
This is [React](https://reactjs.org/) Web Application for [SAS® Intelligence Platorm™](http://www.sas.com/en_us/software/sas9.html) that uses [H54S](https://github.com/Boemska/h54s) adapter for bi-directional communication between JavaScript front-end and SAS back-end services. The application allows to upload CSV and excel files into SAS while performing a set of checks on uploaded data.

## How to use it

The use case can be conditionally divided into 4 steps:

1. User selects the process (i.e. target table that specifies data format) within which he wants to upload a file.\
The list of available processes is passed to the client side by SAS STP */Apps/SASUploader/startupService* that starts automatically when the page is refreshed.
<p align="center">
<img src="https://user-images.githubusercontent.com/64905854/143756620-01f531d3-9046-4ad7-a23c-b294fba41d6f.gif">
</p>

2. At the **Process** section user is able to select conditions that the file choosen at the **File** section must satisfy. The first time a process is selected, the request to the SAS STP */Apps/SASUploader/selectChecks* is sent, which then returns checks related to the given process. 
<p align="center">
<img src="https://user-images.githubusercontent.com/64905854/143759759-4157df11-214f-450b-a922-2f6d1c82c76a.gif">
</p>

3. By the clicking **Call SAS to check** button initiated request to the SAS STP */Apps/SASUploader/checkData* which is responsible for a file validation against the conditions set up on the previous step. */Apps/SASUploader/checkData* produces response back to the client side where the user can view ([*/Apps/SASUploader/downloadService*](sas/Apps/SASUploader/downloadService) is responsible for downloading data from SAS) the details of the checks performed.
<p align="center">
<img src="https://user-images.githubusercontent.com/64905854/143763731-0e492438-f434-4859-a131-f3a63655f828.gif">
</p>

4. If the number of rows passed the check meets the expected level then user sends a request to SAS STP */Apps/SASUploader/loadData* by clicking on the **Upload to SAS** button. Success rows, session and user metadata will be saved to the internal SAS data model.
<p align="center">
<img src="https://user-images.githubusercontent.com/64905854/143763748-d0395893-77a1-4418-914b-d7a5e79e965e.gif">
</p>

When **Debug** mode is ON you can view **Logs** of the requested SAS STP's.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
