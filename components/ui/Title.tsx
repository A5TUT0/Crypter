import { View, Text } from "react-native";

export default function Title({ title }: { title: string }) {
    return (
        <View>
            <Text style={{
                fontSize: 34,
                fontWeight: 'bold',
                textAlign: 'center',
                margin: 10,
                color: '#333',
            }}>{title}</Text>
        </View>
    );
}