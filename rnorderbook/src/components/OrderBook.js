import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addBookUpdate, addSnapshot, addSubscription } from '../store/actions';

const OrderBook = () => {
    const wsRef = useRef(new WebSocket('wss://api-pub.bitfinex.com/ws/2'));
    const dispatch = useDispatch();

    // const state = useSelector((state) => state );
    const subscription = useSelector((state) => state.orderbooks.subscription );
    const bids = useSelector((state) => state.orderbooks.bids );
    const asks = useSelector((state) => state.orderbooks.asks );
    console.log(subscription);
    // console.log(bids);
    // console.log(asks);


    useEffect(() => {
        wsRef.current.onopen = () => {
            wsRef.current.send(JSON.stringify({
                event: 'subscribe', 
                channel: 'book', 
                symbol: 'tBTCUSD'
            }))
        };

        wsRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data)

            if (data instanceof Object && data?.event && data?.event == "subscribed") {
                console.log(`action addSubscription`);
                dispatch(addSubscription(data));
            }

            if (data instanceof Array && data[1].length > 25) {
                console.log(`action addSnapshot`);

                dispatch(addSnapshot(data));
            }

            if (data instanceof Array && data[1].length === 3) {
                // console.log(data);

                dispatch(addBookUpdate(data));
            }
        }
    }, []);
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Text>{}</Text>
    </View>
  )
}

export default OrderBook

const styles = StyleSheet.create({})