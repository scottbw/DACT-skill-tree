# DMF skill tree

A proof-of-concept skill tree for the Data Maturity Framework.

## Deploying
The Skillstree has now been setup to use AWS Amplify (this is to enable single sign on).
For CI/CD purposes, each push to the repo will trigger a full stack build in Amplify.

URL available here: https://master.d6gfjkpqfqgp1.amplifyapp.com/

Amplify provides features for both backend and frontend development.
When you initialize Amplify in your project using the Amplify CLI, it creates an amplify folder in your repository. 
This folder contains:
* Backend Configuration: The cloud formation templates and configurations for the backend resources you add (e.g., authentication, API, functions).
* Project Configuration: Information about your project such as environments and team providers.

The amplify files and folder should be checked into version control, as it allows others to replicate the backend setup and maintain consistent environments.


Previously the SkillsTree used GitHub Pages at the following site: https://jiscdact.github.io/DACT-skill-tree/
To use this version again set the homepage to the url above in the package.json.
Then Run 'npm run deploy' to deploy the latest version of the project to https://jiscdact.github.io/DACT-skill-tree/

## Editing
Edit the skill trees and profiles in the Data folder.
