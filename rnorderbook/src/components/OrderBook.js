import {
	Button,
	Dimensions,
	SafeAreaView,
	ScrollView,
	TextInput,
	View,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { addBookUpdate, addSnapshot, addSubscription } from "../store/actions";
import BidsView from "./BidsView";
import AsksView from "./AsksView";

const width = Dimensions.get("screen").width;

const OrderBook = () => {
	const wsRef = useRef();
	const dispatch = useDispatch();
	const [pricePrecision, setPricePrecision] = useState("2");
	const [wsConnect, setWsConnect] = useState(true);

	useEffect(() => {
		console.log("wsConnect", wsConnect);
		if (wsConnect) {
			wsRef.current = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
			wsRef.current.onopen = () => {
				wsRef.current.send(
					JSON.stringify({
						event: "subscribe",
						channel: "book",
						symbol: "tBTCUSD",
					})
				);
			};

			wsRef.current.onmessage = (event) => {
				const data = JSON.parse(event.data);

				if (
					data instanceof Object &&
					data?.event &&
					data?.event == "subscribed"
				) {
					console.log(`action addSubscription`);
					dispatch(addSubscription(data));
				}

				if (data instanceof Array && data[1].length > 25) {
					console.log(`action addSnapshot`);

					dispatch(addSnapshot(data));
				}

				if (data instanceof Array && data[1].length === 3) {
					dispatch(addBookUpdate(data));
				}
			};
		} else if (wsRef.current) {
			wsRef.current.close();
		}
	}, [wsConnect]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView style={{ paddingHorizontal: 20 }}>
				<View>
					<Button
						title="Connect"
						style={{ backgroundColor: "rgba(18,69,76,0.7)" }}
						onPress={() => setWsConnect(true)}
					/>
					<Button
						title="Disconnect"
						style={{ backgroundColor: "rgba(130,51,64,0.7)" }}
						onPress={() => setWsConnect(false)}
					/>
				</View>
				<TextInput
					inputMode="numeric"
					value={pricePrecision}
					onChangeText={(value) => setPricePrecision(value)}
					style={{ borderWidth: 1 }}
				/>
				<View
					style={{ flexDirection: "row", justifyContent: "center" }}
				>
					<BidsView pricePrecision={pricePrecision} />
					<AsksView pricePrecision={pricePrecision} />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default OrderBook;
