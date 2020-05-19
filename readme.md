# BookMyShow Mean Stack Application

## Documentation 

### Credentials

* For login 
  * Username: bookmyshow
  * Password: open1234

### How to start the Mongo Server

* Run in CMD (Use similar dbpath)
```
cd C:\Program Files\MongoDB\Server\4.2\bin\

mongod.exe --dbpath C:\Users\Vishnu\Desktop\Code\Z-Small-Projects\MongoDb-data
```

### How to start the Node Server

* Run in CMD
```
cd C:\Users\Vishnu\Desktop\Code\BookMyShow

nodemon run.js
```
### Procedure:

* Go to localhost:3000/
* To enter data from backend use Postman Software 
  * Enter the data in JSON format

### Enter data in JSON format: 

```
{
    "name": "Vishnu",
    "position": "Frontend Developer",
    "office": "Bangalore",
    "salary":1000000
}
```

## Angular

* ng new AngularApp - To create new Angular folder
* cd into AngularApp
  * ng serve --open -  To run
  * ng g c employee - TO create new app component (Module)
  * AngularApp\src\app\shared>ng g class employee --type=model -> (Model class)
  * AngularApp\src\app\shared>ng g s employee -> (Service class)

### Links

* https://www.youtube.com/watch?v=UYh6EvpQquw&t=342s

