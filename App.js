import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/Redux/store'
import StackNavigator from './src/StackNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StackNavigator />
        <StatusBar style="auto" />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});
