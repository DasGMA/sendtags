### `Send Tags Takehome` 

At Noterouter, we use tags that are assigned to our clients' users in order determine who we want to send messages to. For this takehome, we created a rudimentary Tags System for you to finish and implement.

This React App is partially implemented with the following inputs defined:

> Tags - String "tags" separated by commas that can be thought of as attributes

> People Configs - A JSON string where the key is the person's name and the value is an array of their associated tags 

> Send To - String "tags" separated by commas that will tell us who we want to send to

> AND/OR? - The conditional clause that tells us which qualifier to use (e.g. send to everyone with "tagA" AND "tagB" or send to people with "tagA" OR "tagB")

Your task is to complete the application where given the inputs from the user, an output of "Sent to" is determined.

For example,

The application might have the following inputs:

> Tags - hero, villain, person, mutant, tough, weak, smart, dumb, short, tall, weird, cool

> People configs - 
{
    “Human Torch”: [“hero”, “mutant”, “tough”, “dumb”, “tall”],
    “Spiderman”: [“hero”, “tough”, “smart”, “tall”],
    “Kyle”: [“human”, “weak”, “smart”, “short”],
    “JonJon”: [“human”, “strong”, “smart”, “tall”, “weird”]
} 

> Send to - “human”, “tall”, “weak”

> AND/OR? - OR

Then the Output would be: 
> `"Sent to: Human Torch, Spiderman, JonJon, Kyle"`



Assumptions you can make:
- Inputs to the forms will be text, meaning we won't be inputting them as quoted strings (tagA vs. "tagA") WITH ONE EXCEPTION...
- The json string for People Configs will be in proper json string format. This is to help make parsing easier
- You may need external npm libraries for things such as parsing, so feel free to introduce them but make sure you add them to your dependencies so we can `npm install`


See Below for a screnshot of what the output should look like:
![Example](/images/example.png)


We know you have a time constraint but what else besides the bare minimum can you get in before the buzzer?
Bonus Points:
- Making it fault tolerant (what happens when we put in unexpected inputs?)
- Are you good at design? Show off here!
- Not required but if you add tests, what framework will you use to write them and how easy are they to follow?
- Will you restructure the code and fix bugs that may be in there?
- We left some things intentionally vague to see how you deal with unclear requirements. Sometimes at NR, you have to call the shots :)

### `npm install && npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.
