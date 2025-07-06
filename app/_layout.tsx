import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';




export default function RootLayout() {

  const [loaded] = useFonts({
    'Raleway-Bold': require('../assets/fonts/Raleway-Bold.ttf'),
    'Raleway-Medium': require('../assets/fonts/Raleway-Medium.ttf'),
    'Lato-Regular': require('../assets/fonts/Lato-Regular.ttf'),
 
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
   
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
        {/* <Stack.Screen name="notification/Notification" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="settings/Settings" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="login/Login" options={{ headerShown: false }} /> */}
        {/* <Stack.Screen name="signup/Signup" options={{ headerShown: false }} /> */}
        
 
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}