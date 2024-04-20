import { StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const BidsView = ({ pricePrecision = "2" }) => {
	const bids = useSelector((state) => state.orderbooks.bids);

	const bidsLines = useMemo(() => {
		const result = Object.values(bids).map((bid, index) => (
			<View key={`bid_${index}`}>
				<View key={`${index}_bar_bids`} style={styles.bar} />
				<View key={`${index}_price_bids`} style={styles.values}>
					<Text key={`amount_bids_${index}`}>
						{bid.amount.toFixed(pricePrecision)}
					</Text>
					<Text ey={`price_bids_${index}`}>{bid.price}</Text>
				</View>
			</View>
		));
		return result;
	}, [bids, pricePrecision]);
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text>Amount</Text>
				<Text>Price</Text>
			</View>
			{bidsLines}
		</View>
	);
};

export default BidsView;

const styles = StyleSheet.create({
	bar: {
		backgroundColor: "rgba(18,69,76,0.7)",
		width: "50%",
		height: "100%",
		position: "absolute",
		right: 0,
		zIndex: 1,
	},
	values: {
		flexDirection: "row",
		justifyContent: "space-between",
		padding: 10,
		zIndex: 5,
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
