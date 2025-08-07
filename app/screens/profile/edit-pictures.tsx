import { useUserStore } from "@/stores/auth";
import { ImageType } from "@/utils/base-types";
import Loader from "@/utils/loader";
import React from "react";
import { Image, ScrollView, View } from "react-native";

export default function EditPictures() {
    const { user } = useUserStore();
    const [images, setImages] = React.useState<ImageType[]>(user?.Image || []);

    if (!user) {
        return <Loader />;
    }

    return (
        <ScrollView
            contentContainerStyle={{
                padding: 16,
                flexDirection: "row",  // arrange horizontally
                flexWrap: "wrap",      // allow wrapping to next row
                gap: 16,               // spacing between items (RN 0.71+)
            }}
        >
            {images.map((image, index) => (
                <View
                    key={index}
                    style={{
                        width: "47%", // two per row (with gap)
                        aspectRatio: 1, // keep square shape
                        borderRadius: 8,
                        overflow: "hidden",
                    }}
                >
                    <Image
                        source={{ uri: image.image_url }}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                    />
                </View>
            ))}
        </ScrollView>
    );
}
