import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useAuthStore } from "@/stores/auth";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";

export default function AuthLayout() {
    const colorScheme = useColorScheme();

    const { isAuthenticated } = useAuthStore();
    const router = useRouter();

    React.useEffect(() => {
        if (!isAuthenticated) {
            router.replace('/(tabs)');
        }
    }, [isAuthenticated, router]);

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="swiper"
                options={{
                    title: 'Swipe Date',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="calendar" size={24} color={color} />,
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" size={24} color={color} />,
                    headerShown: false
                }}
            />
        </Tabs>
    )
}