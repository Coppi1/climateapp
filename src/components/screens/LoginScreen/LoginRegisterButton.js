import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';

export default function RegisterButton() {
    function handleRegister() {
        alert('Tela de cadastro ainda não implementada!');
    }
    return (
        <View style={styles.buttonContainer}>
            <Pressable style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonLabel}>Cadastrar-se</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        alignItems: 'center',
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF6347',
    },
    buttonLabel: {
        color: '#FFFFFF',
        fontSize: 20,
    },
});
