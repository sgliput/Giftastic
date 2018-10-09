# Giftastic

## Deployed Project
https://sgliput.github.io/Giftastic/

## Overview
In this project, I used Bootstrap grid styling and the Giphy API to generate columns of gif images related to animation, each of which is centered atop a brick background with the Giphy rating underneath.

On the left is a column of buttons which generate the gifs based on their text, which corresponds to an array element that is used in the API call. Clicking a button will add ten gifs to the central area. Each button also makes a call to the OMDb API and displays a heading with the movie/show's title, release year, and description. However, it only does so if the OMDb results include "Animation" in the genre, lest some unrelated live-action film is mistakenly referenced.

Each of the generated gifs is still, but activates when clicked and deactivates when clicked again.


## Adding more buttons

The search field in the middle allows for a primary parameter. Clicking the "Add a Button" button will add a button to the left column with that parameter, which will call corresponding gifs. If a second parameter is adding, whether using the dropdown or typing something else in, it will narrow the search, and the second parameter is also displayed in parentheses in the created button.

## Adding more gifs

For the search field on the right side, you can choose a number from the dropdown or type in another number. The "Add More GIFs" button will then empty the central area, and when a button in the left column is pressed, it will return ten gifs plus however many were specified. (If 4 was entered, it will return 14.) To take away gifs, a negative number can be entered. (If -4 is entered, it will return 6.)

## Favorites
Double-clicking a gif will move it into the Favorites column on the right. A button for clearing this section appears when it is not empty. I used a timer to broaden this capability to touchscreens, which apparently don't support double-click events. Except for possibly really thin screens, the page is mobile responsive, and allows for double-clicking (or double-tapping) even on touchscreens.