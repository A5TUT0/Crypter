import { View } from 'react-native';
import Vault from './screens/Vault';
import NavBar from './components/NavBar';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Vault />
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 15,
        justifyContent: 'flex-end',
      }}>
        <NavBar />
      </View>
    </View>
  );
}

