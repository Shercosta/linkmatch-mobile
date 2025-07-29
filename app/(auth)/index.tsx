import { GetProfile } from "@/hooks/hooks";
import { useUserStore } from "@/stores/auth";
import { UserType } from "@/utils/base-types";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function Profile() {
    const [user, setUser] = React.useState<UserType | null>(null)
    const [loading, setLoading] = React.useState(true);

    const { user: storedUser } = useUserStore()

    const handleProfile = async () => {
        setLoading(true);

        try {
            const response = await GetProfile();

            if (response) {
                setUser({
                    username: response.data.username,
                    name: response.data.name,
                    professional_title: response.data.professional_title,
                })

                useUserStore.getState().setUser(response.data);
            }
        } catch (error) {
            console.error('Get Profile Error:', error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        console.log(storedUser);
        if (!storedUser) {
            handleProfile()
        } else {
            setLoading(false);
        }
    }, [storedUser])

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
    }

    return (
        <>
            <View style={styles.container}>
                <Image
                    source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                    style={styles.avatar}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.username} onPress={() => console.log(storedUser)}>@{user?.username}</Text>
                    <Text style={styles.name}>{user?.name}</Text>
                    <Text style={styles.title}>{user?.professional_title}</Text>
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
