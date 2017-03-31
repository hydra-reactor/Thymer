[![Stories in Ready](https://badge.waffle.io/hydra-reactor/Thymer.png?label=ready&title=Ready)](https://waffle.io/hydra-reactor/Thymer)
## COLOR SCHEME

#FFE372 - I Can't Believe its Not Nathan!
#C96274 - Fresh Out' da River Salmon
#95D2DC - Bluebra Soufelet
#874B78 - Poppin Eggplant
#E9EBE3 - Ostrich Eggshell
#FFAA67 - Diet Peach Sorbet

## Synopsis

**Thymer** is a full stack web application that allows users to navigate their kitchen with comfort and confidence. Thymer is a platform for users to write, save, and search recipes based on their specific needs. Thymer integrates text-to-speech and automatic timers to help the user cook without ever having to get their computer messy.

## Motivation

In today's busy world, fewer young adults are learning to cook because we feel that we are too busy to spend time in the kitchen. Too often, we try cooking a recipe, but the recipe ends up taking two or three times as long as we thought it would, creating a stressful and unpleasant experience that keeps us from coming back to the kitchen to cook real, healthy, homemade food!

Thymer solves this problem. Thymer allows users to interact with friendly recipes in a way that matches our modern lifestyles and expectations. Thymer provides a platform for users to share recipes with friends and family and our format takes the guessing game out of cooking. With Thymer, we hope to help get young adults back in the kitchen without losing control of their time and schedule.

## Installation

Fork and clone this repo to your local computer to explore and experiment with our code!

From the root directory of your local version of this repo, install back end depenedencies for this project with an 'npm install' terminal command. For more information about Back end dependencies, please see the packages.json file.

Run the application with a terminal command of 'node server.js'. Then navigate to port 3000 on your local host to interact with the project as a user.

## Navigating Files

**Flipclock Folder**
The flipclock folder contains all the information relevant to the flipclock. While the flipclock website is helpful in showing what methods can be applied to the flipclock, the files themselves have a multitude of built-in functions that can be utilized and customized whichever way you want.

**Images Folder**
The Images folder contains the images for the home carousel. We relied upon these files rather than DB information for consistency and ease, however Legacy groups may want to implement a server-based carousel design

**Partials Folder**
Contains the crux of our program. Each section is divided into its corresponding route. The auth folder was created in the event that Legacy projects wanted to use authorization in the site.

**Logo-2**
Hard-coded logo to use on the site.

## API Reference

Our API references include the following:

- Bootstrap v3 (http://getbootstrap.com/)
- Cloudinary (http://cloudinary.com/)
- Flipclock (http://flipclockjs.com/)
- Voicerss (http://www.voicerss.org/)

## Contributors

Rochelle Valdez - Scrum Master (carousel dancer && recreational recipe writing machine)
Jesse DeOms - Product Owner (namer of colors && eater of old bay)
Ariel Salem - Senior Developer (onclick master)
Nathan Brewer-Davis - Senior Developer (API specialist)

## License

Copywrite Thymer LLC 1999 - pending

MIT.

## LEGACY
Here are a few ideas we would have wanted to implement:
- Voice integration and responsiveness (so that the timer could start and stop based on voice commands)
- Filter based on multiple search criteria (right now, recipes can only be searched by one keyword at a time)
- Responsive get request so that the entire DB isn't being received at once
- Make New Recipe tab mobile-friendly
- Adding a sound to the timer
- Click to start a step
- User Auth
- Social Media integration to share recipes
- Possible integration of other recipe APIs
- Allow users to favorite recipes
- Allow users to upvote, downvote, and comment on recipes
- Add in caloric intake field