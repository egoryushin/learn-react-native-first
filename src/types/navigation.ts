export type RootStackParamList = {
	Home: undefined
	Profile: { username: string } // передача параметра "имя пользователя" в Profile
}

export type HomeNav =
	import('@react-navigation/native-stack').NativeStackNavigationProp<
		RootStackParamList,
		'Home'
	>

export type ProfileNav =
	import('@react-navigation/native-stack').NativeStackNavigationProp<
		RootStackParamList,
		'Profile'
	>

export type ProfileRoute = import('@react-navigation/native').RouteProp<
	RootStackParamList,
	'Profile'
>
