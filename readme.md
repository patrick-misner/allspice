
<h1 align="center"><project-name> All Spice</h1>

<p align="center"><project-description>Users can create recipes and add steps and ingredients. Steps can be reordered with a Vue draggable-next component. Users can search and filter recipes as well. The front-end was written with Vue.js, a reactive javascript framework. The back-end is a .NET C# API server using the MVC pattern and dapper as the ORM to query MySQL.</p>

# Links

- [Repo](https://github.com/patrick-misner/allspice "Keeper Repo")

- [Live](https://all-spice.herokuapp.com/ "Live View")


## Built With


- JavaScript
- Vue3
- DotNet MVC
- C#
- Dapper
- MySQL
- HTML
- CSS

## Future Updates

- [x] Add query parameter functionality to API
- [x] Add search to front-end
- [x] Implement vue3 sortable/draggable component for steps but disabled for ingredients
- [x] Filter recipes by My recipes and Favorites

## Author

**Patrick Misner**

- [Profile](https://github.com/patrick-misner "Patrick Misner")
- [Email](mailto:misner.patrick@gmail.com?subject=Hi "Hi!")
- [Website](https://kingtechnologies.in "Welcome")

# Screenshots

## Home Page

![Home Page](/allspice.client/src/assets/img/homepage.png)

---

## Sorting and Editing Steps

A demo of the vue draggable component for editing steps.

![](/allspice.client/src/assets/img/editsteps.gif)

---

## Adding a Recipe

Click the add icon in the bottom right

![](/allspice.client/src/assets/img/createrecipestep1.png)

v-model form with floating labels
![](/allspice.client/src/assets/img/createrecipestep2.png)

Form modal closes and opens for recipe 
![](/allspice.client/src/assets/img/createrecipestep3.png)




- - -
## Search function

search bar in top right

![](/allspice.client/src/assets/img/searchresults1.png)

![](/allspice.client/src/assets/img/searchresults2.png)

![](/allspice.client/src/assets/img/searchresults3.png)

Filtering also works on search results
![](/allspice.client/src/assets/img/searchresults4.png)

after removing 
![](/allspice.client/src/assets/img/searchresults5.png)

---

## Filtering


My recipes displays recipes with current user's creatorId
![](/allspice.client/src/assets/img/filterstep2.png)

![](/allspice.client/src/assets/img/filterstep3.png)

---

## Error handling

Favorites and My Recipes error
![](/allspice.client/src/assets/img/error1.png)

Not logged in
![](/allspice.client/src/assets/img/error2.png)

Logged in
![](/allspice.client/src/assets/img/error3.png)

Filtered search result error
![](/allspice.client/src/assets/img/error4.png)

No matches found
![](/allspice.client/src/assets/img/error5.png)
