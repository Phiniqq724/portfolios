# Error page setup

So here's the thing, now user still can access any route (i mean like whenever he type a random thing on the url) then it got redirected to 404 created by next.js. So what i need you to do is that, make the custom page for those error. For example i'll provide you with a simple flow (existing flow) :

User -> Open up a random url on my web -> It shows not found by next (But i want to custom it)

or maybe an error occured :

User -> Open up page on my web -> It shows maybe like 500 or something but its created by next. I want to custom it so that it looks a like with my whole web.

What i want is that :

User -> Open up page on my web -> Error occured then show a custom error page -> User could redirect back to "/"

I've tried adding the 404.tsx but it somehow still doesn't work.
