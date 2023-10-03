# PGP Buddy

## Table of Contents

- [PGP Buddy](#pgp-buddy)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Installation](#installation)
    - [Prerequisites](#prerequisites)
    - [Setting Up](#setting-up)
  - [Usage](#usage)
    - [Web Interface](#web-interface)
    - [API Endpoints](#api-endpoints)
  - [Contributing](#contributing)
  - [License](#license)

## Introduction

PGP Buddy is a Flask and React-based application that aims to facilitate PGP-based cryptographic operations such as message signing, encryption, and decryption. It is equipped with a straightforward UI and API endpoints for easy integration into various projects.

## Features

- **Sign Messages**: Create PGP-signed messages.
- **Encrypt Messages**: Encrypt text messages using available public keys.
- **Decrypt Messages**: Decrypt PGP encrypted messages.
- **Public Key Management**: A simple interface to manage and select public keys for encryption.

## Installation

### Prerequisites

- Python 3.x
- Node.js
- npm or yarn
- Docker (optional)

### Setting Up

1. **Clone the repository**

    ```bash
    git clone https://github.com/YourGitHubUsername/PGP-Buddy.git
    ```

2. **Navigate to the project directory**

    ```bash
    cd PGP-Buddy
    ```

3. **Backend Setup**

    - Install Python packages

    ```bash
    pip install -r requirements.txt
    ```

    - Run the Flask application

    ```bash
    python app.py
    ```

4. **Frontend Setup**

    - Navigate to the client directory

    ```bash
    cd client
    ```

    - Install JavaScript packages

    ```bash
    npm install
    ```

    - Run the React application

    ```bash
    npm start
    ```

5. **Docker (optional)**

    Build and run the Docker image

    ```bash
    docker-compose up --build
    ```

## Usage

### Web Interface

- Navigate to `http://localhost:3000` for the web interface.
- Paste your message in the text area.
- Select the operation (Sign/Encrypt/Decrypt) from the dropdown.
- If "Encrypt" is selected, a radio button list of public keys will appear for selection.
- Click the "Execute" button to perform the operation.

### API Endpoints

- **GET `/api/keys/public`**: Fetch the list of available public keys.
- **POST `/api/sign`**: Endpoint to sign messages. Expects a JSON payload with the message.
- **POST `/api/encrypt`**: Endpoint to encrypt messages. Expects a JSON payload with the message and the selected public key.
- **POST `/api/decrypt`**: Endpoint to decrypt messages. Expects a JSON payload with the encrypted message.

## Contributing

Feel free to fork this repository and submit pull requests. For major changes, please open an issue first to discuss your proposed changes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
