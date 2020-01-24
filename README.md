# React application with Express server

This project is with bootstrap css libarary . Then an Express server is added in the `server` directory. The server is proxied via the `proxy` key in `package.json`.

## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/sarveshmahajan89/My-Chat-App.git
cd My-Chat-App
npm install
```

Create a `.env` file for environment variables in your server, incase if you don't have any setting keep it blank

You can start the server on its own with the command:

```bash
npm run server
```

Run the React application on its own with the command:

```bash
npm start
```

Run both applications together with the command:

```bash
npm run dev
```

The React application will run on port 3000 and the server port 3001.