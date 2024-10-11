import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { VT323_400Regular, useFonts } from "@expo-google-fonts/vt323";
import * as SplashScreen from "expo-splash-screen";
import axios from "axios";

export default function Control() {
	const { url } = useLocalSearchParams();
	const [loading, setLoading] = useState(false);
	const [loaded, error] = useFonts({
		VT323_400Regular,
	});
	const [count, updateCounter] = useState(1);

	useEffect(() => {
		async function connect() {
			try {
				const result = await axios.get(`${url}/`);
			} catch (error) {
				console.log("Error connecting: ", error);
			}
		}
		if (loaded || error) {
			SplashScreen.hideAsync();
		}
		connect();
	}, [url, loaded, error]);

	const next = async () => {
		if (loading) return;
		setLoading(true);
		try {
			const result = await axios.get(`${url}/next`);
			if (result.status === 200) updateCounter(count + 1);
		} catch (error) {
			console.log("Error on next: ", error);
		} finally {
			setLoading(false);
		}
	};

	const previous = async () => {
		if (loading) return;
		setLoading(true);
		try {
			const result = await axios.get(`${url}/previous`);
			if (result.status === 200) updateCounter(count => (count -= count == 1 ? 0 : 1));
		} catch (error) {
			console.log("Error on previous: ", error);
		} finally {
			setLoading(false);
		}
	};

	if (!loaded && !error) {
		return null;
	}
	return (
		<View
			style={{
				backgroundColor: "#1d2021",
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Text
				style={{
					fontFamily: "VT323_400Regular",
					fontSize: 50,
					textAlign: "center",
					color: "white",
					padding: 24,
				}}
			>
				You're presenting!
			</Text>

			<View style={{ alignItems: "center", marginVertical: 20 }}>
				<Text
					style={{
						fontSize: 40,
						color: "#98971a",
						fontFamily: "VT323_400Regular",
					}}
				>
					Current Slide
				</Text>
				<Text
					style={{
						fontSize: 30,
						color: "white",
						fontFamily: "VT323_400Regular",
					}}
				>
					{count}
				</Text>
			</View>

			<View
				style={{
					justifyContent: "center",
					alignItems: "center",
					flexDirection: "row",
					marginTop: 20,
				}}
			>
				<TouchableOpacity
					onPress={previous}
					disabled={loading}
					style={{
						borderWidth: 2,
						borderColor: "#cc241d",
						backgroundColor: "#282828",
						padding: 20,
						width: 150,
						marginHorizontal: 10,
						shadowColor: "#000",
						shadowOffset: { width: 4, height: 4 },
						shadowOpacity: 0.8,
						shadowRadius: 4,
						elevation: 10,
					}}
				>
					<Text
						style={{
							color: "#ebdbb2",
							fontFamily: "VT323_400Regular",
							fontSize: 20,
							textAlign: "center",
						}}
					>
						Previous
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={next}
					disabled={loading}
					style={{
						borderWidth: 2,
						borderColor: "#cc241d",
						backgroundColor: "#282828",
						padding: 20,
						width: 150,
						marginHorizontal: 10,
						shadowColor: "#000",
						shadowOffset: { width: 4, height: 4 },
						shadowOpacity: 0.8,
						shadowRadius: 4,
						elevation: 10,
					}}
				>
					<Text
						style={{
							color: "#ebdbb2",
							fontFamily: "VT323_400Regular",
							fontSize: 20,
							textAlign: "center",
						}}
					>
						Next
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}
