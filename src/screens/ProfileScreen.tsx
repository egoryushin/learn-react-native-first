import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ProfileNav, ProfileRoute } from '../types/navigation'

type Props = {
	navigation: ProfileNav
	route: ProfileRoute
}

export default function ProfileScreen({ navigation, route }: Props) {
	const username = route.params?.username ?? 'Гость'

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Страница профиля</Text>
			<Text>Добро пожаловать в профиль!</Text>
			<Text>Имя пользователя: {username}</Text>
			<Button title='Назад' onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
})
