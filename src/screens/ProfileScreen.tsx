import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { ProfileNav } from '../types/navigation'

type Props = { navigation: ProfileNav }

export default function ProfileScreen({ navigation }: Props) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Страница профиля</Text>
			<Button title='Назад' onPress={() => navigation.goBack()} />
		</View>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
	title: { fontSize: 24, marginBottom: 10, fontWeight: 'bold' },
})
