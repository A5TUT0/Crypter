import { GestureResponderEvent, Pressable, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function CreateVaultCardButton({ onPress }: { onPress?: (event: GestureResponderEvent) => void }) {
    return (
        <View>
            <Pressable onPress={onPress} style={({ pressed }) => [
                {
                    backgroundColor: pressed ? '#a1745aff' : '#e1a17b',
                    borderRadius: 50,
                    padding: 15,
                    position: 'absolute',
                    bottom: 80,
                    right: 20,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.3,
                    shadowRadius: 3,
                    elevation: 5,
                },
            ]} >
                <AntDesign name="plus" size={24} color="white" />
            </Pressable >
        </View>
    );
}