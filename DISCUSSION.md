So there's a few things I would have added if I had more time. In no particular order:


Production Wise
- Adding at least Node unit test to test that we were setting up our query correct especially when a number was being passed in.



-  There currently isn't a default ordering that makes sense since we don't support things like rating an advocate or being able to use the user's current location to find an advocate in their area.
 
It would be nice to be able to log the different search terms that were being passed in. We could run analytics to see if there is a popular advocate being requested or speciality to help with ranking/ordering when the user first opens the page.




Performance:


- We will make a API call each time you type a key in the search box. Would be nice to be able to add some type of debouncing on the FE so if a user is typing a lot of characters at once, we wait until they finish before searching for results. Maybe a .1 -> .2 second window

- Would want to consider adding rate limiting at the API layer so power users don't become noisy neighbors and impact others

- Right now, we query for all the results, we should implement some type of pagination . So that way we don't have to do a full DB table scan and instead can return results back in chunks.


UI/UX
- Didn't have time to touch the UI/UX, but would like to make it a bit prettier. Adding spacing between rows and combing columns like first/last name. 

- there seems to be specialities that are shared by many advocates. Maybe creating a dropdown like "pick common speciality" to help people better search for all advocates for a given speciality.