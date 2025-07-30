import { UserType } from "@/utils/base-types";
import { ApiFetcher } from "./hooks";

export async function ParseCv(file: {
    uri: string;
    name: string;
    type: string;
}) {
    const url = '/api/profile/parse-cv';

    const formData = new FormData();
    formData.append('cv', {
        uri: file.uri,
        name: file.name,
        type: file.type || 'application/pdf',
    } as any); // 'as any' is needed in React Native for FormData files

    const response = await ApiFetcher(url, 'POST', {
        'Content-Type': 'multipart/form-data',
    }, formData);

    return response;
}

export async function UpdateProfile(data: UserType) {
    const url = '/api/profile';
    const response = await ApiFetcher(url, 'PUT', {
        'Content-Type': 'application/json',
    }, undefined, data);

    return response;
}