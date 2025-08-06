import { Colors } from "@/constants/Colors";
import { GetProfile } from "@/hooks/hooks";
import { useUserStore } from "@/stores/auth";
import { UserType } from "@/utils/base-types";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
    const [user, setUser] = React.useState<UserType | null>(null)
    const [loading, setLoading] = React.useState(true);

    const { user: storedUser } = useUserStore()

    const handleProfile = async () => {
        setLoading(true);

        try {
            const response = await GetProfile();

            if (response) {
                setUser(response.data);

                useUserStore.getState().setUser(response.data);
            }
        } catch (error) {
            console.error('Get Profile Error:', error);
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
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
        <ScrollView
            contentContainerStyle={{ padding: 16 }}
        >
            <View style={styles.cardWrapper}>
                <TouchableOpacity
                    style={styles.editIconButton}
                    onPress={() => router.push('/screens/profile/edit')}
                >
                    <MaterialCommunityIcons name="pencil" size={24} color="black" />
                </TouchableOpacity>

                <View style={styles.container}>
                    <Image
                        source={{ uri: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png' }}
                        style={styles.avatar}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.username}>@{user?.username}</Text>
                        <Text style={styles.name}>{user?.name}</Text>
                        <Text style={styles.title}>{user?.professional_title}
                            {user?.company_name ? ` at ${user?.company_name}` : ''}
                        </Text>
                    </View>
                </View>

                <View style={styles.container}>
                    <View style={{
                        ...styles.infoContainer,
                        rowGap: 30
                    }}>
                        <Text style={styles.text}>{user?.description}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <MaterialCommunityIcons name="map-marker" size={24} color="#888" />
                            <Text style={styles.text}>{user?.location}</Text>
                        </View>
                    </View>
                </View>

                {user?.Image && user?.Image?.length > 0 && (
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{
                            paddingHorizontal: 20,
                        }}
                        style={{
                            margin: 20,
                            backgroundColor: '#fff',
                            borderRadius: 16,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 6,
                            elevation: 4,
                            paddingTop: 16,
                            paddingBottom: 16,
                        }}
                    >
                        {user.Image.map((img, index) => (
                            <View
                                key={index}
                                style={{
                                    width: 200,
                                    height: 200,
                                    borderRadius: 8,
                                    overflow: 'hidden',
                                    marginRight: index !== (user.Image?.length ?? 0) - 1 ? 16 : 0,
                                }}
                            >
                                <Image
                                    source={{ uri: img.image_url }}
                                    resizeMode="cover"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                    }}
                                />
                            </View>
                        ))}
                    </ScrollView>
                )}

            </View>
        </ScrollView>

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
    text: {
        fontSize: 16,
        color: Colors.light.text,
    },
    cardWrapper: {
        position: 'relative',
        // margin: 20,
    },

    editIconButton: {
        position: 'absolute',
        top: 30,
        right: 30,
        // backgroundColor: '#007AFF',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 8,
        zIndex: 1,
    },

    editIconText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },

    image: {
        width: 100,
        height: 100,
        marginRight: 16,
        borderRadius: 8,
    },

});
