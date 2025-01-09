# Steps to Start the Project

## Install Dependencies
Run the following command in your project directory to install all necessary dependencies from the `package.json` file:

```bash
npm install
```

## Set Up the `.env` File

Add your TMDb (The Movie Database) API key to `.env` file. For example:

```plaintext
REACT_APP_BEARER_TOKEN=your_tmdb_api_key_here
```

Ensure that you replace `your_tmdb_api_key_here` with your actual TMDb API key.

**Note**: The `REACT_APP_` prefix is required for environment variables to be accessible in a Create React App project.

## Start the Development Server
Run the following command to start your project:

```bash
npm start
```

## Access the Application
After running the above command, the application will be available at [http://localhost:3000](http://localhost:3000) (or the port configured for your project).