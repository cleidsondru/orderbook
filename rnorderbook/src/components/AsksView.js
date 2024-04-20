import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const AsksView = ({ pricePrecision = "2" }) => {
	const asks = useSelector((state) => state.orderbooks.asks);

	const asksLines = useMemo(() => {
		const result = Object.values(asks).map((ask, index) => (
			<View key={`ask_${index}`}>
				<View key={`${index}_bar_asks`} style={styles.bar} />
				<View key={`${index}_price_asks`} style={styles.values}>
					<Text key={`price_asks_${index}`}>{ask.price}</Text>
					<Text key={`amount_asks_${index}`}>
						{ask.amount.toFixed(pricePrecision)}
					</Text>
				</View>
			</View>
		));
		return result;
	}, [asks, pricePrecision]);

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text>Price</Text>
				<Text>Amount</Text>
			</View>
			{asksLines}
		</View>
	);
};

export default AsksView;

const styles = StyleSheet.create({
	bar: {
		backgroundColor: "rgba(130,51,64,0.7)",
		width: "50%",
		height: "100%",
		position: "absolute",
		left: 0,
		zIndex: 1,
	},
	values: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
	container: {
		flex: 1,
		maxHeight: "50%",
		width: "40%",
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
	},
});
