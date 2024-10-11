import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';

export default function App() {
	const [facing, setFacing] = useState<CameraType>('back')
	const [permission, setPermission] = useCameraPermissions()
	const router = useRouter();

	if(!permission) {
		return <View/>
	}

	if(!permission.granted) {
		return (
			<View>
				<Text>Por favor permita</Text>
				<Button onPress={setPermission} title='allow'/>
			</View>
		)
	}

	function scanned({ raw }) {
		router.navigate({
			pathname: "/control",
			params: {
				url: raw
			}
		})	
	}

	return (
		<View style={styles.container}>
			<CameraView 
				style={styles.camera}
				facing={facing}
				barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
				onBarcodeScanned={scanned}	
				>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button}>
						<Text style={styles.text}>Please read the QRCode</Text>
					</TouchableOpacity>
				</View>
			</CameraView>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	  },
	  message: {
		textAlign: 'center',
		paddingBottom: 10,
	  },
	  camera: {
		flex: 1,
	  },
	  buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	  },
	  button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	  },
	  text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	  },	
})