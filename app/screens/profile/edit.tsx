import { baseStyles } from "@/constants/BaseStyles"
import { Colors } from "@/constants/Colors"
import { ParseCv, UpdateProfile } from "@/hooks/profile"
import { useUserStore } from "@/stores/auth"
import { UserType } from "@/utils/base-types"
import { ProfessionalTitle } from "@/utils/professional-title-guesser"
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons"
import * as DocumentPicker from 'expo-document-picker'
import { router } from "expo-router"
import React from "react"
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native"

export default function EditProfile() {
    const { user } = useUserStore()
    const [userForm, setUserForm] = React.useState<UserType | null>(user)
    const [cvName, setCvName] = React.useState<string | null>(null)
    const [cvJson, setCvJson] = React.useState<object | null>(user?.cv_json || null)

    const handlePickCV = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: 'application/pdf',
            copyToCacheDirectory: true,
        })

        if (result.assets && result.assets.length > 0) {
            const file = result.assets[0]
            const originalUri = file.uri
            const fileName = file.name

            const jsonCv = await ParseCv({
                uri: originalUri,
                name: fileName,
                type: file.mimeType || 'application/pdf',
            })

            setCvName(file.name)

            setCvJson(jsonCv)

            const professional_title = ProfessionalTitle(jsonCv)

            setUserForm((prev) => prev ? { ...prev, professional_title: professional_title } : null)

            // You may also want to store `destPath` in state
        }
    }

    const handleUpdateProfile = async () => {
        const constructBody: UserType = {
            username: user?.username || '',
            name: userForm?.name || null,
            description: userForm?.description || null,
            location: userForm?.location || null,
            professional_title: userForm?.professional_title || null,
            company_name: userForm?.company_name || null,
            cv_json: cvJson || null,
        }

        const response = await UpdateProfile(constructBody)

        if (response) {
            useUserStore.getState().setUser(null)
            router.back()
        }
    }


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
        >
            <ScrollView
                contentContainerStyle={{ padding: 16 }}
                keyboardShouldPersistTaps="handled"
            >
                <View style={baseStyles.baseContainer}>
                    <Text style={styles.title} onPress={() => console.log(cvJson)}>Edit Profile</Text>

                    <Text style={styles.label}>Username</Text>
                    <Text style={styles.username}>@{userForm?.username}</Text>

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        placeholder="Name"
                        value={userForm?.name || ''}
                        onChangeText={(text) =>
                            setUserForm((prev) => prev ? { ...prev, name: text } : null)
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>Description</Text>
                    <TextInput
                        placeholder="Description"
                        value={userForm?.description || ''}
                        onChangeText={(text) =>
                            setUserForm((prev) => prev ? { ...prev, description: text } : null)
                        }
                        style={styles.input}
                        multiline
                    />

                    <Text style={styles.label}>Location</Text>
                    <TextInput
                        placeholder="Location"
                        value={userForm?.location || ''}
                        onChangeText={(text) =>
                            setUserForm((prev) => prev ? { ...prev, location: text } : null)
                        }
                        style={styles.input}
                    />

                    <Text style={styles.label}>Upload CV (PDF)</Text>
                    <TouchableOpacity onPress={handlePickCV} style={styles.uploadButton}>
                        <Text style={styles.uploadButtonText}>
                            {cvName ? `📄 ${cvName}` : "📤 Upload CV"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.label}>Professional Title</Text>
                    <TextInput
                        placeholder={!cvJson ? "Please Upload your CV first" : "Professional Title"}
                        value={userForm?.professional_title || ''}
                        onChangeText={(text) =>
                            setUserForm((prev) => prev ? { ...prev, professional_title: text } : null)
                        }
                        style={styles.input}
                        editable={!!cvJson}
                    />

                    <Text style={styles.label}>Company Name</Text>
                    <TextInput
                        placeholder="Company Name"
                        value={userForm?.company_name || ''}
                        onChangeText={(text) =>
                            setUserForm((prev) => prev ? { ...prev, company_name: text } : null)
                        }
                        style={styles.input}
                    />

                    <TouchableOpacity onPress={handleUpdateProfile} style={{ ...styles.uploadButton, backgroundColor: Colors.light.tint }}>
                        <MaterialCommunityIcons name="content-save" size={24} color={Colors.light.background} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    label: {
        marginTop: 10,
        marginBottom: 4,
        fontSize: 14,
        fontWeight: '600',
        color: '#555',
    },
    username: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    uploadButton: {
        backgroundColor: Colors.light.icon,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 6,
    },
    uploadButtonText: {
        color: '#fff',
        fontWeight: '600',
    },
})
