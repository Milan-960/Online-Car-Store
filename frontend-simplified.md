# Simplified Frontend Task

## Application Requirements

### Listing page

- Create an application that will list the vehicles on initial load

  - limit the number of vehicles shown initially to fit the viewport size ✅

  - upon scrolling it should load additional vehicles (lazy loading) ✅

  - if parameters are passed in url, the filtering should be applied ✅

- On the left side of the page there should be various ✅

filtering options

- make "was not able to locate the variable in the array"
- model ✅
- mileage (from/to) ✅
- power (from/to) ✅
- first registration ✅
- fuel ✅
- price (from/to) ✅
- gearbox ✅
- exterior colour "was not able to locate the variable so did use the interior_color for filtering, I found the exterior but wit was null"
- category ✅

- Tile should contain:
  - image ✅
  - make "was not able to locate the variable in the array"
  - model ✅
  - mileage ✅
  - first registration ✅
  - fuel ✅
  - power ✅
  - consumption ✅
  - co2 ✅

### Product page

- Clicking on the vehicle tile, it should open vehicle detail page
- Vehicle detail page should contain
  - vehicle details ✅
  - gallery ✅
  - page should have unique url ✅
- Upon clicking on back button within the browser or going back to listing page (link), user should land at the same place where he left off on listing page ✅

All elements on listing page, on the product tile and product detail page should be styled and placed according to you own judgement.

## Extracting the data

You can use this API [here](https://run.mocky.io/v3/e7d5a5aa-8bdf-4a36-b6ab-134c08df916b) to seed or load the vehicle data. Make sure you use enough data, to be able to:

- implement lazy loading of vehicle tiles on listing page ✅

- filtering is working and applicable ✅
