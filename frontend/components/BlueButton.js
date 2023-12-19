import { useState } from 'react';
import { StyleSheet, Text, Pressable, View } from 'react-native';

const BlueButton = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    const componentStyles = StyleSheet.create({
        buttonBox: {
            backgroundColor: isHovered ? "#8EA450" : "#8EA4D2",
            width: 187,
            height: 48,
            textAlign: "middle",
            verticalAlign: "middle",
            alignSelf: "center",
            borderRadius: 10,
        },
        button: {
            fontSize: 36,
            color: "#fff",
            alignSelf: "center",
            verticalAlign: "middle",
            fontFamily: "Inter_400Regular",
        },
    });

    return (
        <View style={props.style}>
            <Pressable style={componentStyles.buttonBox} onPress={props.onPress} onPressIn={() => { setIsHovered(true) }} onPressOut={() => { setIsHovered(false) }}>
                <Text style={componentStyles.button}>{props.text}</Text>
            </Pressable>
        </View>
    );
}

export default BlueButton;