import * as React from "react";
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";

//Screens
import CreateQuiz from "./screens/CreateQuiz";
import Profile from "./screens/Profile";
import QuizGame from "./screens/GameQuiz";
//Screens Login
import LoginScreen from "./screens/LoginScreen";
//Questions
import Questions from "./screens/Questions.js";


const createQuiz = "Create Quiz";
const profileName = "Profile";
const gameQuiz = "Game";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigation() {
  return (
    
      <Tab.Navigator initialRouteName={createQuiz}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let i = route.name;
            if (i == createQuiz) {
              iconName = focused ? "create-outline" : "create-outline";
            }
            else if (i == profileName) {
              iconName = focused ? "person-circle" : "person-circle-outline";
            }
            else if (i == gameQuiz) {
              iconName = focused ? "game-controller-outline" : "game-controller-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;

          },

        })}
        tabBarOptions={{
          activeTintColor: "#49B295",
          inactiveTintColor: "grey",
          labelStyle: { paddingBottom: 1, fontSize: 10 },
          style: { padding: 10, height: 60 },

        }}>

        <Tab.Screen name={createQuiz} component={CreateQuiz} />
        <Tab.Screen name={gameQuiz} component={QuizGame} />
        <Tab.Screen name={profileName} component={Profile} />
        


      </Tab.Navigator>
    
  );
}

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen options={{headerShown: false}} name="Home" component={TabNavigation} />
        <Stack.Screen name="Questions" component={Questions} />
      </Stack.Navigator>
    </NavigationContainer>
  )

}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

export default Navigation;