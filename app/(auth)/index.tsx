import { Image, StyleSheet, Text, View } from "react-native";

const fakeUserData = {
    username: 'sakura',
    name: 'Sakura Miyawaki',
    professional_title: 'LE SSERAFIM Member',
};

export default function Profile() {
    return (
        <>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                    style={styles.avatar}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.username}>@{fakeUserData.username}</Text>
                    <Text style={styles.name}>{fakeUserData.name}</Text>
                    <Text style={styles.title}>{fakeUserData.professional_title}</Text>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 16,
        margin: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: 16,
    },
    infoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    username: {
        fontSize: 16,
        color: '#888',
        marginBottom: 4,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    title: {
        fontSize: 16,
        color: '#555',
    },
});
