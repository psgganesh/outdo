# Outdo.app
> https://www.outdo.app

## Inspiration
Often as developers we tend to switch between different apps on our daily work. Our managers use Jira, the whole team
uses Skype / Google meet / Slack / Hipchat for communication. Trello to manage any in-house work. There was a lack of a tool which combines
all of this into ONE.

## What it does
Issue tracking, group private chats and video chats and workflow management for bitbucket made simple

## How I built it
- Vue CLI 3 and Vuex to build the front-end
- Laravel for API back-end
- Twilio Chat and Video API
- CORS using nginx
- Bitbucket OAuth consumer for API integration

## Tools Used

- Laravel 7
- Vue + VueRouter + Vuex + VueI18n + ESlint
- Pages with dynamic import and custom layouts
- Login, register, email verification and password reset
- Authentication with JWT
- Socialite integration
- Vue-Atlas + Font Awesome 5

## Challenges I ran into
- State storing using Vuex's - and calling bitbucket API only when needed
- Integrating Twilio group and video chat
- Layouting the whole dashboard 

## Accomplishments that I'm proud of
- Integrating front-end and back-end a build an amazing SPA
- Completed the app with minimal features as planned

## What I learned
- The Bitbucket connect / oauth APIs
- Atlassian design system and vue-atlas UI framework
- Twilio client SDK and APIs for Chat, Video

## What's next for outdo.app
- Workflow prototyping features like Invision / Marvel app
- Better video calls to enable - draggable video thumnails on any page
