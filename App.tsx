import { StatusBar } from 'expo-status-bar'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function App() {
	return (
		<View style={styles.container}>
			<Image
				source={{
					uri: 'https://placekitten.com/200/200',
				}}
				style={styles.avatar}
			/>
			<Text>Меня зовут Егор!</Text>
			<Text>Мое первое придожение на React Native!</Text>
			<TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Написать</Text>
			</TouchableOpacity>
			<StatusBar style='auto' />
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatar: {
		width: 120,
		height: 120,
		borderRadius: 60,
	},
	button: {
		backgroundColor: '#007AFF',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
	},
})
