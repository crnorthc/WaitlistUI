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

In glabals.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```