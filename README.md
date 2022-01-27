# WaitlistUI

## Setup
1. Setup Next App
```
npx create-next-app waitlist_ui
cd waitlist_ui
```
2. Install Tailwind
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
3. Configure Tailwind
In tailwind.config.js
```
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

&nbsp;&nbsp;&nbsp;&nbsp;In glabals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
4. Install Redux
```
npm install redux redux-devtools-extension redux-thunk react-redux axios
```
5. Configure Redux

&nbsp;&nbsp;&nbsp;&nbsp;Create Folders/Files
```
/store
/store/actions
/store/reducers
/store/store.js
/store/types.js
/store/reducers/index.js
```
6. Configure /store/store.js
```
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'
import rootReducer from '../store/reducers'

const initialState = {}

export const store =  createStore(
                  rootReducer, 
                  initialState,
                  composeWithDevTools(applyMiddleware(thunkMiddleware))
              )

```
7. Provide store in /pages/_app.js
