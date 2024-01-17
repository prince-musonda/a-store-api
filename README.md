This is the backend logic for the  a-store-admin dashboard Next js ecommerce web app [https://github.com/prince-musonda/a-store-admin-dashboard]
and also for the a-store client ecommerce web app [https://github.com/prince-musonda/store]  

# step 1: set up instructions

This project uses ``MongoDB`` for data storage  and `Firebase` for files(images) storage. So before you run the project, please create a `.env` file in the root fold. Copy the code below.
And paste it into your `.env` file. Replace everything starting with `Your  appropriate credentials` with your  acutual `firebase` and `MonogDB Url` credentials.

```
FIREBASE_apiKey = YOUR APPROPRIATE CREDENTIALS
FIREBASE_authDomain = YOUR APPROPRIATE CREDENTIALS
FIREBASE_projectId= YOUR APPROPRIATE CREDENTIALS
FIREBASE_storageBucket= YOUR APPROPRIATE CREDENTIALS
FIREBASE_messagingSenderId = YOUR APPROPRIATE CREDENTIALS
FIREBASE_appId = YOUR APPROPRIATE CREDENTIALS
FIREBASE_measurementId = YOUR APPROPRIATE CREDENTIALS
MONGO_URL = YOUR APPROPRIATE MONGO URL CREDENTIALS
```


## STEP 2
once you have completed step 1, install all the necessary dependances by run the following npm command in the root folder of the project in your terminal 
```
npm install
```

### step 3: running the project
After completing step 1 and 2, just run the following command to start the project
``` 
npm start

```

The project will be running on `http://localhost:3003`
