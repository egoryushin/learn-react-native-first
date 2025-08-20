import AsyncStorage from '@react-native-async-storage/async-storage'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useMemo, useState } from 'react'
import {
	Alert,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { HomeNav } from '../types/navigation'

type Props = { navigation: HomeNav }
type Note = {
	id: string
	text: string
}

const STORAGE_KEY = 'notes:v1'

export default function HomeScreen({ navigation }: Props) {
	const [name, setName] = useState('')
	const [input, setInput] = useState('')
	const [notes, setNotes] = useState<Note[]>([])

	const isAddDisabled = useMemo(() => input.trim().length === 0, [input])

	// Загрузка заметок из AsyncStorage при монтировании компонента
	useEffect(() => {
		;(async () => {
			try {
				const res = await AsyncStorage.getItem(STORAGE_KEY)
				if (res) setNotes(JSON.parse(res))
			} catch (error) {
				console.warn('Ошибка при загрузке данных:', error)
			}
		})()
	}, [])

	useEffect(() => {
		AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notes)).catch(error =>
			console.warn('Ошибка при сохранении данных:', error)
		)
	}, [notes])

	const addNote = () => {
		const text = input.trim()
		if (!text) return // не добавляем пустые заметки
		const newNote: Note = { id: Date.now().toString(), text } // создаем новую заметку
		setNotes(prev => [...prev, newNote]) // добавляем новую заметку
		setInput('') // очищаем поле ввода после добавления
	}

	const removeNote = (id: string) => {
		Alert.alert('Удалить заметку?', 'Действие нельзя отменить', [
			{ text: 'Отмена', style: 'cancel' },
			{
				text: 'Удалить',
				style: 'destructive',
				onPress: () => setNotes(prev => prev.filter(n => n.id !== id)),
			},
		])
	}

	const openProfile = () =>
		navigation.navigate('Profile', { username: name || 'Гость' })

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.select({ ios: 'padding', android: undefined })}>
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<View style={styles.container}>
					<Text style={styles.title}>Главная страница</Text>

					{/* Имя для перехода в профиль */}
					<Text style={styles.label}>Введите имя для профиля:</Text>
					<TextInput
						style={styles.input}
						placeholder='Введите ваше имя'
						value={name}
						onChangeText={setName}
						returnKeyType='done'
					/>

					<StatusBar style='auto' />
					<TouchableOpacity style={styles.linkBtn} onPress={openProfile}>
						<Text style={styles.linkBtnText}>Перейти в профиль</Text>
					</TouchableOpacity>

					{/* Поле для добавления заметок */}
					<View style={styles.row}>
						<TextInput
							style={[styles.input, { flex: 1 }]}
							placeholder='Новая заметка'
							value={input}
							onChangeText={setInput}
							onSubmitEditing={addNote}
							returnKeyType='done'
						/>
						<TouchableOpacity
							style={[styles.addBtn, isAddDisabled && styles.addBtnDisabled]}
							onPress={addNote}
							disabled={isAddDisabled}>
							<Text style={styles.addBtnText}>Добавить</Text>
						</TouchableOpacity>
					</View>

					{/* Список заметок */}
					<FlatList
						data={notes}
						keyExtractor={item => item.id}
						contentContainerStyle={{ paddingVertical: 8 }}
						renderItem={({ item }) => (
							<TouchableOpacity
								style={styles.note}
								onLongPress={() => removeNote(item.id)}
								delayLongPress={250}>
								<Text style={styles.noteText}>{item.text}</Text>
								<Text style={styles.noteHint}>Долгий тап — удалить</Text>
							</TouchableOpacity>
						)}
						ListEmptyComponent={
							<Text style={{ opacity: 0.6, marginTop: 12 }}>
								Пока нет заметок. Добавь первую 👇
							</Text>
						}
						keyboardShouldPersistTaps='handled'
					/>
				</View>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: { flex: 1, alignItems: 'center', padding: 16, paddingTop: 24 },
	title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
	label: { alignSelf: 'flex-start', marginBottom: 6, fontWeight: '500' },
	input: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#ddd',
		padding: 10,
		borderRadius: 10,
		backgroundColor: '#fff',
	},
	linkBtn: { alignSelf: 'flex-end', marginTop: 10, marginBottom: 20 },
	linkBtnText: { color: '#007AFF', fontWeight: '600' },
	row: {
		flexDirection: 'row',
		gap: 8,
		width: '100%',
		marginBottom: 12,
		marginTop: 4,
	},
	addBtn: {
		paddingHorizontal: 14,
		paddingVertical: 12,
		backgroundColor: '#007AFF',
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	addBtnDisabled: { opacity: 0.5 },
	addBtnText: { color: '#fff', fontWeight: '600' },
	note: {
		width: '100%',
		backgroundColor: '#f7f7f7',
		padding: 12,
		borderRadius: 12,
		marginBottom: 8,
	},
	noteText: { fontSize: 16 },
	noteHint: { fontSize: 12, opacity: 0.5, marginTop: 4 },
})
