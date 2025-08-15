export type RootStackParamList = {
	Home: undefined
	Profile: undefined
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
