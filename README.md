# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Backend / Lambda

This project fetches grid/meter data from an AWS Lambda function. The frontend calls the function URL configured via the `VITE_LAMBDA_URL` environment variable used in [src/api/aws-api.js](src/api/aws-api.js).

- Environment: create a local `.env` file with `VITE_LAMBDA_URL` pointing to the Lambda Function URL. Example file (must not be committed): [.env](.env)
- Query parameters: the frontend sends `bus_id` and `target_time` (format: `YYYY-MM-DD HH:mm:ss`). The Lambda returns the closest `records` row as JSON.

Onboarding steps for a new developer:

Retreive the .env file and place at the root of the project to have access to lambda function url
