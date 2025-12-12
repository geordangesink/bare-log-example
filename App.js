import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Worklet } from 'react-native-bare-kit';
import bundle from './worklet.bundle.js'
import RPC from 'bare-rpc'
import b4a from 'b4a'

export default function App() {
  const startWorklet = () => {
    const worklet = new Worklet()
    worklet.start('/worklet.bundle',bundle)

    // set up rpc
    const rpc = new RPC(worklet.IPC, (req) => {
      if (req.command === 0) {
        console.log(b4a.toString(req.data))
      }
    })
    // send request to pearend
    const req = rpc.request(0)
    req.send('ping')
  }

  return (
    <View style={styles.container}>
      <Text>App is open</Text>
      <Button title='Run Worklet' onPress={startWorklet} color='#b0d943' />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#444444ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
