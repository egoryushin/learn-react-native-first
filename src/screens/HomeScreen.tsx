import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Button, Image, StyleSheet, Text, View } from 'react-native'
import { HomeNav } from '../types/navigation'

type Props = { navigation: HomeNav }

export default function HomeScreen({ navigation }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Главная страница</Text>
			<Image
				source={{ uri: 'https://placekitten.com/200/200' }}
				style={styles.avatar}
			/>
			<Text style={styles.name}>Меня зовут Егор!</Text>
			<Text style={styles.bio}>Мое первое приложение на React Native!</Text>
			{/* <TouchableOpacity style={styles.button}>
				<Text style={styles.buttonText}>Написать</Text>
			</TouchableOpacity> */}
			<StatusBar style='auto' />
			<Button
				title='Перейти в профиль'
				onPress={() => navigation.navigate('Profile')}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
	avatar: { width: 120, height: 120, borderRadius: 60 },
	name: { marginBottom: 10 },
	bio: { marginBottom: 10 },
	button: {
		backgroundColor: '#007AFF',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 8,
	},
	buttonText: { color: '#fff', fontSize: 16 },
})
