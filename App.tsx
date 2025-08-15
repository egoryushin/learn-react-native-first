import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'

import HomeScreen from './src/screens/HomeScreen'
import ProfileScreen from './src/screens/ProfileScreen'
import { RootStackParamList } from './src/types/navigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={{ title: 'Главная' }}
				/>
				<Stack.Screen
					name='Profile'
					component={ProfileScreen}
					options={{ title: 'Профиль' }}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	)
}
