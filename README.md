# express-weather-app

## Built With
#### Node.JS
#### Express
#### Nunjucks
#### Handlebars

------
### User Story MVP
[x] User enters zip code
[x] Submit button simultaneously triggers a DarkSKY API call and the Wifi-Password library
[x] Zip code is entered into DarkSky API and returns the weather
[x] Wifi-Password tries to retrieve the wifi name and wifi password

### Stretch Goals
[x] Collected wifi name, wifi passwords, ipaddress, and geolocation are saved in a database

### Installation Instructions
1. git clone repository
2. cd `sneaky-wifi-sniffer`
3. Install independencies with `npm install`
4. You will need the following environment variables:
... - DARK_SKY_API_KEY
... - GOOGLE_API_KEY
... - POSTGRES_DB

### Developer Journal
- I had a lot of fun building this app. I wanted to explore cool npm libraries and stumbled across this one! I made it just in time for halloween for extra evil-ness. Quick disclaimer, I do not promote hacking -- only ethical hacking is allowed :)
Building things is the best way to learn.
- On mac, the wifi library triggers the keychain which will ask for your machine's log-in information. I suspect the elderlies and the tech-illiterate population will fall prey to this.
- On windows, the performance is unknown.
- On linux, the performance is unknown.
