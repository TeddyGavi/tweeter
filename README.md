# Tweeter Project

Tweeter is a simple, single-page Twitter clone.

This project was built on the template from [Lighthouse Labs Tweeter](https://github.com/lighthouse-labs/tweeter).

## Getting Started

1. Clone your repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Navigate to /confirm the repo directory in your terminal. ```cd...```
4. Start the web server using the `npm run local` command. The app will be served at <http://localhost:8080/>.
5. Go to <http://localhost:8080/> in your browser.


## Goals and Learning Outcomes

### Outcomes
- [x] Build a single page application
- [x] Connect the frontend to a pre-built backend
- [x] Execute on a given design spec

[(Back to Top)](#tweeter)
#### My Tweeter IS:
- A challenging, mainly, CSS project with additional jQuery and Ajax functionality  
- The best way to learn the DOM -- who is he? Where did he come from? How to manipulate him? 
- A fun way to learn about the power of DevTools
- Instant gratification from CSS rules that work EXACTLY as intended 
- Instant frustration management tool from CSS that have unintended consequences... 
- A skill set building project by experimentation and documentation reading

#### My Tweeter IS NOT:
- Easy
- Lacking specificity
- Able to interact with an external DB
- Able to store local preferences upon refresh
- Able to facilitate social media "clicks"

[(Back to Top)](#tweeter)
## Features
- [x] *stretch* Scroll to top button animated
- [x] *stretch* Toggle new tweet button animated
- [ ] *stretch* implement SASS
  - [x] Use variables
  - [x] Use Mixins
  - [x] Use nesting
  - [ ] Use extends 
- [x] responsive design
- [x] tweet length counter

[(Back to Top)](#tweeter)
## Future Goals
- [ ] Implement "liked", "flagged", "retweeted" functionality
- [ ] work on the error messages to display fluidly in Mobile
- [ ] Convert more CSS into SASS
- [ ] Rework overused HTML classes (once SASS nesting has been fully implemented)
- [ ] Accessibility needs to be considered
- [ ] Dark Mode??

## Views

![Gif of usage](https://github.com/TeddyGavi/tweeter/blob/master/public/readme-imgs/tweeter.gif)
- Watch out for those pesky errors!
![Errors](https://github.com/TeddyGavi/tweeter/blob/master/public/readme-imgs/error.png)
![Errors](https://github.com/TeddyGavi/tweeter/blob/master/public/readme-imgs/error1.png)
- Responsive
![screen size adjust](https://github.com/TeddyGavi/tweeter/blob/master/public/readme-imgs/tweeter-responsive.gif)

[(Back to Top)](#tweeter)

## Known Bugs
- [x] Error handling will set a delay on the callback que despite the error already persisting
  > _Update: fixed temporarily by toggling the button disabled attribute via setTimeout._


[(Back to Top)](#tweeter)


### Dependencies

- Express
- Node 5.10.x or above
- body-parser
- chance
- md5

### devDependencies 
- nodemon

[(Back to Top)](#tweeter)