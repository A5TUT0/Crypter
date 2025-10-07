import { Pressable, Text, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';

export default function NavBar() {
    return (<View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        backgroundColor: '#f9f9f9',
        position: 'absolute',
        bottom: 0,
        width: '100%',
    }}>
        <Pressable onPress={() => { console.log('Vaults'); }}>
            <Entypo name="lock" size={34} color="#e1a17b" />
            <Text style={{ fontSize: 10, textAlign: 'center', color: "#e1a17b" }}>Vaults</Text>
        </Pressable>
        <Pressable onPress={() => { console.log('Favorites'); }}>
            <MaterialIcons name="stars" size={34} color="black" />
            <Text style={{ fontSize: 10, textAlign: 'center' }}>Favorites</Text>
        </Pressable>
        <Pressable onPress={() => { console.log('Settings'); }}>
            <Feather name="settings" size={34} color="black" />
            <Text style={{ fontSize: 10, textAlign: 'center' }}>Settings</Text>
        </Pressable>
    </View>);
}