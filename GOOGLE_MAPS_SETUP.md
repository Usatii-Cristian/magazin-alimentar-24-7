# Google Maps Setup Instructions

## To enable Google Maps on the contact page:

### 1. Get a Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Maps JavaScript API**:
   - Go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click "Enable"

### 2. Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### 3. Configure Restrictions (Recommended)
1. Click on your API key
2. Under "Application restrictions":
   - Select "HTTP referrers (web sites)"
   - Add your domain: `localhost:3000/*` (for development)
   - Add your production domain when deploying
3. Under "API restrictions":
   - Select "Restrict key"
   - Check "Maps JavaScript API"

### 4. Update Environment Variables
1. Open the `.env` file in your project root
2. Replace the placeholder with your actual API key:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```
   becomes:
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=AIzaSyD...your_key...
   ```

### 5. Update Map Coordinates (Optional)
If you want to show your actual business location:
1. Open `app/contact/GoogleMap.js`
2. Find the coordinates on line ~40:
   ```javascript
   const location = { lat: 47.0105, lng: 28.8638 } // Chisinau, Moldova as default
   ```
3. Replace with your actual coordinates (you can find them on Google Maps)

### 6. Test the Map
1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/contact`
3. The map should now load without errors

## Troubleshooting

### "InvalidKeyMapError"
- Check that your API key is correct
- Make sure the Maps JavaScript API is enabled
- Verify that your domain restrictions allow `localhost:3000`

### "You have included the Google Maps JavaScript API multiple times"
- This error should be resolved with the current implementation
- If you still see it, clear your browser cache and restart the dev server

### Map not loading
- Check browser console for errors
- Verify internet connection
- Make sure the API key has proper permissions